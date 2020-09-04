FROM ruby:2.6.3
RUN apt-get update -qq \
    && apt-get install -y build-essential libpq-dev nodejs --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*
RUN apt-get update -qq \
    && apt-get install -y vim --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*
RUN mkdir /Camp
WORKDIR /Camp
COPY Gemfile /Camp/Gemfile
COPY Gemfile.lock /Camp/Gemfile.lock
RUN gem install bundler
RUN bundle install
COPY . /Camp