
import os


def create_filenames_list(directory):
    filenames_list = []
    for root, dirs, files in os.walk(directory):
        for f in files:
            filenames_list.append(os.path.join(directory,f))
    return filenames_list


def write_out_filenames_list (filenames_list, foldername):
    with open('{} filenames list.js'.format(foldername), 'w', encoding='utf-8') as n:
        text = 'var fileSrcArray = ['
        filenames_list = sorted(filenames_list, key=lambda x: int(x.split('\\')[-1].split('_')[0]))
        for f in filenames_list[:-1]:
            text += '"' + f + '", '
        text += '"' + filenames_list[-1] + '"]'
        n.write(text)


def main():
    directory = input('Type in the directory you want to be listed: ')
    write_out_filenames_list(create_filenames_list(directory), os.path.basename(directory))



if __name__ == '__main__':
    main()
