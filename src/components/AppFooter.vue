<script>
export default {
    data() {
        return {
            deliveboofooter: [
                {
                    link: "Investitori",
                },
                {
                    link: "Chi siamo",
                },
                {
                    link: "Ristoranti",
                },
                {
                    link: "Altro",
                },
                {
                    link: "Pressroom",
                },
                {
                    link: "Programmazione",
                },
                {
                    link: "Design",
                },
                {
                    link: "Lavora con noi",
                },
                {
                    link: "Diventa nostro partner",
                },
            ],
            note: [
                {
                    link: "Termini & Condizioni",
                },
                {
                    link: "Informativa sulla privacy",
                },
                {
                    link: "Cookies",
                },
                {
                    link: "Classificazione dei partner",
                },
                {
                    link: "Classificazione dei partner",
                },
            ],
            aiuto: [
                {
                    link: "Contatti",
                },
                {
                    link: "FAQ",
                },
                {
                    link: "Tipi di cucina",
                },
            ],
            icons: [
                {
                    img: "./src/assets/img/footer-facebook.png",
                },
                {
                    img: "./src/assets/img/footer-periscope.png",
                },
                {
                    img: "./src/assets/img/footer-pinterest.png",
                },
                {
                    img: "./src/assets/img/footer-twitter.png",
                },
                {
                    img: "./src/assets/img/footer-twitter.png",
                },
            ],
        };
    },
};
</script>

<template>
    <footer>
        <div class="bg_footer">
            <div class="mycontainer">
                <div class="top_footer">
                    <div class="row">
                        <div class="col p-3">
                            <ul>
                                <li><h4>Deliveboo</h4></li>
                                <li v-for="(link, index) in deliveboofooter">
                                    <a href="">{{
                                        deliveboofooter[index].link
                                    }}</a>
                                </li>
                            </ul>
                        </div>
                        <div class="col p-3">
                            <ul>
                                <li><h4>Note Legali</h4></li>
                                <li v-for="(link, index) in note">
                                    <a href="">{{ note[index].link }}</a>
                                </li>
                            </ul>
                        </div>
                        <div class="col p-3">
                            <ul>
                                <li><h4>Aiuto</h4></li>
                                <li v-for="(link, index) in aiuto">
                                    <a href="">{{ aiuto[index].link }}</a>
                                </li>
                            </ul>
                        </div>
                        <div class="col p-3">
                            <h4 class="mb-3 text-center">Porta Deliveboo con te</h4>
                            <div class="buttons-container">
                                <div class="single-button">
                                    <a href="#nogo">
                                        <img
                                            src="../assets/img/apple-store-badge.png"
                                            alt=""
                                        />
                                    </a>
                                </div>

                                <div class="single-button">
                                    <a href="#nogo">
                                        <img
                                            src="../assets/img/google-play-badge.png"
                                            alt=""
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<style lang="scss" scoped>
.bg_footer {
    background-color: #292c2d;
    color: white;
    .mycontainer {
        max-width: 1200px;
        margin: 0 auto;
        width: 100%;
        padding: 40px;
        .top_footer {
            display: flex;
            justify-content: center;
            ul {
                li {
                    list-style: none;
                    > a {
                        text-decoration: none;
                        font-size: 0.9rem;
                        font-weight: 300;
                        color: white;
                        &:hover {
                            color: #6aaed7;
                        }
                    }
                }
            }
        }
        .buttons-container {
            display: flex;
            flex-direction: column;
            width: 100%;
            padding-top: 25px;
            align-items:center;
            .single-button {
                width: 180px;
                margin-bottom: 10px;
                img {
                    width: 100%;
                    height: 100%;
                    
                }
            }
        }
    }
}
</style>
