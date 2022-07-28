/**
 * @typedef {{
 *  title: string,
 *  date: string,
 *  summary: string
 * }} Post
 */

// Initialize the post element
export function initializePE() {
    console.info("Initializing & loading...");
}

// Return the number of posts in the database
export function numOfPosts() {
    const posts = loadPosts();
    return Object.keys(posts).length;
}

// randomly generate the post id to use in the future
export function generateRandomPostId() {
    return crypto.randomUUID();
};

// Get all the posts from database, aka. initialPosts.js
function loadPosts() {
    // It is possible to have no posts inside or no posts to return
    return JSON.parse(localStorage.getItem('posts')) || {};
}

// Where to store the posts
function storePosts(p) {
    localStorage.setItem('posts', JSON.stringify(p));
}

// Add a new post, it will return the id of new post
export function insertPost(p) {
    let curr_posts = loadPosts();
    let id = generateRandomPostId();
    curr_posts[id] = p;
    storePosts(curr_posts);
    return id;
}

// Return all the posts from the database
export function selectAllPosts() {
    let curr_posts = loadPosts();
    return curr_posts;
}

// Remove a post from the database
export function deletePost(id) {
    let curr_posts = loadPosts();

    // Check if the post exist. If exist, delete. Otherwise, return false
    if (!(id in curr_posts)) {
        return false;
    }
    // Exist, delete it.
    delete curr_posts[id];
    // Store the rest back to the data base
    storePosts(curr_posts);
    return true;
}

/**
 *
 * @param {Post} [post]
 */
export function renderPost(postId, post) {
    const postLayout = document.getElementById("post_layout");

    const postNode = postLayout.content.cloneNode(true);
    postNode.children[0].dataset.postId = postId;
    postNode.children[0].classList.add('each_post');

    const titleH1 = postNode.querySelector('post-title > h1');
    titleH1.textContent = post.title;

    const dateP = postNode.querySelector('post-date > p');
    dateP.textContent = post.date;

    const summaryP = postNode.querySelector('post-summary > p');
    summaryP.textContent = post.summary;

    const editButton = postNode.querySelector('post-edit > button');
    editButton.classList.add('edit_btn');
    editButton.addEventListener('click', () => {
        const edit_post = document.getElementById('edit_post');
        const new_title = document.getElementById('new_title');
        const new_date = document.getElementById('new_date');
        const new_summary = document.getElementById('new_summary');
        const new_submit = document.getElementById('new_submit');

        new_title.value = post.title;
        new_date.value = post.date;
        new_summary.textContent = post.summary;
        dialogVisable(edit_post);

        new_submit.addEventListener('click', () => {
            const posts = loadPosts();
            const targetPost = posts[postId];
            targetPost.title = new_title.value;
            targetPost.date = new_date.value;
            targetPost.summary = new_summary.value;
            storePosts(posts);
            redisplayAllPosts(document.getElementById('posts'));
        })
    })

    const deleteBtn = postNode.querySelector('post-delete > button');
    deleteBtn.classList.add('delete_btn')
    deleteBtn.addEventListener('click', () => {
        deletePost(postId);
        redisplayAllPosts(document.getElementById('posts'));
    })
    return postNode;
}


/**
 *
 * @param {*} container
 */
export function redisplayAllPosts(container) {
    const posts = selectAllPosts();
    container.innerHTML = '';
    for (const [id, post] of Object.entries(posts)) {
        container.appendChild(renderPost(id, post));
    }
}

export function dialogVisable(dialog) {
    if (typeof dialog.showModal === "function") {
        dialog.showModal();
    } else {
        outputLabel.value = "Sorry, the <dialog> API is not supported by this browser.";
    }
}