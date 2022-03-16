import requests

wav_src = 'http://www.phys.unsw.edu.au/music/clarinet/sounds/{}.wav'
wav_out = 'sounds/{}.wav'

notes = 'ABCDEFG'

for n in notes:
    for nc in ['', 'sharp']:
        for i in range(3, 7+1):
            note = f'{n}{nc}{i}'
            url = wav_src.format(note)
            file_d = wav_out.format(note)

            r = requests.get(url, allow_redirects=True)

            if r.status_code == 200:
                print("Downloaded " + note)
                with open(file_d, 'wb') as fh:
                    fh.write(r.content)
print("Done!")
