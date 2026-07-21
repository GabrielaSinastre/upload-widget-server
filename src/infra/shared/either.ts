// Representa um retorno de ERRO.
// Quando existe "left", nunca pode existir "right".
export type Left<T> = {
  left: T
  right?: never
}

// Representa um retorno de SUCESSO.
// Quando existe "right", nunca pode existir "left".
export type Right<U> = {
  left?: never
  right: U
}

// Either significa que uma função pode retornar:
// - Left (erro)
// OU
// - Right (sucesso)
// T = tipo do erro
// U = tipo do sucesso
//
// Exemplos:
// Either<string, User>
// Erro:
// { left: "Usuário não encontrado" }
// Sucesso:
// { right: user }
export type Either<T, U> = NonNullable<Left<T> | Right<U>>

// Type Guard. - Verifica se o retorno é um Left (erro).
// O "e is Left<T>" informa ao TypeScript que,
// caso essa função retorne true,
// o objeto "e" passa a ser tratado como Left<T>.
export const isLeft = <T, U>(e: Either<T, U>): e is Left<T> => {
  return e.left !== undefined
}

// Type Guard. - Verifica se o retorno é um Right (sucesso)
// Se retornar true,
// o TypeScript sabe que "e" é do tipo Right<U>.
export const isRight = <T, U>(e: Either<T, U>): e is Right<U> => {
  return e.right !== undefined
}

// Define o tipo da função unwrapEither.
// Ela recebe um Either e devolve apenas o valor que está dentro dele,
// seja o erro (Left) ou o sucesso (Right).
export type UnwrapEither = <T, U>(e: Either<T, U>) => NonNullable<T | U>

// Remove a "caixa" Either.
// Exemplo:
// { left: "Erro" }
// ↓
// "Erro"
//
// { right: user }
// ↓
// user
export const unwrapEither: UnwrapEither = <T, U>({
  left,
  right,
}: Either<T, U>) => {
  // Segurança:
  // Nunca deveria existir Left e Right ao mesmo tempo.
  // Se isso acontecer, significa que algum código criou o Either incorretamente.
  if (right !== undefined && left !== undefined) {
    throw new Error(
      `Received both left and right values at runtime when opening an Either\nLeft: ${JSON.stringify(
        left
      )}\nRight: ${JSON.stringify(right)}`
    )
  }

  // Se existe Left, devolve o erro.
  if (left !== undefined) {
    return left as NonNullable<T>
  }

  // Se existe Right, devolve o sucesso.
  if (right !== undefined) {
    return right as NonNullable<U>
  }

  // Segurança:
  // Também nunca deveria acontecer de não existir
  // nem Left nem Right.
  throw new Error(
    'Received no left or right values at runtime when opening Either'
  )
}

// Atalho para criar um Left.
// Em vez de escrever:  { left: erro }
// basta fazer:         makeLeft(erro)
export const makeLeft = <T>(value: T): Left<T> => ({ left: value })

// Atalho para criar um Right.
// Em vez de escrever:  { right: valor }
// basta fazer:         makeRight(valor)
export const makeRight = <U>(value: U): Right<U> => ({ right: value })
