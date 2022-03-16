import requests
import os

wav_src = 'http://www.phys.unsw.edu.au/music/clarinet/sounds/{}.wav'
wav_out = '../emeapp/webapp/public/sounds/clarinet_bb/{}.wav'

notes = 'ABCDEFG'

for n in notes:
    for nc in ['', 'sharp']:
        for i in range(3, 7+1):
            note = f'{n}{nc}{i}'
            url = wav_src.format(note)
            file_d = wav_out.format(note)

            if nc == 'sharp' and n in 'BE':
                continue
            if os.path.exists(file_d):
                print("Already exists:", note)
                continue

            r = requests.get(url, allow_redirects=True)

            if r.status_code == 200 and r.headers['Content-Type'] == 'audio/wav':
                print("Downloaded:", note)
                with open(file_d, 'wb') as fh:
                    fh.write(r.content)
            else:
                print("Not found:", note)
print("Done!")
