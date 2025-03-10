import React from 'react';
/*************  ✨ Codeium Command ⭐  *************/
/**
 * GuiaUsuarioPage component renders the main content for the user guide page.
 */
const GuiaUsuarioPage = () => {
    return (
        <main>
            <h1>Guia de Usuário</h1>

            {/* Sessão 1 - Introdução*/}  
            <section id="intro">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12"> 
                            <h2 className="h1">Bem-vindo ao Guia de Usuário</h2>
                            <p className="m-b-40">Aqui, vamos explicar como usar o nosso site de ofertas de milhas.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sessão 2 - Cadastro de Usuários  */}
            <section id="cadastro">
            <div className="container">
                    <div className="row">
                        <div className="col-md-12"> 
                            <h2 className="h1">Como funciona e por que você deve se cadastrar no nosso site</h2>
                            <p className="m-b-40"></p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sessão 3 - Sistema de Milhas  */}
            <section id="sistema-milhas">
                <h2>Como Funciona o Sistema de Milhas</h2>
                <ul className=''>
                    <li>Visualizar saldo de milhas no painel principal.</li>
                    <li>Comprar ou vender milhas diretamente pelo sistema.</li>
                    <li>Transferir milhas para outro usuário com um clique.</li>
                </ul>
            </section>
            {/* Seção 4 - Garantias de compra e venda */}
            <section id="garantias">
                <div className='container'>

                </div>
            </section>
        </main>
    )

}
export default GuiaUsuarioPage;