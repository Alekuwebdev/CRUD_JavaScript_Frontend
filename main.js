const postsList = document.querySelector('.card')
const addPostForm = document.querySelector('.add-post')
const titleValue = document.getElementById('title-value')
const bodyValue = document.getElementById('body-value')
const btnSubmit = document.querySelector('.btn')
let output = ''


const url = 'http://localhost:4000/api/posts/'

const renderPosts = (posts) => {
    posts.forEach(post => {
        output += `
    <div class="card mt-4">
        <div class="card-body" data-id=${post._id}>
          <h5 class="card-title">${post.title}</h5>
          <p class="card-text">${post.content}</p>
          <p class="card-text">${post.createdAt}</p>
          <button id="edit" class="btn btn-primary">Edit</button>
          <button id="delete" class="btn btn-primary">Delete</button>
        </div>
    </div>
        `
        console.log(post)
    });
    postsList.innerHTML = output;
}

// Method: GET
fetch(url)
    .then(res=>res.json())
    .then(data=>renderPosts(data))

postsList.addEventListener('click', (e) => {
    e.preventDefault();

    let delButtonIsPressed = e.target.id == 'delete';
    let editButtonIsPressed = e.target.id == 'edit';

    let id = e.target.parentElement.dataset.id

    // Method: DELETE
    if(delButtonIsPressed) {
        fetch(`${url}/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(() => location.reload())
    }

    if(editButtonIsPressed) {
        const parent = e.target.parentElement;
        let titleContent = parent.querySelector('.card-title').textContent;
        let bodyContent = parent.querySelector('.card-text').textContent;

        titleValue.value = titleContent;
        bodyValue.value = bodyContent;
    }

    // Method: PATCH (update)
    btnSubmit.addEventListener('click', (e) => {
        
        e.preventDefault()

        fetch(`${url}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: titleValue.value,
                content: bodyValue.value
            })
        })
        .then(res => res.json())
        .then(() => location.reload())
    })

})

addPostForm.addEventListener('submit', (e) => {
    
    e.preventDefault()

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: titleValue.value,
            content: bodyValue.value
        })
    })
    .then(res => res.json())

        .then(data => {
            const dataArr = [];
            dataArr.push(data);
            renderPosts(dataArr);
        })

        // reset input field to empty 
        titleValue.value = ''
        bodyValue.value = ''

})