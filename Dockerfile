FROM ruby:2.6.3
RUN apt-get update -qq && apt-get install -y build-essential nodejs

RUN mkdir /Camp
WORKDIR /Camp

COPY Gemfile /Camp/Gemfile
COPY Gemfile.lock /Camp/Gemfile.lock

RUN bundle install

COPY . /Camp