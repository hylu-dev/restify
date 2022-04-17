const PhotoCard = ({ name, photo }) => {
    return <div class="card" width="100%" height="100%">
        <div class="card-image">
        <figure class="image is-3by2">
            <img src={ photo } alt="" width="200" height="200"></img>
        </figure>
        </div>

        <div class="card-content" style={{padding: "10px"}}>
            <div class="media">
                <section class="container has-text-centered">
                    <p class="title is-3 my-1">{ name }</p>
                </section>
            </div>
        </div>

        <footer class="card-footer">
            <a class="card-footer-item">
                <span class="icon-text">
                    <span class="icon">
                        <i class="fas fa-trash-alt"></i>
                    </span>
                    <span>Delete</span>
                </span>
            </a>
        </footer>
    </div>
}

export default PhotoCard;