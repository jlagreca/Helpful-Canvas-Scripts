#!/usr/bin/python

from AppKit import NSWorkspace, NSScreen
from Foundation import NSURL
import argparse
import sys
import shutil
import os
import pwd
#import subprocess

parser = argparse.ArgumentParser(description='Sets the desktop picture on all screens')
parser.add_argument('--path', help='The path of the image')
args = vars(parser.parse_args())
#already loggedin so we can skip any kind of security
getusername = os.getlogin()
#desktop_path = subprocess.check_output(['xdg-user-dir', 'DOCUMENTS'])
#name of the file to be used. Store in the same folder as the script I recommend a nice one of hasselhoff
file_name = 'background.jpg'
#the directory where stuff will be copied tp
directory_path = '/Users/' + getusername + '/Documents/'
shutil.copy2(file_name, directory_path)

#need th final picture path
picture_path = '/Users/' + getusername + '/Documents/' + file_name

# generate a fileURL for the desktop picture
file_url = NSURL.fileURLWithPath_(picture_path)
# make image options dictionary
# we just make an empty one because the defaults are fine
options = {}
# get shared workspace
ws = NSWorkspace.sharedWorkspace()
# iterate over all screens
for screen in NSScreen.screens():
    # tell the workspace to set the desktop picture
    (result, error) = ws.setDesktopImageURL_forScreen_options_error_(
                file_url, screen, options, None)
    if error:
        print error
        exit(-1)