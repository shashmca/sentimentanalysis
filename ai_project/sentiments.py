import os
import json
import tweepy, csv, re
from textblob import TextBlob
import matplotlib
import pandas as pd

matplotlib.use('agg')

import matplotlib.pyplot as plt
from flask import Blueprint, render_template, request

second = Blueprint("second", __name__, static_folder="static", template_folder="template")


@second.route("/sentiment_analyzer")
def sentiment_analyzer():
  return render_template("sentiment_analyzer.html")


class SentimentAnalysis:

  def __init__(self):
    self.tweets = []
    self.tweetText = []
    self.tweetDays = {}

  def DownloadData(self, keyword, tweets):
    # -----------------------
    # authenticating
    # consumerKey = 'i5gaXPnc3jLmFCvy2XClAHpTa'
    # consumerSecret = '8FhmQfqHWXOE2IvYv15kKVpE8WV0Jn2oEsAVsg1J6Zq4cGOwN0'
    # accessToken = '634554748-5BSURR3VcJc7hIkBuDRuqCl1Wq1Ik0Lrt8WrKjnY'
    # accessTokenSecret = 's7z7SzMjzPzsCVyTAxdCmWjYy9TU7H9Ofs1GgDTGWoHfo'
    # auth = tweepy.OAuthHandler(consumerKey, consumerSecret)
    # auth.set_access_token(accessToken, accessTokenSecret)
    # api = tweepy.API(auth, wait_on_rate_limit=True)

    # input for term to be searched and how many tweets to search
    # searchTerm = input("Enter Keyword/Tag to search about: ")
    # NoOfTerms = int(input("Enter how many tweets to search: "))
    # -----------------------
    # tweets = int(tweets)

    # searching for tweets
    # self.tweets = tweepy.Cursor(api.search_tweets, q=keyword, lang="en").items(tweets)

    # Open/create a file to append data to
    # csvFile = open('result.csv', 'a')

    # Use csv writer
    # csvWriter = csv.writer(csvFile)

    # creating some variables to store info
    polarity = 0
    positive = 0
    wpositive = 0
    spositive = 0
    negative = 0
    wnegative = 0
    snegative = 0
    neutral = 0

    filename = "tweets.json"
    self.tweets = read_n_records(filename, tweets)
    print(len(self.tweets))

    # with open(filename, "r") as file:
    #     self.tweets = json.load(file)

    for tweet in self.tweets:
      self.tweetDays[tweet['TweetedTimestamp']] = {"positive": 0,
                                                   "wpositive": 0,
                                                   "spositive": 0,
                                                   "negative": 0,
                                                   "wnegative": 0,
                                                   "snegative": 0,
                                                   "neutral": 0}

    # iterating through tweets fetched
    for tweet in self.tweets:
      # Append to temp so that we can store in csv later. I use encode UTF-8
      # self.tweetText.append(self.cleanTweet(tweet.text).encode('utf-8'))
      # self.tweetText.append(tweet.text.encode('utf-8'))
      # print (tweet.text.translate(non_bmp_map))    #print tweet's text
      analysis = TextBlob(tweet['TweetText'])
      # print(analysis.sentiment)  # print tweet's polarity
      polarity += analysis.sentiment.polarity  # adding up polarities to find the average later

      if (
        analysis.sentiment.polarity == 0):  # adding reaction of how people are reacting to find average later
        neutral += 1
        self.tweetDays[tweet['TweetedTimestamp']]["neutral"] += 1
      elif (analysis.sentiment.polarity > 0 and analysis.sentiment.polarity <= 0.3):
        wpositive += 1
        self.tweetDays[tweet['TweetedTimestamp']]["wpositive"] += 1
      elif (analysis.sentiment.polarity > 0.3 and analysis.sentiment.polarity <= 0.6):
        positive += 1
        self.tweetDays[tweet['TweetedTimestamp']]["positive"] += 1
      elif (analysis.sentiment.polarity > 0.6 and analysis.sentiment.polarity <= 1):
        spositive += 1
        self.tweetDays[tweet['TweetedTimestamp']]["spositive"] += 1
      elif (analysis.sentiment.polarity > -0.3 and analysis.sentiment.polarity <= 0):
        wnegative += 1
        self.tweetDays[tweet['TweetedTimestamp']]["wnegative"] += 1
      elif (analysis.sentiment.polarity > -0.6 and analysis.sentiment.polarity <= -0.3):
        negative += 1
        self.tweetDays[tweet['TweetedTimestamp']]["negative"] += 1
      elif (analysis.sentiment.polarity > -1 and analysis.sentiment.polarity <= -0.6):
        snegative += 1
        self.tweetDays[tweet['TweetedTimestamp']]["snegative"] += 1

    # Write to csv and close csv file
    # csvWriter.writerow(self.tweetText)
    # csvFile.close()

    # finding average of how people are reacting
    positive = self.percentage(positive, tweets)
    wpositive = self.percentage(wpositive, tweets)
    spositive = self.percentage(spositive, tweets)
    negative = self.percentage(negative, tweets)
    wnegative = self.percentage(wnegative, tweets)
    snegative = self.percentage(snegative, tweets)
    neutral = self.percentage(neutral, tweets)

    # finding average reaction
    polarity = polarity / tweets

    # printing out data
    #  print("How people are reacting on " + keyword + " by analyzing " + str(tweets) + " tweets.")
    #  print()
    #  print("General Report: ")

    if (polarity == 0):
      htmlpolarity = "Neutral"

    # print("Neutral")
    elif (polarity > 0 and polarity <= 0.3):
      htmlpolarity = "Weakly Positive"
      # print("Weakly Positive")
    elif (polarity > 0.3 and polarity <= 0.6):
      htmlpolarity = "Positive"
    elif (polarity > 0.6 and polarity <= 1):
      htmlpolarity = "Strongly Positive"
    elif (polarity > -0.3 and polarity <= 0):
      htmlpolarity = "Weakly Negative"
    elif (polarity > -0.6 and polarity <= -0.3):
      htmlpolarity = "Negative"
    elif (polarity > -1 and polarity <= -0.6):
      htmlpolarity = "strongly Negative"

    def save_to_json(positive, wpositive, spositive, negative, wnegative, snegative, neutral,
                     keyword, tweets):
      data = {
        "positive": positive,
        "wpositive": wpositive,
        "spositive": spositive,
        "negative": negative,
        "wnegative": wnegative,
        "snegative": snegative,
        "neutral": neutral,
        "keyword": keyword,
        "tweets": tweets
      }

      with open("output.json", "w") as json_file:
        json.dump(data, json_file)

    save_to_json(positive, wpositive, spositive, negative, wnegative, snegative, neutral, keyword,
                 tweets)

    dates = [pd.to_datetime(key.split('T')[0]) for key in self.tweetDays.keys()]
    positives = [key['positive'] for key in self.tweetDays.values()]
    wpositives = [key['wpositive'] for key in self.tweetDays.values()]
    spositives = [key['spositive'] for key in self.tweetDays.values()]
    negatives = [key['negative'] for key in self.tweetDays.values()]
    wnegatives = [key['wnegative'] for key in self.tweetDays.values()]
    snegatives = [key['snegative'] for key in self.tweetDays.values()]
    neutrals = [key['neutral'] for key in self.tweetDays.values()]

    df = pd.DataFrame.from_dict({
      "date": dates,
      "positive": positives,
      "wpositive": wpositives,
      "spositive": spositives,
      "negative": negatives,
      "wnegative": wnegatives,
      "snegative": snegatives,
      "neutral": neutrals
    })

    df['week'] = df['date'].dt.to_period("W-MON")
    grouped_df = df.groupby('week')[['positive', 'wpositive', 'spositive', 'negative', 'wnegative', 'snegative', 'neutral']].sum()
    grouped_df = grouped_df.transpose()
    grouped_df.to_json("output1.json")

    self.plotPieChart(positive, wpositive, spositive, negative, wnegative, snegative, neutral,
                      keyword, tweets)
    print(polarity, htmlpolarity)
    return polarity, htmlpolarity, positive, wpositive, spositive, negative, wnegative, snegative, neutral, keyword, tweets

  def cleanTweet(self, tweet):
    # Remove Links, Special Characters etc from tweet
    return ' '.join(
      re.sub("(@[A-Za-z0-9]+)|([^0-9A-Za-z \t]) | (\w +:\ / \ / \S +)", " ", tweet).split())

  # function to calculate percentage
  def percentage(self, part, whole):
    temp = 100 * float(part) / float(whole)
    return format(temp, '.2f')

  def plotPieChart(self, positive, wpositive, spositive, negative, wnegative, snegative, neutral,
                   keyword, tweets):
    labels = ['Positive [' + str(positive) + '%]', 'Weakly Positive [' + str(wpositive) + '%]',
              'Strongly Positive [' + str(spositive) + '%]', 'Neutral [' + str(neutral) + '%]',
              'Negative [' + str(negative) + '%]', 'Weakly Negative [' + str(wnegative) + '%]',
              'Strongly Negative [' + str(snegative) + '%]']
    sizes = [positive, wpositive, spositive, neutral, negative, wnegative, snegative]
    colors = ['yellowgreen', 'lightgreen', 'darkgreen', 'gold', 'red', 'lightsalmon', 'darkred']
    patches, texts = plt.pie(sizes, colors=colors, startangle=90)
    plt.legend(patches, labels, loc="best")
    plt.axis('equal')
    plt.tight_layout()
    output_directory = "static\\images\\"
    output_file = "plot1.png"
    strFile = output_directory + output_file
    print("Saving plot to:", strFile)
    if os.path.isfile(strFile):
      print('File exists. Removing the old file...')
      try:
        os.remove(strFile)
        print("Old file removed successfully.")
      except Exception as e:
        print("Error while removing the old file:", e)
    try:
      plt.savefig(strFile)
      print("Plot saved successfully.")
    except Exception as e:
      print("Error while saving the plot:", e)


