from time import sleep
from redis import Redis, exceptions
from flask import Flask

app = Flask(__name__)
cache = Redis(host='redis', port=6379)

def get_hit_count():
  retries = 50
  while True:
    try:
      return cache.incr('hits')
    except exceptions.ConnectionError as exc:
      if retries == 0:
        raise exc
      retries -= 1
      sleep(0.5)

@app.get('/')
def hello():
  count = get_hit_count()
  return f'Hello. I\'ve ben seen {count} many times'


if __name__ == '__main__':
  app.run()