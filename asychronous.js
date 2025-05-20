// global variables
const forumLatest = "https://cdn.freecodecamp.org/curriculum/forum-latest/latest.json";
const forumTopicUrl = "https://forum.freecodecamp.org/t/";
const forumCategoryUrl = "https://forum.freecodecamp.org/c/";
const avatarUrl = "https://sea1.discourse-cdn.com/freecodecamp";
const postsContainer = document.getElementById("posts-container");

// time function
const timeAgo = time => {
    const currentTime = new Date();
    const lastPost = new Date(time);

    const minutes = Math.floor((currentTime - lastPost) / 60000);
    const hours = Math.floor((currentTime - lastPost) / 3600000);
    const days = Math.floor((currentTime - lastPost) / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
};

// function to convert view counts
const viewCount = views => {
    return (views >= 1000) ? `${Math.floor(views / 1000)}k` : views;
};

// async function to fetch data from the API
const fetchData = async () => {
    try{
        const res = await fetch(forumLatest);
        const data = await res.json();
        showLatestPosts(data);
    }
    catch(err){
        console.log(err);
    };
};

fetchData();

// function to display data on page
const showLatestPosts = data => {
    const {topic_list, users} = data;
    const {topics} = topic_list;
    postsContainer.innerHTML = topics.map(item => {
        const {id, title, views, posts_count, slug, posters, category_id, bumped_at} = item;
        return `
            <tr>
                <td>
                    <p class="post-title">${title}</p>
                </td>
                <td></td>
                <td>${posts_count - 1}</td>
                <td>${viewCount(views)}</td>
                <td>${timeAgo(bumped_at)}</td>
            </tr>
        `;
    }).join("");
};
