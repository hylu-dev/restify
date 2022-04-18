//import React, {useEffect, useState} from 'react';

const Posts = () => {
    return <>
        <div id="Posts-list" style={{backgroundColor: "white"}}>
            <div class="container">
                <div class="pt-6">
                <div class="box blog-post">
                    <article class="media">
                        <div class="media-left">
                        <figure class="image is-square is-96x96" style={{border: "2px dotted black", borderRadius: "55px"}}>
                            <img class="is-rounded" src="https://th.bing.com/th/id/R.23bce0ee3759a2d1f406aaeb0592ffea?rik=Huo25KyrLKlNGw&riu=http%3a%2f%2fcdn.abclocal.go.com%2fcontent%2fwpvi%2fimages%2fcms%2f306462_1280x720.jpg&ehk=usR8dR5UJvUM7sIxlatLasT0uW%2bsz41KQkRFgP8VwWc%3d&risl=&pid=ImgRaw&r=0" alt="Olive Garden"></img>
                        </figure>
                        </div>
                        <div class="media-content">
                            <div class="content my-5">
                            <div class="media-content">
                                <p class="title is-4">Olive Garden</p>
                                <p class="subtitle is-6">@unlimitedsoupsaladandbreadstickz</p>
                            </div>
                            </div>
                        </div>
                    </article>
                    <nav class="level is-mobile">
                        <div class="level-left"></div>
                        <div class="level-right"></div>
                        </nav>
                        <form method="POST">
                        <div class="comment-box">
                            <textarea class="textarea" placeholder="What's on your mind?" rows="4"></textarea>
                        </div>
                        <nav class="level is-mobile">
                            <div class="level-left"></div>
                        <div class="level-right pt-3">
                                <input type="submit" class="button is-medium is-primary" value="Create Post"></input>
                                </div>
                            </nav>
                        </form>  	
                </div>
            
                <div id="Sub-posts" class="mx-6 pb-6">
            
                    <div class="box blog-post">
                    <article class="media">
                        <div class="media-left">
                            <figure class="image is-square is-64x64" style={{border: "2px dotted black", borderRadius: "55px"}}>
                                <img class="is-rounded" src="https://th.bing.com/th/id/R.23bce0ee3759a2d1f406aaeb0592ffea?rik=Huo25KyrLKlNGw&riu=http%3a%2f%2fcdn.abclocal.go.com%2fcontent%2fwpvi%2fimages%2fcms%2f306462_1280x720.jpg&ehk=usR8dR5UJvUM7sIxlatLasT0uW%2bsz41KQkRFgP8VwWc%3d&risl=&pid=ImgRaw&r=0" alt="Olive Garden"></img>
                            </figure>
                        </div>
                        <div class="media-content">
                            <div class="content">
                                <p>
                                <strong>@unlimitedsoupsaladandbreadstickz</strong> <a href="/"><small>Olive Garden</small></a> <small>31m</small>
                                    <br></br>
                                    Come try our unlimited soup, salad, and breadsticks for just <strong>$5</strong>! This deal lasts until 2/27.
                                </p>
                            </div>
                        </div>
                    </article>
                    <nav class="level is-mobile">
                        <div class="level-left pt-3">
                            <a class="button is-danger my-1" href="/">
                            <span class="icon">
                                <i class="fas fa-trash-alt"></i>
                            </span>
                            <span>Delete Post</span>
                            </a>
                        </div>
                        <div class="level-right">
                            <div class="heart reply">
                            <i class="fa-regular fa-hover-hidden fa-comment-dots fa-2xl"></i>
                            <i class="fa-solid fa-hover-show fa-comment-dots fa-2xl"></i>
                        </div>
                            <div class="heart reply">
                            <i class="fa-regular fa-hover-hidden fa-heart fa-2xl"></i>
                            <i class="fa-solid fa-hover-show fa-heart fa-2xl"></i>
                        </div>
                            </div>
                        </nav>
                    </div>
            
                    <div class="box blog-post">
                    <article class="media">
                        <div class="media-left">
                            <figure class="image is-square is-64x64" style={{border: "2px dotted black", borderRadius: "55px"}}>
                            <img class="is-rounded" src="https://th.bing.com/th/id/R.23bce0ee3759a2d1f406aaeb0592ffea?rik=Huo25KyrLKlNGw&riu=http%3a%2f%2fcdn.abclocal.go.com%2fcontent%2fwpvi%2fimages%2fcms%2f306462_1280x720.jpg&ehk=usR8dR5UJvUM7sIxlatLasT0uW%2bsz41KQkRFgP8VwWc%3d&risl=&pid=ImgRaw&r=0" alt="Olive Garden"></img>
                            </figure>
                        </div>
                        <div class="media-content">
                            <div class="content">
                            <p>
                                <strong>@unlimitedsoupsaladandbreadstickz</strong> <a href="/"><small>Olive Garden</small></a> <small>1mo</small>
                                <br></br>
                                Try our all new Dinner Selections, such as the <strong>Osso Buco</strong> and <strong>Linguine Vongole</strong> starting at just <strong>$22.99</strong> for a limited time only! Deals last until 1/16!
                            </p>
                            </div>
                        </div>
                    </article>
                    <nav class="level is-mobile">
                        <div class="level-left pt-3">
                            <a class="button is-danger my-1" href="/">
                            <span class="icon">
                                <i class="fas fa-trash-alt"></i>
                            </span>
                            <span>Delete Post</span>
                            </a>
                        </div>
                        <div class="level-right">
                            <div class="heart reply">
                            <i class="fa-regular fa-hover-hidden fa-comment-dots fa-2xl"></i>
                            <i class="fa-solid fa-hover-show fa-comment-dots fa-2xl"></i>
                        </div>
                            <div class="heart reply">
                            <i class="fa-regular fa-hover-hidden fa-heart fa-2xl"></i>
                            <i class="fa-solid fa-hover-show fa-heart fa-2xl"></i>
                        </div>
                            </div>
                        </nav>
                        <hr></hr>
                        <article class="media comment">
                        <div class="media-left">
                            <figure class="image is-64x64">
                                <img src="https://vistapointe.net/images/stick-man-1.jpg" alt="Person"></img>
                            </figure>
                        </div>
                        <div class="media-content">
                            <div class="content">
                                <p>
                                <strong>@humbleman1212</strong> <small>20m</small>
                                    <br></br>
                                    Your pasta is terrible!!!
                                </p>
                            </div>
                        </div>
                    </article>
            
                    <article class="media">
                            <div class="media-left">
                                <figure class="image is-square is-64x64" style={{border: "2px dotted black", borderRadius: "55px"}}>
                                <img class="is-rounded" src="https://th.bing.com/th/id/R.23bce0ee3759a2d1f406aaeb0592ffea?rik=Huo25KyrLKlNGw&riu=http%3a%2f%2fcdn.abclocal.go.com%2fcontent%2fwpvi%2fimages%2fcms%2f306462_1280x720.jpg&ehk=usR8dR5UJvUM7sIxlatLasT0uW%2bsz41KQkRFgP8VwWc%3d&risl=&pid=ImgRaw&r=0" alt="Olive Garden"></img>
                                </figure>
                            </div>
                            <div class="media-content">
                                <div class="content my-1">
                                <div class="media-content">
                                    <p class="title is-4">Olive Garden</p>
                                    <p class="subtitle is-6">@unlimitedsoupsaladandbreadstickz</p>
                                </div>
                                </div>
                            </div>
                    </article>
                    <nav class="level is-mobile">
                            <div class="level-left"></div>
                            <div class="level-right">
                                <div class="heart reply">
                            <i class="fa-regular fa-hover-hidden fa-comment-dots fa-2xl"></i>
                            <i class="fa-solid fa-hover-show fa-comment-dots fa-2xl"></i>
                            </div>
                            <div class="heart reply">
                            <i class="fa-regular fa-hover-hidden fa-heart fa-2xl"></i>
                            <i class="fa-solid fa-hover-show fa-heart fa-2xl"></i>
                            </div>
                            </div>
                            </nav>
                            <form method="POST">
                            <div class="comment-box">
                                <textarea class="textarea" placeholder="Write your comment here" rows="2"></textarea>
                            </div>
                            <nav class="level is-mobile">
                                <div class="level-left"></div>
                                <div class="level-right pt-3">
                                <input type="submit" class="reply-button button is-primary" value="Post Comment"></input>
                                </div>
                            </nav>
                            </form> 	
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Posts