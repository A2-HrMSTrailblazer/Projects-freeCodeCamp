#! /bin/bash

# Set up psql command
PSQL="psql --username=freecodecamp --dbname=periodic_table -t --no-align -c"

# Check for argument
if [[ -z $1 ]]; then
  echo "Please provide an element as an argument."
  exit
fi

# Determine input type
if [[ $1 =~ ^[0-9]+$ ]]; then
  CONDITION="atomic_number = $1"
elif [[ $1 =~ ^[A-Z][a-z]?$ ]]; then
  CONDITION="symbol = '$1'"
else
  CONDITION="name = '$1'"
fi

# Query for element
ELEMENT=$($PSQL "SELECT atomic_number, name, symbol, type, atomic_mass, melting_point_celsius, boiling_point_celsius FROM elements 
JOIN properties USING(atomic_number) 
JOIN types USING(type_id) 
WHERE $CONDITION")

# Check if found
if [[ -z $ELEMENT ]]; then
  echo "I could not find that element in the database."
  exit
fi

# Parse data
IFS='|' read -r ATOMIC_NUMBER NAME SYMBOL TYPE MASS MELTING BOILING <<< "$ELEMENT"

# Output formatted result
echo "The element with atomic number $ATOMIC_NUMBER is $NAME ($SYMBOL). It's a $TYPE, with a mass of $MASS amu. $NAME has a melting point of $MELTING celsius and a boiling point of $BOILING celsius."

# Script ends here
# Thank you for guiding me
