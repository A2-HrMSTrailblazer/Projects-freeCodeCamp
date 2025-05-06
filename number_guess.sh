#!/bin/bash

PSQL="psql -X --username=freecodecamp --dbname=number_guess --tuples-only -c"

echo -e "\n~~ Number Guessing Game ~~\n"

NUMBER=$(( RANDOM % 1000 + 1 ))

echo "Enter your username:"
read NAME
NAME=$(echo "$NAME" | xargs)

# Check if user exists
USER_ID=$($PSQL "SELECT user_id FROM users WHERE username = '$NAME'")
USER_ID=$(echo "$USER_ID" | xargs)
if [[ -z $USER_ID ]]
then
  echo "Welcome, $NAME! It looks like this is your first time here."
  # New user, insert them
  INSERT_RESULT=$($PSQL "INSERT INTO users(username) VALUES('$NAME')")
  USER_ID=$($PSQL "SELECT user_id FROM users WHERE username = '$NAME'")
  USER_ID=$(echo "$USER_ID" | xargs)
else
  USERNAME=$($PSQL "SELECT username FROM users WHERE user_id = $USER_ID" | xargs)
  GAMES_PLAYED=$($PSQL "SELECT games_played FROM users WHERE user_id = $USER_ID" | xargs)
  BEST_GAME=$($PSQL "SELECT best_game FROM users WHERE user_id = $USER_ID" | xargs)
  echo "Welcome back, $USERNAME! You have played $GAMES_PLAYED games, and your best game took $BEST_GAME guesses."
fi

# Game logic
TRIES=0
echo -e "\nGuess the secret number between 1 and 1000:"
while true
do
  read GUESS
  
  if [[ ! $GUESS =~ ^[0-9]+$ ]]
  then
    echo "That is not an integer, guess again:"
    continue
  fi

  ((TRIES++))
  if [[ $GUESS -lt $NUMBER ]]
  then
    echo "It's higher than that, guess again:"
  elif [[ $GUESS -gt $NUMBER ]]
  then
    echo "It's lower than that, guess again:"
  else
    echo "You guessed it in $TRIES tries. The secret number was $NUMBER. Nice job!"

    # Update user stats
    UPDATE_GAMES_PLAYED=$($PSQL "UPDATE users SET games_played = games_played + 1 WHERE user_id = $USER_ID")

    CURRENT_BEST=$($PSQL "SELECT best_game FROM users WHERE user_id = $USER_ID")
    CURRENT_BEST=$(echo "$CURRENT_BEST" | xargs)
    if [[ -z $CURRENT_BEST || $TRIES -lt $CURRENT_BEST ]]
    then
      UPDATE_BEST_GAME=$($PSQL "UPDATE users SET best_game = $TRIES WHERE user_id = $USER_ID")
    fi
    break
  fi
done
# Script ends here
