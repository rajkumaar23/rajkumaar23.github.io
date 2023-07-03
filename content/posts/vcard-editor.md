---
title: "vCard Editor"
date: 2023-07-02T16:15:06-07:00
images: ["/vcard-editor.png"]
tags:
  - vcard
  - masters
  - abroad
  - contacts
---

Are you preparing for an exciting journey abroad? Picture this scenario -> you've just arrived in a foreign country, full of anticipation and ready to embark on new adventures. You eagerly open WhatsApp to connect with your friends and family back home, only to find a long list of unnamed contacts staring back at you. Quite frustrating, isn't it? But fear not! I have the perfect solution to spare you the hassle of manually updating each contact with the correct country code. Allow me to introduce vCard Editor, an exceptional web app that effortlessly resolves this problem!

![vCard Editor Banner](/vcard-editor.png)

Welcome to yet another chapter in my journey of developing software that I wished existed. During my first international trip for my post-graduate education in the United States, I encountered a perplexing issue. Upon arrival, I noticed that most of my WhatsApp chats displayed unnamed contacts. It dawned on me that this occurred due to switching to a US carrier, which silently added an invisible *(+1)* prefix to contacts in my list lacking a country code.

The magnitude of contacts without a country code in my list was overwhelming. Manually updating each one would have been an absolute nightmare. Despite my search for a reliable and private solution, I found none. Thus, I resorted to exporting my contacts as a VCF file and tediously performing a traditional find-and-replace using a text editor. However, this approach proved highly unreliable for modifying my contact list.

Driven by the need for a better solution, I built vCard Editor, now accessible at [vcard-editor.rajkumaar.co.in](https://vcard-editor.rajkumaar.co.in).

Traveling abroad should be about embracing new experiences, not fretting over contact management. With vCard Editor, you can swiftly add country codes to your contacts in bulk, reclaiming your valuable time and eliminating unnecessary frustration. Don't hesitate to give it a try today and kindly share your feedback!

> While the webapp utilizes the industry-standard `ical.js` library for parsing VCF files, I strongly advise maintaining a backup of your original file at all times.

### Detailed Steps

To effortlessly add country codes to your contacts using vCard Editor, follow these straightforward steps:

1. Export your contacts as a `.vcf` file. Detailed instructions on how to export your contacts can be found on the [web app](https://vcard-editor.rajkumaar.co.in).

2. Visit [vcard-editor.rajkumaar.co.in](https://vcard-editor.rajkumaar.co.in) and upload the `.vcf` file you exported in the previous step.

3. Click on the "Export updated .vcf" button on the web app.

4. Import the newly generated file back onto your mobile device. Most modern devices should automatically **update** the existing contacts without creating duplicates. However, if you encounter any duplicates, delete all contacts and import the updated file again.

5. Voila! All your contacts will now be equipped with the correct country code!

### Experience Smooth Sailing

Should you encounter any issues with the app, please report them [here](https://github.com/rajkumaar23/vcard-editor/issues). Your feedback is invaluable and will contribute to the continuous improvement of vCard Editor.

### Privacy at the Forefront

As a staunch advocate of privacy, I guarantee that your contact list remains exclusively within your web browser throughout the entire process. It is never transmitted or shared with any third parties. Rest assured that your information is kept private and secure.

