---
title: "vCard Editor"
date: 2023-07-02T16:15:06-07:00
images: ["/vcard-editor/screenshot.png"]
tags:
  - vcard
  - masters
  - abroad
  - contacts
---

Are you planning an exciting journey abroad? Imagine this -> you've just landed in a foreign country for the first time, filled with anticipation and ready for new adventures. You open WhatsApp to connect with friends and family back home, only to find a list of unnamed contacts staring back at you. Frustrating, right? But do not worry! I have a perfect solution to save you from the hassle of manually updating each contact with the correct country code. Introducing [vCard editor](https://vcard-editor.rajkumaar.co.in) that effortlessly solves this problem!

![banner](/vcard-editor/screenshot.png)

Welcome to another episode of building a piece of software I wish I had. It was my first time travelling internationally when I packed to the US for my post-graduate education. And the first thing I noticed after landing was that most of my chats on WhatsApp did not have the contact name. I realized this was because of me switching to the US carrier which prefixed all the contacts (that did not have a country code) with an invisible *(+1)*.

The number of contacts in my list which didn't have a country code was huge. Manually updating each of them was a nightmare. Although I tried to find a reliable (and private) solution to fix this, I could not find any. Hence, I resorted to exporting the contacts as a VCF file, and doing a traditional find and replace using a text editor. That was the most unreliable way to modify my contact list.

Hence, I built [vCard editor](https://vcard-editor.rajkumaar.co.in).

> Instructions on how to export your contacts as a `.vcf` file is available [on the website](https://vcard-editor.rajkumaar.co.in) itself.

Traveling abroad should be about enjoying new experiences, not worrying about contact management. With this web app, you can quickly and efficiently add country codes to your contacts in bulk, saving you valuable time and eliminating unnecessary frustration. Give it a try today and let me know what you think!

> Although, the site uses the standard `ical.js` library for parsing your VCF files, I would still recommend always having the original file as a backup.

### Issues

If you are facing any issues with the app, please report [here](https://github.com/rajkumaar23/vcard-editor/issues).

### Privacy

Being a strong advocate of privacy, I wouldn't build a software that mines your data. This web app makes sure that your contact list stays within your web browser at all times and is never sent or shared with anyone else. This way, your information remains private and secure.
