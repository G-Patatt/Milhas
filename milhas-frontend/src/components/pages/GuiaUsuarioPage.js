import React from "react";

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


            <div>
                <div>

                </div>
            </div>
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
                <h2 className="display-7 fw-bold text-link-body-emphasis">Como Funciona o Sistema de Milhas</h2>
                    <li>Funcionalidade X</li>
                    <li>Funcionalidade Y</li>
                    <li>Funcionalidade Z</li>
            </section>
            {/* Seção 4 - Garantias de compra e venda */}
            <section id="garantias">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2 className="display-7 fw-bold text-link-body-emphasis">Garantias de Compra e Venda</h2>
                            <p className="lead mb-5">Como funcionam as <strong>garantias</strong> e por que devemos usar no nosso sistema?</p>
                            <p>Primeiramente, pensamos na segurança dos nossos usuários, sejam eles compradores ou vendedores de milhhas.<br/>
                            Por isso, as garantias nos ajudam a evitar fraudes e transações falsas.</p>
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