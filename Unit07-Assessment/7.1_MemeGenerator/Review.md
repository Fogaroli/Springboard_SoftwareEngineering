## Description

This assessment was submitted to Hatchways for code review. It contains my solution for the Meme Generator Project.


## Review provided by Hatchways

Key Takeaway

Total Points: 89/100

Please note that points deducted during evaluations are a means to help you learn and grow, and they do not determine your job prospects or overall success in this course. Within our 100-point grading system, smaller aspects may carry a relatively larger point value, not because they are more critical but to ensure a fair distribution of points across various components of your assessment.

Results: Pass

Thanks for completing the Hatchways assessment for Springboard 🎉 Our team has had a chance to review your code and we have the following feedback below to help you improve your coding chops 🥢 As a note, please keep in mind the feedback given here is not an indication of how well you did on the assessment. Similar to many coding problems, there are many approaches to solving a problem and many opinions on what is good code.

Consider adding form validation for the image URL input to ensure that a URL is provided before allowing the form to submit. This will improve the user experience by preventing the creation of memes without images.
It's good practice to add 'alt' attributes to images for accessibility reasons. Even though the images are set as background images via CSS, consider using an 'img' tag with an 'alt' attribute for better accessibility.
The 'removeMEME' function removes the parent of the parent of the clicked element, which could lead to unintended behavior if the DOM structure changes. It would be safer to assign a specific class to the meme container and use that to ensure the correct element is removed.
The CSS class names are descriptive and match the functionality they style, which is excellent. However, the 'exclude' class could be renamed to something more indicative of its purpose, such as 'deleteButton' or 'removeMemeButton'.
The JavaScript code is well-structured and the functions are well-named, making the code easy to follow. However, adding comments to complex or non-obvious parts of the code could further improve readability and maintainability.
How did you find the feedback? Fill out this survey

Completion (20 Points)

🔻 The form submission does not currently validate the presence of the image URL, which is a required field for meme generation.
Process & Understanding (60 Points)

🔻 The event listener for removing a meme is added to the 'exclude' div, which is a child of the meme container, rather than directly on a delete button or the image itself.
Presentation (20 Points)

🔻 The variable names 'upperText' and 'bottomText' could be more descriptive to indicate that they represent input elements rather than text values.