#!/usr/bin/python

import csv, requests, time
from pprint import pprint

#############################
###### EDIT THIS STUFF ######
#############################

users_csv = 'users_final.csv' # name of file storing users/emails that will get notifications updated
notifications_csv = 'notifications.csv' # name of file storing your new notification settings
log_file = 'log.txt' # a log file. it will log things.
canvasDomain = 'Change Your Domain' # domain of your Canvas account
access_token = 'ADD YOUR TOKEN' # your access token

#############################
## DON'T UPDATE CODE BELOW ##
#############################

baseUrl = 'https://%s/api/v1/users/self/communication_channels' %(canvasDomain)
header = {'Authorization' : 'Bearer ' + access_token}
payload = {}

for x in range(0, 1):

    def main():

        # build payload dictionary
        build_notification_payload()

        # add time stamp to log file
        log_time = str(time.asctime(time.localtime(time.time())))
        write_to_log(log_time)   

        # do that updating thang
        update_prefs()
    
        # add time stamp to log file
        log_time = str(time.asctime(time.localtime(time.time())))
        write_to_log(log_time)   
        write_to_log("\n--DONE--\n\n")
   

    def build_notification_payload():

        with open(notifications_csv, 'rU') as csvFile:
            csvReader = csv.reader(csvFile, delimiter = ',')
            csvReader.next() # Skip the header

            for row in csvReader:
                # row[0] = notification name, row[1] = notification frequency

                payload['notification_preferences[frequency]'] = row[2]
                #payload = 'notification_preferences[frequency][]=never'

    def update_prefs():
 
        with open(notifications_csv, 'rU') as csvFile:
            csvReader = csv.reader(csvFile, delimiter = ',')
            csvReader.next() # Skip the header

            for row in csvReader:
                # row[0] = notification name, row[1] = notification frequency
                notification_name = row[0]   

                with open(users_csv, 'rU') as csvFile2:
                    csvReader2 = csv.reader(csvFile2, delimiter = ',')
                    csvReader2.next() # skip the header

                    for row in csvReader2:
                        user_id = row[0]
                        communication_channel_id = row[2]
                        url = '%s/%s/notification_preferences/%s?as_user_id=sis_user_id:%s' %(baseUrl, communication_channel_id, notification_name, user_id) 
                        write_to_log(user_id + ": " + communication_channel_id + " " + url)
                        r = requests.put(url, headers = header, data = payload)
                        write_to_log(r.text)    

    def write_to_log(message):

        with open(log_file, 'a') as log:
                log.write(message + "\n")
                pprint(message)



    if __name__ == "__main__": main()