@second.route('/sentiment_logic', methods=['POST', 'GET'])
# @second.route('/sentiment_logic')
def sentiment_logic():
  keyword = request.form.get('keyword')
  tweets = int(request.form.get('tweets'))
  sa = SentimentAnalysis()
  polarity, htmlpolarity, positive, wpositive, spositive, negative, wnegative, snegative, neutral, keyword1, tweet1 = sa.DownloadData(
    keyword, tweets)
  return render_template('sentiment_analyzer.html', polarity=polarity, htmlpolarity=htmlpolarity,
                         positive=positive, wpositive=wpositive, spositive=spositive,
                         negative=negative, wnegative=wnegative, snegative=snegative,
                         neutral=neutral, keyword=keyword1, tweets=tweet1)


# keyword = 'ultraboost'
# tweets = int(237)
# # print('sentiment_logic')
# sa = SentimentAnalysis()
# polarity,htmlpolarity,positive,wpositive, spositive,negative,wnegative, snegative,neutral,keyword1,tweet1=sa.DownloadData(keyword,tweets)
# return render_template('sentiment_analyzer.html',polarity=polarity,htmlpolarity=htmlpolarity, positive=positive,wpositive=wpositive, spositive=spositive,
#                        negative=negative,wnegative=wnegative, snegative=snegative,neutral=neutral,keyword=keyword1,tweets=tweet1)

@second.route('/visualize')
def visualize():
  return render_template('PieChart.html')


def read_n_records(file_path, n):
  with open(file_path, "r") as file:
    data = json.load(file)
  return data[:n]
