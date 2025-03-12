import React from "react";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";

/*
 * GuiaUsuarioPage component renders the main content for the user guide page.
 */
const GuiaUsuarioPage = () => {
    return (
        <main className="text-center d-flex flex-column min-vh-100">
            {/* Sessão 1 - Introdução*/}
            <section id="intro">
                <div className="px-4 py-5 my-5 text-center">
                    {/* <img logo do sistema/> */}
                    <h1 className="display-2 fw-bold text-link-body-emphasis">Guia de Usuário</h1>
                    <div className="col-lg-6 mx-auto">
                        <p className="lead mb-5">
                            Bem-vindo ao nosso <strong>guia de usuário!</strong> Aqui, você irá aprender tudo sobre como usar nosso balcão de milhas.
                        </p>
                    </div>
                </div>
            </section>
            {/* Sessão 2 - Cadastro de Usuários  */}
            <section id="cadastro">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2 className="display-7 fw-bold text-link-body-emphasis">Cadastro de Usuários</h2>
                            <p className="lead mb-5">Cadastre-se para acessar todos os recursos do nosso sistema e gerenciar suas milhas de forma prática e segura.</p>
                        </div>
                    </div>
                </div>
            </section>
            {/* Sessão 3 - Sistema de Milhas  */}
            <section id="sistema-milhas">
                <div>
                    <h2 className="display-7 fw-bold text-link-body-emphasis">Como Funciona o Sistema de Milhas</h2>
                </div>
                <div id="myCarousel" className="carousel slide mb-6" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" className="active" aria-label="Slide 1" aria-current="true"></button>
                        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2" ></button>
                        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3" ></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <svg className="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false">
                                <rect width="100%" height="100%" fill="var(--bs-secondary-color)"></rect>
                            </svg>
                            <div className="container">
                                <div className="carousel-caption text-center">
                                    <h5 className="display-7">Funcionalidade X</h5>
                                    <p className="lead opacity-75">Aqui vamos explicar a funcionalidade X</p>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <svg className="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false">
                                <rect width="100%" height="100%" fill="var(--bs-secondary-color)"></rect>
                            </svg>
                            <div className="container">
                                <div className="carousel-caption text-center">
                                    <h5 className="display-7">Funcionalidade Y</h5>
                                    <p className="lead opacity-75">Aqui vamos explicar a funcionalidade Y</p>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <svg className="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false">
                                <rect width="100%" height="100%" fill="var(--bs-secondary-color)"></rect>
                            </svg>
                            <div className="container">
                                <div className="carousel-caption text-center">
                                    <h5 className="display-7">Funcionalidade Z</h5>
                                    <p className="lead opacity-75">Aqui vamos explicar a funcionalidade Z</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </section>
            {/* Seção 4 - Garantias de compra e venda */}
            <section id="garantias">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2 className="display-7 fw-bold text-link-body-emphasis">Garantias de Compra e Venda</h2>
                            <p className="lead mb-5">Como funcionam as <strong>garantias</strong> e por que devemos usar no nosso sistema?</p>
                            <p className="lead">Primeiramente, pensamos na segurança dos nossos usuários, sejam eles compradores ou vendedores de milhhas.<br />
                            Por isso o uso, pois as garantias nos ajudam a evitar fraudes e transações falsas.</p>
                        </div>
                    </div>
                </div>
            </section>
            <footer className="mt-auto text-center py-3 footer-custom">
                <p className="lead mb-5">Footer</p>
            </footer>
        </main>
    )
}
export default GuiaUsuarioPage;