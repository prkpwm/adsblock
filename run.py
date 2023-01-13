import os
import sys


def run_project():
    try:
        os.system('nx serve')
    except:
        print('Error: run project failed')
        

def build_project():
    print('build project')
    try:
        os.system('nx build --prod')
        os.system('firebase deploy')
    except:
        print('Error: build project failed')

def save_project():
    try:
        os.system('git add .')
        commit_message = input('commit message: ')
        os.system(f'git commit -m "{commit_message}"')
        os.system('git push')
    except:
        print('Error: publish project failed')
     
     

# init
def main():
    param_list = sys.argv
    print(param_list)
    if len(param_list) == 1:
        run_project()
        return
    elif len(param_list) == 2:
        if param_list[1] == 'run':
            run_project()
            return
        elif param_list[1] == 'build':
            build_project()
            return
        elif param_list[1] == 'save':
            save_project()
            return
        else:
            print('run.py [run|build|save]')
            return
        

main()