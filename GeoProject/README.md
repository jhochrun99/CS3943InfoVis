## Intro

This assignment was to design visualization solutions for 3 questions related to the AidData dataset. This dataset contains information about financial transactions for aid purposes between two countries. Given the data structure and analytical questions, the goal is to create views that would help an analyst to obtain the answer for those questions.

## Questions

1. How do the countries compare in terms of how much they receive and donate from other countries? Are there countries that donate much more than they receive or receive much more than they donate?
2. Do the countries that mostly receive or mostly donate tend to cluster around specific geographical areas of the world? Are there neighboring countries that have radically different patterns in terms of how much they receive vs. how much they donate?
3. (OPTIONAL) Are there any major differences in how the top 5 most frequent purposes of disbursements distribute geographically in terms of  countries that receive donations? Are there countries that tend to receive more of certain types of donations than others?

## Data

In the AidData dataset, each row represents a financial transaction between two countries. The dataset contains the following attributes:

- **Year:** year of the commitment
- **Donor:** country providing the financial resource
- **Recipient:** country or organization receiving the money
- **Commitment Amount:** the total amount of financial resources provided
- **Coalesced Purpose Name:** the purpose of the transaction

## Running the code

To run the website, execute the command `python3 -m http.server` in this directory and then go to http://0.0.0.0:8000/ in your browser.

If running from windows command prompt, use the command `python -m http.server` for python3, or `python -m SimpleHTTPServer` for python2. 

## Contents

* `index.html` contains the basic HTML structure and links to the CSS and JS files.

* `style.css` contains CSS rules.

* `d3` contains the D3 library.

* `data` contains datasets used by the visualizations.

* `main.js` loads the datasets and then calls the visualization functions.

* `visualizations` contains the code to make the visualizations.
