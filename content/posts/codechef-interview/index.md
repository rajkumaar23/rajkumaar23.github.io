---
title: "CodeChef Interview Experience"
date: 2020-05-11T18:34:00+05:30
tags:
- CodeChef
- internship
- summer internship
- software development engineer
- interview
- dsa
- algorithms
- data structures
---
![CodeChef Logo](https://www.codechef.com/sites/all/themes/abessive/logo.svg)

I’m a regular user at [LinkedIn](https://linkedin.com/in/rajkumaar23) and I came across the **Software Development Engineer
Internship**’s poster by [CodeChef](https://codechef.com) when I was browsing through the feed one day.
CodeChef’s interview process is very different unlike most other companies
including its parent [Directi](Directi). Due to COVID-19, my whole interview process was virtual.


## Online Coding Round at CodeChef – 3 hours
- 1st and 2nd question were of beginner level ([Reference](https://www.codechef.com/problems/school/))
- 3rd question (Easy) – You are given an array `A1,A2,...,An` of size N. A pair `(i,j)` is good if and only if `1≤i<j≤N` and `Ai+Aj` is a prime number. You need to find the number of good pairs in this array. (Trick: Using Sieve of Eratosthenes
for finding primes)
- 4th question (Medium) - Modified knapsack question (Dynamic Programming)
- 5th question (Hard) – Based on DSU

Out of these, I was able to solve 4 of them and I got into the next round.

## Web App Development Round – 10 days of time
- I was given the tech stack which I had to use – PHP (Slim Framework) + MySQL + ReactJS.
- I was given access to the official CodeChef API and the task was to build a contest arena with features like searching of contests, problems in it etc. 
- Interesting thing here was that CodeChef APIs are rate limited. So I had to cache the data at an intermediate server for a specified interval of time and then serve the results to the frontend.
- I was asked to submit the code by pushing into a private GitHub repo.

## Web App Discussion + Technical Round – 1 hour
- The interview started with how I built the web app and what were the
challenges faced.
- Then I was asked some fundamental questions from OS, DBMS &
Networks.
- I was also asked to explain about the technologies I had mentioned in my
resume like Docker, MongoDB etc. (Pro Tip: Make sure you know to explain
each word in your [resume](https://rajkumaar.co.in/resume)).

## The most-awaited DSA round – 1 hour
- I was interviewed by someone who is an ICPC World Finalist for 2 times.
- Given an array of n positive integers with duplicates, how will you convert the array such that all elements are distinct with minimum number of moves. The catch is, you’re allowed to do only *one* kind of operation but can be repeated any number of times; for any pair in the array `(Ai, Aj)` can be converted to `(Ai, Ai + Aj)`
- After some time of thinking and discussing with the interviewer, I was able to come up with a solution using hash-maps in quadratic time. Then, I was asked to optimise. After doing a dry run through few examples I observed something (replacing any element with the sum of itself and maximum element in the array), and came up with a solution in linear time. And then I was asked to code the same in my favourite language(C++).
- My suggestion here is to _Think Aloud_. Your thinking process matters more than the solution itself.

## Final round of Interview – 30 mins
- This was more of an informal discussion about me, my family background, interests. All I had to do was to stay confident and share my stories.
- He also shared about the evolution of CodeChef and its culture.
- I was immediately informed that I was in.

Here ends the one month long interview process and I’m selected for the Software Engineer Internship at CodeChef 🎉️

## Preparation Strategies and Tips
- There’s no shortcut to mastery. Practice. DSA is very essential for any computer science engineer, which I realised very lately, since web frameworks may come and go but this subject has existed and will continue to do so as long as data exists. Hence, the high priority given to it by most product development companies.
- If you’ve long enough time to prepare, you can improve your logical thinking skills by solving problems at [CodeChef](https://codechef.com), [Codeforces](https://codeforces.com/) and also follow the next point.
- But if the time is short, then it’s better to go for practising standard DSA questions on [GeeksForGeeks](https://geeksforgeeks.org), [HackerRank](https://hackerrank.com/), [Leetcode](https://leetcode.com/).
- Well even if you’re good at DSA, it isn’t sufficient to pass an interview of this kind unless you’ve some experience with web development. For that I would suggest you to learn some latest web/mobile app technologies and build some side projects. Also try contributing to open-source projects in [GitHub](https://github.com/) so you’ve a better understanding of how coding looks like in real life.
- Prepare your LinkedIn profile and be an active user. You might find an opportunity anytime just like I did. It also helps you to improve your professional network.

## Preview Video of the Web App I built
{{< youtube "197v5LXos6A" >}}

Find the source code [here](https://github.com/rajkumaar23/codechef-contest-arena).