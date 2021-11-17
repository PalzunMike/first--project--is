import PageController from "./PageController.js";
import { postsDataLayer } from "../database/PostsDataLayer.js";
import { usersDataLayer } from "../database/UsersDataLayer.js";

class PageTape extends PageController {

    async renderTapePage() {
        this.renderWelcomeMsg();
        const limitPosts = 3;
        let offsetPosts = 0;
        const tape = document.createElement('div');
        tape.classList.add('tape_wrapper');

        const posts = await this.getPostElement(limitPosts, offsetPosts);

        for (let i = 0; i < posts.length; i++) {
            tape.append(posts[i]);
        }
        await this.renderContent(tape);

        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.7
        };

        let tapeLast = tape.lastElementChild;

        function handleIntersect(entries, observer) {
            entries.forEach(async (entry) => {
                if (entry.isIntersecting) {
                    offsetPosts += 3;
                    const posts = await pageTape.getPostElement(limitPosts, offsetPosts);
                    console.log(posts);                    
                    for (let i = 0; i < posts.length; i++) {
                        tape.append(posts[i]);
                    }
                }
                tapeLast = tape.lastElementChild;                
            });
            observer.observe(tapeLast);
        }

        let observer = new IntersectionObserver(handleIntersect, options);
        
        observer.observe(tapeLast);

        // window.addEventListener('scroll', async () => {
        //     const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        //     // console.log(scrollTop, scrollHeight, clientHeight);
        //     if (scrollTop + clientHeight >= scrollHeight) {
        //         offsetPosts += 2;
        //         const posts = await this.getPostElement(limitPosts, offsetPosts);
        //         console.log(posts);
        //         for (let i = 0; i < posts.length; i++) {
        //             tape.append(posts[i]);
        //         }
        //     }
        // })

    }
    
    async getPostElement(limit, offset) {
        const posts = await postsDataLayer.getAllPosts(limit, offset);

        if (!posts) {
            const mainContent = document.createElement('h3');
            mainContent.textContent = 'Публикаций пока нет!'
            this.renderContent(mainContent);
        }

        const postsElements = await Promise.all(
            posts.map(async post => {
                const tapeElementTempalte = document.querySelector('#tape_element_template');
                const tapeElement = tapeElementTempalte.content.cloneNode(true);

                const divTapeEl = tapeElement.querySelector('.tape_element');
                divTapeEl.dataset.postId = post._id;

                const photoImg = tapeElement.querySelector('.photo');
                photoImg.src = `data:image/jpeg;base64, ${post.photo}`;

                const title = tapeElement.querySelector('.title');
                if (post.title) {
                    title.innerText = post.title;
                }

                const timePost = tapeElement.querySelector('.time-post');
                const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
                const date = new Date(post.date);
                timePost.innerText = date.toLocaleDateString('ru-RU', optionsDate);

                const author = tapeElement.querySelector('.author');
                const nameAuthor = await usersDataLayer.getAuthor(post._id);
                author.innerText = `Автор: ${nameAuthor.firstName} ${nameAuthor.secondName}`;

                const imgLike = tapeElement.querySelector('.like_img');
                if (post.likesAuthor.includes(this.authUserId)) {
                    imgLike.src = "/assets/img/liked.png";
                } else {
                    imgLike.src = "/assets/img/like.png";
                }
                const likes = tapeElement.querySelector('.count_likes');
                likes.innerText = post.likesAuthor.length;
                return tapeElement;
            })
        )
        return postsElements;
    }

    async addOrDeleteLike(tapeElement) {
        const imgLike = tapeElement.querySelector('.like_img');
        const fakePost = {
            likesAuthor: this.authUserId
        }
        const hasLike = await postsDataLayer.updatePostForLike(tapeElement.dataset.postId, fakePost);
        if (hasLike) {
            imgLike.src = "/assets/img/liked.png";
        } else {
            imgLike.src = "/assets/img/like.png";
        }
        await this.renderCountLikes(tapeElement);
    }

    async renderCountLikes(tapeElement) {
        const likes = tapeElement.querySelector('.count_likes');
        const post = await postsDataLayer.getOnePost(tapeElement.dataset.postId);
        likes.innerText = post.likesAuthor.length;
    }
}

export const pageTape = new PageTape();