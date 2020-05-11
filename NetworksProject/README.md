## Intro

This assignment was to design visualization solutions for 3 questions related to the AidData dataset. This dataset contains information about financial transactions for aid purposes between two countries. Given the data structure and analytical questions, the goal is to create views that would help an analyst to obtain the answer for those questions.

## Questions

1. Create an overview of the relationships between countries so that it is possible to see who donates to whom and how much. The main question one should be able to answer is: who are the major donors and to which countries do they donate the most and how much? And conversely, who are the major receivers and which countries do they receive from the most and how much? We only care about the top 10 recipients and the top 20 donors over time for this question.
2. Considering only the top 5 purposes of donation, how does the relationship between countries look in terms of purposes? What composition of purposes do the donations between each pair of countries have? Are there countries that donate to a given country using multiple purposes? Or do counties always donate using one single purpose when donating to another country? The same as the previous question, we only care about the top 10 recipients and the top 20 donors here.
3. (OPTIONAL) For this last exercise you have to include new information in your data set. Now, you have to include international organizations in addition to countries (you can find a new data set containing these organizations here: TBA). Which countries receive donations from which international organization and how much? How does their allocation change over the years? 

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
