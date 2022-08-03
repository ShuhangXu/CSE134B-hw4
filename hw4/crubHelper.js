// Import the blog javascript fill and example posts
import * as blog from './blog.js';
import initialPosts from './initialPosts.js';

// First, let's initialize our post element.
blog.initializePE();

// If there is no posts right now, we just add posts in database
if (blog.numOfPosts() === 0) {
    for (let p of initialPosts) {
        blog.insertPost(p);
    }
}

document.addEventListener("DOMContentLoaded", function (){
    // Show what posts we have right now
    const postsContainer = document.getElementById("posts");
    // Display all the posts
    blog.redisplayAllPosts(postsContainer);

    const addButton = document.getElementById('addButton');
    // When addButton is clicked, the dialog will show up
    addButton.addEventListener('click', function (){
        const creatDialog = document.getElementById('creat_new_post');
        const addPostForm = document.getElementById("add_form");
        blog.dialogVisable(creatDialog);
        addPostForm.addEventListener("submit", (func) =>{
            // Prevent duplication
            func.preventDefault();
            // Store what the user input
            const formData = new FormData(func.target);
            console.log(formData);
            // Store data with the name we use
            const post = {};
            for (const [key, value] of formData.entries()) {
                post[key] = value;
            }

            // Add the new posts and refresh the page
            blog.insertPost(post);
            blog.redisplayAllPosts(postsContainer);
            addPostForm.reset();
            creatDialog.close();
        });
    });
});