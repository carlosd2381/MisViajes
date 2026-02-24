export function LoginForm() {
  return (
    <form className="form-grid">
      <label htmlFor="email">Correo</label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="agente@misviajes.mx"
        required
        className="input-control"
      />

      <label htmlFor="password">Contraseña</label>
      <input id="password" name="password" type="password" required className="input-control" />

      <button type="submit" className="btn-primary">
        Entrar
      </button>
    </form>
  );
}
