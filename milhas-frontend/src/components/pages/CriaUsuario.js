"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "../css/CriaUsuario.css"

const API = process.env.REACT_APP_API_BASE;

const CriaUsuario = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    senha: "",
    confirmarSenha: "",
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState("")
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    label: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Limpa o erro do campo quando o usuário começa a digitar
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }

    // Atualiza a força da senha se o campo for senha
    if (name === "senha") {
      checkPasswordStrength(value)
    }
  }

  const checkPasswordStrength = (password) => {
    // Verifica se a senha está vazia
    if (!password) {
      setPasswordStrength({ score: 0, label: "" })
      return
    }

    // Conta o número de dígitos na senha
    const digitCount = (password.match(/\d/g) || []).length

    // Conta o número de letras na senha
    const letterCount = (password.match(/[a-zA-Z]/g) || []).length

    // Verifica se a senha atende aos requisitos (6 números e 2 letras)
    if (digitCount === 6 && letterCount === 2) {
      setPasswordStrength({ score: 3, label: "Forte" })
    } else if (digitCount >= 4 && letterCount >= 1) {
      setPasswordStrength({ score: 2, label: "Média" })
    } else {
      setPasswordStrength({ score: 1, label: "Fraca" })
    }
  }

  const validateField = (name, value) => {
    switch (name) {
      case "nome":
        return value.trim() ? "" : "Nome é obrigatório"

      case "email":
        if (!value.trim()) return "Email é obrigatório"
        return /\S+@\S+\.\S+/.test(value) ? "" : "Email inválido"

      case "telefone":
        if (!value.trim()) return "Telefone é obrigatório"
        const phoneDigits = value.replace(/\D/g, "")
        return phoneDigits.length === 11 ? "" : "Telefone deve ter 11 dígitos (DDD + número)"

      case "senha":
        if (!value) return "Senha é obrigatória"
        if (value.length < 8) return "A senha deve ter pelo menos 8 caracteres"

        const digitCount = (value.match(/\d/g) || []).length
        const letterCount = (value.match(/[a-zA-Z]/g) || []).length

        if (digitCount !== 6) return "A senha deve conter exatamente 6 números"
        if (letterCount !== 2) return "A senha deve conter exatamente 2 letras"

        return ""

      case "confirmarSenha":
        return value === formData.senha ? "" : "As senhas não coincidem"

      default:
        return ""
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    const errorMessage = validateField(name, value)

    setErrors((prev) => ({
      ...prev,
      [name]: errorMessage,
    }))

    // Formata o telefone corretamente ao sair do campo
    if (name === "telefone" && value) {
      formatPhoneOnBlur(value)
    }
  }

  const formatPhoneOnBlur = (value) => {
    // Remove todos os caracteres não numéricos
    const digits = value.replace(/\D/g, "")

    // Garante que temos exatamente 11 dígitos
    if (digits.length === 11) {
      // Formata como (XX) XXXXX-XXXX
      const formattedPhone = `(${digits.substring(0, 2)}) ${digits.substring(2, 7)}-${digits.substring(7, 11)}`

      setFormData((prev) => ({
        ...prev,
        telefone: formattedPhone,
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Valida cada campo
    Object.keys(formData).forEach((field) => {
      const errorMessage = validateField(field, formData[field])
      if (errorMessage) {
        newErrors[field] = errorMessage
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handlePhoneInput = (e) => {
    let value = e.target.value
    value = value.replace(/\D/g, "") // Remove todos os caracteres não numéricos

    if (value.length <= 11) {
      let formattedValue = value

      // Formata o telefone como (XX) XXXXX-XXXX
      if (value.length > 2) {
        formattedValue = `(${value.substring(0, 2)}) ${value.substring(2)}`
      }
      if (value.length > 7) {
        formattedValue = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7)}`
      }

      setFormData({
        ...formData,
        telefone: formattedValue,
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (validateForm()) {
      setIsLoading(true)
      setApiError("")

      try {
        // Preparar dados para envio
        const userData = {
          nome: formData.nome,
          email: formData.email,
          telefone: formData.telefone,
          senha: formData.senha,
        }

        // Enviar requisição para o backend
        const response = await axios.post(`${API}/api/usuarios/cadastrar`, userData)

        // Redirecionar para a página de sucesso com o e-mail como parâmetro
        navigate("/cadastro-sucesso", {
          state: {
            email: formData.email,
            nome: formData.nome,
          },
        })
      } catch (error) {
        console.error("Erro ao criar usuário:", error)
        // 🔍 Adicione isso para inspecionar melhor:
  console.log("Erro detalhes:", error.response?.data);

        setApiError(error.response?.data?.message || "Ocorreu um erro ao criar sua conta. Por favor, tente novamente.")
      } finally {
        setIsLoading(false)
      }
    }
  }

  // Função para obter a cor da barra de força da senha
  const getPasswordStrengthColor = () => {
    if (passwordStrength.label === "Fraca") return "#e74c3c"
    if (passwordStrength.label === "Média") return "#f39c12"
    if (passwordStrength.label === "Forte") return "#2ecc71"
    return "#e0e0e0"
  }

  // Função para obter a largura da barra de força da senha
  const getPasswordStrengthWidth = () => {
    if (passwordStrength.label === "") return "0%"
    if (passwordStrength.label === "Fraca") return "33%"
    if (passwordStrength.label === "Média") return "66%"
    if (passwordStrength.label === "Forte") return "100%"
    return "0%"
  }

  return (
    <div className="cria-usuario-container">
      <div className="cria-usuario-card">
        <h2 className="cria-usuario-titulo">Criar Conta</h2>

        {apiError && <div className="cria-usuario-erro-api">{apiError}</div>}

        <form onSubmit={handleSubmit} className="cria-usuario-form">
          <div className="form-group">
            <label htmlFor="nome">Nome completo</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Digite seu nome completo"
              className={errors.nome ? "input-error" : ""}
            />
            {errors.nome && <span className="error-message">{errors.nome}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Digite seu e-mail"
              className={errors.email ? "input-error" : ""}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="telefone">Telefone</label>
            <input
              type="text"
              id="telefone"
              name="telefone"
              value={formData.telefone}
              onChange={handlePhoneInput}
              onBlur={handleBlur}
              placeholder="(11) 99999-9999"
              className={errors.telefone ? "input-error" : ""}
            />
            {errors.telefone && <span className="error-message">{errors.telefone}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="senha">Senha</label>
              <input
                type="password"
                id="senha"
                name="senha"
                value={formData.senha}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Digite sua senha"
                className={errors.senha ? "input-error" : ""}
              />
              <div className="password-requirements">A senha deve conter exatamente 6 números e 2 letras</div>
              {formData.senha && (
                <div className="password-strength-wrapper">
                  <div className="password-strength-container">
                    <div
                      className="password-strength-bar"
                      style={{
                        width: getPasswordStrengthWidth(),
                        backgroundColor: getPasswordStrengthColor(),
                      }}
                    ></div>
                  </div>
                  <span className="password-strength-text" style={{ color: getPasswordStrengthColor() }}>
                    {passwordStrength.label}
                  </span>
                </div>
              )}
              {errors.senha && <span className="error-message">{errors.senha}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmarSenha">Confirmar senha</label>
              <input
                type="password"
                id="confirmarSenha"
                name="confirmarSenha"
                value={formData.confirmarSenha}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Confirme sua senha"
                className={errors.confirmarSenha ? "input-error" : ""}
              />
              {errors.confirmarSenha && <span className="error-message">{errors.confirmarSenha}</span>}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-criar-conta" disabled={isLoading}>
              {isLoading ? "Criando conta..." : "Criar conta"}
            </button>
          </div>

          <div className="login-link">
            Já tem uma conta? <a href="/login">Faça login</a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CriaUsuario
