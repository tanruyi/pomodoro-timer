<!-- @format -->

# 🍅 Pomodoro-Timer 🍅

This is a web app that I'm doing as the Final Project as part of Harvard's CS50x course.

The web app is live here: https://pomodoro-timer-habs.onrender.com/

I will be attempting to make a web app that is similar to the https://studywithme.io/aesthetic-pomodoro-timer/

Video Demo: https://youtu.be/uB8wdjiZV2E

# Description
This web app helps users focus on their tasks using a pomodoro technique. The user decides on a task to focus on for 25minutes, and then takes a short break. This process repeats until the user has completed 4 rounds, then they can take a longer break.

The web app has timers for focus, break and recharge that users can use. There is also a spotify player that users can use to set some background music, and there are stars that helps to track how many focus durations they have completed.

# Tech Stack

-   Python / Flask
-   JavaScript
-   HTML
-   CSS

# Instructions

To run the web app, use the command `python main.py` in the terminal

# Reflections

I set out at the start with the intention of making a web app using Flask, since that was one of the new tools I learnt from CS50 and I wanted to apply it on a real project. However, over the course of building the web app, I discovered that using Flask to make a website responsive to a user's input is not as intuitive or as flexible as using JavaScript (JS). I originally did not intend to use JS, however I found that without JS it is really difficult to make the web app as interactive as I wanted it to be. Given that I already had some background in JS, I ended up relying a lot on JS, and Flask was just minimally as a host to launch the website. At this point, Flask is redundant, as the web app can easily stand by itself without Flask.

## Takeaways

-   Due to my inexperience, I did not consider carefully the purpose of each tool and how it contributes to building my final goal. I think this is one aspect that I think I need to consider and analyse carefully before embarking on new projects going forward
-   Despite using Flask only minimally, I learnt how to set up a basic folder structure for Flask projects
-   It has been a while since I last used HTML, CSS and JS, so it was a good revision
-   Some small things I learnt:
    -   how to use cookies in JS
    -   how to play audio in JS
    -   how to set a favicon
    -   how to embed a spotify player
