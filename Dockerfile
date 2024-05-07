FROM ruby:3.0.0

# Update package lists and install Node.js
RUN apt-get update -yqq && \
    apt-get install -yqq --no-install-recommends nodejs

# Copy the application code into the image
COPY . /usr/src/app/

# Set the working directory
WORKDIR /usr/src/app

# Set environment variables
ENV RAILS_ENV=production
ARG SECRET_KEY_BASE
ENV SECRET_KEY_BASE=${SECRET_KEY_BASE}

# Install Bundler and dependencies
RUN gem install bundler:2.2.3
RUN bundle install

# Run database migrations
RUN rails db:migrate

# Precompile assets
RUN rails assets:precompile

# Command to start the Rails server
CMD ["rails", "server"]