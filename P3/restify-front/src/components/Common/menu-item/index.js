const MenuItem = ({ key, name, price, description }) => {
    return <div key={ key }>
        <div class="columns" style={{marginLeft: "5%", marginRight: "5%"}}>
            <div class="column is-narrow">
                <h3 class="title is-4 has-text-grey-lighter">{ name }</h3>
            </div>

            <div class="column is-paddingless">
                <div style={{borderBottom: "1px dashed #b2b2b2", paddingTop: "3%"}}>
                </div>
            </div>

            <div class="column is-narrow has-pb-0">
                <h3 class="title is-4 has-text-grey-lighter">${ price }</h3>
            </div>
        </div>

        <div class="columns" style={{marginLeft: "10%", marginRight: "5%"}}>
            <p>{ description }</p>
        </div>
    </div>
}

export default MenuItem;