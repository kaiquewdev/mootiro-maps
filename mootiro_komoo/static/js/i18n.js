var trans;

trans = {
  'send': {
    'pt-br': 'enviar'
  },
  'Login': {
    'pt-br': 'Entrar'
  },
  'Logout': {
    'pt-br': 'Sair'
  },
  'Help': {
    'pt-br': 'Ajuda'
  },
  'Email': {
    'pt-br': 'E-mail'
  },
  'Password': {
    'pt-br': 'Senha'
  },
  'Name': {
    'pt-br': 'Nome'
  },
  'Password Confirmation': {
    'pt-br': 'Confirmação da Senha'
  },
  'Log In with Google': {
    'pt-br': 'Entre com o Google'
  },
  'Log In with Facebook': {
    'pt-br': 'Entre com o Facebook'
  },
  'Register': {
    'pt-br': 'Registrar'
  },
  'Verification': {
    'pt-br': 'Verificação'
  },
  'Your email was successfully verified.': {
    'pt-br': 'Seu email foi verificado com sucesso.'
  },
  'Please login.': {
    'pt-br': 'Por favor, faça login ao lado.'
  },
  'I\'ve read and accept the <a href="http://mootiro.org/terms">License Terms.</a>': {
    'pt-br': 'Eu li e aceito os <a href="http://mootiro.org/terms">Termos de Uso</a>.'
  },
  'Already has an account? <strong>Sign In</strong>': {
    'pt-br': 'Já possui uma conta? <strong>Entre</strong>'
  },
  'Don\'t have an account? <strong>Sign Up</strong>': {
    'pt-br': 'Não possui uma conta? <strong>Registre-se</strong>'
  },
  'or': {
    'pt-br': 'ou'
  },
  'Your account was created!': {
    'pt-br': 'Sua conta foi criada!'
  },
  'But before using, you have to confirm your email': {
    'pt-br': 'Mas antes de começar a usar, você precisa confirmar seu e-mail'
  },
  'Please go check your mail box': {
    'pt-br': 'Por favor, vá checar sua caixa postal'
  },
  'Search': {
    'pt-br': 'Procurar'
  },
  'See results': {
    'pt-br': 'Ver resultados'
  },
  'More about': {
    'pt-br': 'Saiba mais'
  },
  'About MootiroMaps': {
    'pt-br': 'Sobre o MootiroMaps'
  },
  'About Us': {
    'pt-br': 'Quem somos'
  },
  'Get involved': {
    'pt-br': 'Se envolva'
  },
  'Supporters': {
    'pt-br': 'Apoio institucional'
  }
};

window.i18n = function(str) {
  var lang, _ref;
  lang = KomooNS.lang;
  if ((_ref = trans[str]) != null ? _ref[lang] : void 0) {
    return trans[str][lang];
  } else {
    return str;
  }
};
