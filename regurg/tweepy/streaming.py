import tweepy
import json
import jsonpickle
from pprint import pprint

 
# Consumer keys and access tokens, used for OAuth
consumer_key = 'UX0aRz4tzXcWblxIEVw'
consumer_secret = 'QkpBFpTiShmqdWq97Jylam5tB5MadBd4gMcEdNi99I'
access_token = '596973714-NMVzVGYpN6aq6vSeM8Cu24tqC5pQT97TuzAppSEF'
access_token_secret = 'LFiFeN4TsHPtkOeekurvrFaZogAkzgAFdkHu2kKxIM'
 
# OAuth process, using the keys and tokens
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
 
# Creation of the actual interface, using authentication
api = tweepy.API(auth)

ct = 0
tweets = []
for tweet in tweepy.Cursor(api.search, q="#tcdisrupt", count=100, include_entities=True, lang="en").items():
	print ct
	tweets.append(tweet)
	if ct > 100:
		break
	ct += 1

# Sample method, used to update a status
# data = api.search("#regurgitate")

pickled = jsonpickle.encode(tweets)
with open("raw-tweets.json", "w") as jsonfile:
	jsonfile.write(json.dumps(json.loads(pickled), indent=4, sort_keys=True))