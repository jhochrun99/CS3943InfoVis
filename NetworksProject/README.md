## Intro

This assignment was to design visualization solutions for 3 questions related to the AidData dataset. This dataset contains information about financial transactions for aid purposes between two countries. Given the data structure and analytical questions, the goal is to create views that would help an analyst to obtain the answer for those questions.

## Questions

1. How does the amount donated vs. amount received change over time across all countries? Are there countries that mostly send or mostly receive and countries that have a similar amount of donations they receive and send? Are there countries that change their role over time? Are there countries in which you can find a sudden increase ("peak") or a sudden decrease ("valley")?
2. Focus on the top 10 “Coalesced Purposes” of donations. What are the top 10 purposes of disbursements (in terms of total amount of disbursement) and how does their relative amount compare over time? Are there purposes that tend to be prominent for a period of time and others that become more prominent during other periods? Hint: looking at the graph one should be able to observe: “Ah! During these years donations were mostly about X but then there were way more donations about Y”.
3. (OPTIONAL) Focusing exclusively on countries that receive donations, how do donations shift geographically over time? Do donations tend to be always in the same regions of the world over the years or they have been shifting over time? Can you build a visualization that shows the “history of donations” so that one can get a sense of which regions of the world have had more need for donations over the years? 

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
