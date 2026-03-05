
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Student
 * 
 */
export type Student = $Result.DefaultSelection<Prisma.$StudentPayload>
/**
 * Model Teacher
 * 
 */
export type Teacher = $Result.DefaultSelection<Prisma.$TeacherPayload>
/**
 * Model Domain
 * 
 */
export type Domain = $Result.DefaultSelection<Prisma.$DomainPayload>
/**
 * Model subDomain
 * 
 */
export type subDomain = $Result.DefaultSelection<Prisma.$subDomainPayload>
/**
 * Model Course
 * 
 */
export type Course = $Result.DefaultSelection<Prisma.$CoursePayload>
/**
 * Model quiz
 * 
 */
export type quiz = $Result.DefaultSelection<Prisma.$quizPayload>
/**
 * Model q_response
 * 
 */
export type q_response = $Result.DefaultSelection<Prisma.$q_responsePayload>
/**
 * Model enroll
 * 
 */
export type enroll = $Result.DefaultSelection<Prisma.$enrollPayload>
/**
 * Model score
 * 
 */
export type score = $Result.DefaultSelection<Prisma.$scorePayload>
/**
 * Model review
 * 
 */
export type review = $Result.DefaultSelection<Prisma.$reviewPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const level: {
  beginner: 'beginner',
  intermediate: 'intermediate',
  advanced: 'advanced',
  master: 'master'
};

export type level = (typeof level)[keyof typeof level]


export const crs_type: {
  pdf: 'pdf',
  video: 'video',
  mindmap: 'mindmap',
  docs: 'docs',
  article: 'article'
};

export type crs_type = (typeof crs_type)[keyof typeof crs_type]


export const difficulty: {
  easy: 'easy',
  medium: 'medium',
  hard: 'hard',
  pro: 'pro'
};

export type difficulty = (typeof difficulty)[keyof typeof difficulty]

}

export type level = $Enums.level

export const level: typeof $Enums.level

export type crs_type = $Enums.crs_type

export const crs_type: typeof $Enums.crs_type

export type difficulty = $Enums.difficulty

export const difficulty: typeof $Enums.difficulty

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Students
 * const students = await prisma.student.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Students
   * const students = await prisma.student.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.student`: Exposes CRUD operations for the **Student** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Students
    * const students = await prisma.student.findMany()
    * ```
    */
  get student(): Prisma.StudentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.teacher`: Exposes CRUD operations for the **Teacher** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Teachers
    * const teachers = await prisma.teacher.findMany()
    * ```
    */
  get teacher(): Prisma.TeacherDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.domain`: Exposes CRUD operations for the **Domain** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Domains
    * const domains = await prisma.domain.findMany()
    * ```
    */
  get domain(): Prisma.DomainDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.subDomain`: Exposes CRUD operations for the **subDomain** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SubDomains
    * const subDomains = await prisma.subDomain.findMany()
    * ```
    */
  get subDomain(): Prisma.subDomainDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.course`: Exposes CRUD operations for the **Course** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Courses
    * const courses = await prisma.course.findMany()
    * ```
    */
  get course(): Prisma.CourseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.quiz`: Exposes CRUD operations for the **quiz** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Quizzes
    * const quizzes = await prisma.quiz.findMany()
    * ```
    */
  get quiz(): Prisma.quizDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.q_response`: Exposes CRUD operations for the **q_response** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Q_responses
    * const q_responses = await prisma.q_response.findMany()
    * ```
    */
  get q_response(): Prisma.q_responseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.enroll`: Exposes CRUD operations for the **enroll** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Enrolls
    * const enrolls = await prisma.enroll.findMany()
    * ```
    */
  get enroll(): Prisma.enrollDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.score`: Exposes CRUD operations for the **score** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Scores
    * const scores = await prisma.score.findMany()
    * ```
    */
  get score(): Prisma.scoreDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.review`: Exposes CRUD operations for the **review** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reviews
    * const reviews = await prisma.review.findMany()
    * ```
    */
  get review(): Prisma.reviewDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.4.1
   * Query Engine version: 55ae170b1ced7fc6ed07a15f110549408c501bb3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Student: 'Student',
    Teacher: 'Teacher',
    Domain: 'Domain',
    subDomain: 'subDomain',
    Course: 'Course',
    quiz: 'quiz',
    q_response: 'q_response',
    enroll: 'enroll',
    score: 'score',
    review: 'review'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "student" | "teacher" | "domain" | "subDomain" | "course" | "quiz" | "q_response" | "enroll" | "score" | "review"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Student: {
        payload: Prisma.$StudentPayload<ExtArgs>
        fields: Prisma.StudentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StudentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StudentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          findFirst: {
            args: Prisma.StudentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StudentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          findMany: {
            args: Prisma.StudentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>[]
          }
          create: {
            args: Prisma.StudentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          createMany: {
            args: Prisma.StudentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StudentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>[]
          }
          delete: {
            args: Prisma.StudentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          update: {
            args: Prisma.StudentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          deleteMany: {
            args: Prisma.StudentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StudentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StudentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>[]
          }
          upsert: {
            args: Prisma.StudentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          aggregate: {
            args: Prisma.StudentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStudent>
          }
          groupBy: {
            args: Prisma.StudentGroupByArgs<ExtArgs>
            result: $Utils.Optional<StudentGroupByOutputType>[]
          }
          count: {
            args: Prisma.StudentCountArgs<ExtArgs>
            result: $Utils.Optional<StudentCountAggregateOutputType> | number
          }
        }
      }
      Teacher: {
        payload: Prisma.$TeacherPayload<ExtArgs>
        fields: Prisma.TeacherFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TeacherFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TeacherFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          findFirst: {
            args: Prisma.TeacherFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TeacherFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          findMany: {
            args: Prisma.TeacherFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>[]
          }
          create: {
            args: Prisma.TeacherCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          createMany: {
            args: Prisma.TeacherCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TeacherCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>[]
          }
          delete: {
            args: Prisma.TeacherDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          update: {
            args: Prisma.TeacherUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          deleteMany: {
            args: Prisma.TeacherDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TeacherUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TeacherUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>[]
          }
          upsert: {
            args: Prisma.TeacherUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          aggregate: {
            args: Prisma.TeacherAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTeacher>
          }
          groupBy: {
            args: Prisma.TeacherGroupByArgs<ExtArgs>
            result: $Utils.Optional<TeacherGroupByOutputType>[]
          }
          count: {
            args: Prisma.TeacherCountArgs<ExtArgs>
            result: $Utils.Optional<TeacherCountAggregateOutputType> | number
          }
        }
      }
      Domain: {
        payload: Prisma.$DomainPayload<ExtArgs>
        fields: Prisma.DomainFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DomainFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DomainFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPayload>
          }
          findFirst: {
            args: Prisma.DomainFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DomainFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPayload>
          }
          findMany: {
            args: Prisma.DomainFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPayload>[]
          }
          create: {
            args: Prisma.DomainCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPayload>
          }
          createMany: {
            args: Prisma.DomainCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DomainCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPayload>[]
          }
          delete: {
            args: Prisma.DomainDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPayload>
          }
          update: {
            args: Prisma.DomainUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPayload>
          }
          deleteMany: {
            args: Prisma.DomainDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DomainUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DomainUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPayload>[]
          }
          upsert: {
            args: Prisma.DomainUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPayload>
          }
          aggregate: {
            args: Prisma.DomainAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDomain>
          }
          groupBy: {
            args: Prisma.DomainGroupByArgs<ExtArgs>
            result: $Utils.Optional<DomainGroupByOutputType>[]
          }
          count: {
            args: Prisma.DomainCountArgs<ExtArgs>
            result: $Utils.Optional<DomainCountAggregateOutputType> | number
          }
        }
      }
      subDomain: {
        payload: Prisma.$subDomainPayload<ExtArgs>
        fields: Prisma.subDomainFieldRefs
        operations: {
          findUnique: {
            args: Prisma.subDomainFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subDomainPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.subDomainFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subDomainPayload>
          }
          findFirst: {
            args: Prisma.subDomainFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subDomainPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.subDomainFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subDomainPayload>
          }
          findMany: {
            args: Prisma.subDomainFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subDomainPayload>[]
          }
          create: {
            args: Prisma.subDomainCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subDomainPayload>
          }
          createMany: {
            args: Prisma.subDomainCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.subDomainCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subDomainPayload>[]
          }
          delete: {
            args: Prisma.subDomainDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subDomainPayload>
          }
          update: {
            args: Prisma.subDomainUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subDomainPayload>
          }
          deleteMany: {
            args: Prisma.subDomainDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.subDomainUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.subDomainUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subDomainPayload>[]
          }
          upsert: {
            args: Prisma.subDomainUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subDomainPayload>
          }
          aggregate: {
            args: Prisma.SubDomainAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubDomain>
          }
          groupBy: {
            args: Prisma.subDomainGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubDomainGroupByOutputType>[]
          }
          count: {
            args: Prisma.subDomainCountArgs<ExtArgs>
            result: $Utils.Optional<SubDomainCountAggregateOutputType> | number
          }
        }
      }
      Course: {
        payload: Prisma.$CoursePayload<ExtArgs>
        fields: Prisma.CourseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CourseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CourseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          findFirst: {
            args: Prisma.CourseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CourseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          findMany: {
            args: Prisma.CourseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>[]
          }
          create: {
            args: Prisma.CourseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          createMany: {
            args: Prisma.CourseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CourseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>[]
          }
          delete: {
            args: Prisma.CourseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          update: {
            args: Prisma.CourseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          deleteMany: {
            args: Prisma.CourseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CourseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CourseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>[]
          }
          upsert: {
            args: Prisma.CourseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          aggregate: {
            args: Prisma.CourseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCourse>
          }
          groupBy: {
            args: Prisma.CourseGroupByArgs<ExtArgs>
            result: $Utils.Optional<CourseGroupByOutputType>[]
          }
          count: {
            args: Prisma.CourseCountArgs<ExtArgs>
            result: $Utils.Optional<CourseCountAggregateOutputType> | number
          }
        }
      }
      quiz: {
        payload: Prisma.$quizPayload<ExtArgs>
        fields: Prisma.quizFieldRefs
        operations: {
          findUnique: {
            args: Prisma.quizFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$quizPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.quizFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$quizPayload>
          }
          findFirst: {
            args: Prisma.quizFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$quizPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.quizFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$quizPayload>
          }
          findMany: {
            args: Prisma.quizFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$quizPayload>[]
          }
          create: {
            args: Prisma.quizCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$quizPayload>
          }
          createMany: {
            args: Prisma.quizCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.quizCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$quizPayload>[]
          }
          delete: {
            args: Prisma.quizDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$quizPayload>
          }
          update: {
            args: Prisma.quizUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$quizPayload>
          }
          deleteMany: {
            args: Prisma.quizDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.quizUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.quizUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$quizPayload>[]
          }
          upsert: {
            args: Prisma.quizUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$quizPayload>
          }
          aggregate: {
            args: Prisma.QuizAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQuiz>
          }
          groupBy: {
            args: Prisma.quizGroupByArgs<ExtArgs>
            result: $Utils.Optional<QuizGroupByOutputType>[]
          }
          count: {
            args: Prisma.quizCountArgs<ExtArgs>
            result: $Utils.Optional<QuizCountAggregateOutputType> | number
          }
        }
      }
      q_response: {
        payload: Prisma.$q_responsePayload<ExtArgs>
        fields: Prisma.q_responseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.q_responseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$q_responsePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.q_responseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$q_responsePayload>
          }
          findFirst: {
            args: Prisma.q_responseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$q_responsePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.q_responseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$q_responsePayload>
          }
          findMany: {
            args: Prisma.q_responseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$q_responsePayload>[]
          }
          create: {
            args: Prisma.q_responseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$q_responsePayload>
          }
          createMany: {
            args: Prisma.q_responseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.q_responseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$q_responsePayload>[]
          }
          delete: {
            args: Prisma.q_responseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$q_responsePayload>
          }
          update: {
            args: Prisma.q_responseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$q_responsePayload>
          }
          deleteMany: {
            args: Prisma.q_responseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.q_responseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.q_responseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$q_responsePayload>[]
          }
          upsert: {
            args: Prisma.q_responseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$q_responsePayload>
          }
          aggregate: {
            args: Prisma.Q_responseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQ_response>
          }
          groupBy: {
            args: Prisma.q_responseGroupByArgs<ExtArgs>
            result: $Utils.Optional<Q_responseGroupByOutputType>[]
          }
          count: {
            args: Prisma.q_responseCountArgs<ExtArgs>
            result: $Utils.Optional<Q_responseCountAggregateOutputType> | number
          }
        }
      }
      enroll: {
        payload: Prisma.$enrollPayload<ExtArgs>
        fields: Prisma.enrollFieldRefs
        operations: {
          findUnique: {
            args: Prisma.enrollFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$enrollPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.enrollFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$enrollPayload>
          }
          findFirst: {
            args: Prisma.enrollFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$enrollPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.enrollFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$enrollPayload>
          }
          findMany: {
            args: Prisma.enrollFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$enrollPayload>[]
          }
          create: {
            args: Prisma.enrollCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$enrollPayload>
          }
          createMany: {
            args: Prisma.enrollCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.enrollCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$enrollPayload>[]
          }
          delete: {
            args: Prisma.enrollDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$enrollPayload>
          }
          update: {
            args: Prisma.enrollUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$enrollPayload>
          }
          deleteMany: {
            args: Prisma.enrollDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.enrollUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.enrollUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$enrollPayload>[]
          }
          upsert: {
            args: Prisma.enrollUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$enrollPayload>
          }
          aggregate: {
            args: Prisma.EnrollAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEnroll>
          }
          groupBy: {
            args: Prisma.enrollGroupByArgs<ExtArgs>
            result: $Utils.Optional<EnrollGroupByOutputType>[]
          }
          count: {
            args: Prisma.enrollCountArgs<ExtArgs>
            result: $Utils.Optional<EnrollCountAggregateOutputType> | number
          }
        }
      }
      score: {
        payload: Prisma.$scorePayload<ExtArgs>
        fields: Prisma.scoreFieldRefs
        operations: {
          findUnique: {
            args: Prisma.scoreFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$scorePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.scoreFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$scorePayload>
          }
          findFirst: {
            args: Prisma.scoreFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$scorePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.scoreFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$scorePayload>
          }
          findMany: {
            args: Prisma.scoreFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$scorePayload>[]
          }
          create: {
            args: Prisma.scoreCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$scorePayload>
          }
          createMany: {
            args: Prisma.scoreCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.scoreCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$scorePayload>[]
          }
          delete: {
            args: Prisma.scoreDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$scorePayload>
          }
          update: {
            args: Prisma.scoreUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$scorePayload>
          }
          deleteMany: {
            args: Prisma.scoreDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.scoreUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.scoreUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$scorePayload>[]
          }
          upsert: {
            args: Prisma.scoreUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$scorePayload>
          }
          aggregate: {
            args: Prisma.ScoreAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateScore>
          }
          groupBy: {
            args: Prisma.scoreGroupByArgs<ExtArgs>
            result: $Utils.Optional<ScoreGroupByOutputType>[]
          }
          count: {
            args: Prisma.scoreCountArgs<ExtArgs>
            result: $Utils.Optional<ScoreCountAggregateOutputType> | number
          }
        }
      }
      review: {
        payload: Prisma.$reviewPayload<ExtArgs>
        fields: Prisma.reviewFieldRefs
        operations: {
          findUnique: {
            args: Prisma.reviewFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.reviewFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewPayload>
          }
          findFirst: {
            args: Prisma.reviewFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.reviewFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewPayload>
          }
          findMany: {
            args: Prisma.reviewFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewPayload>[]
          }
          create: {
            args: Prisma.reviewCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewPayload>
          }
          createMany: {
            args: Prisma.reviewCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.reviewCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewPayload>[]
          }
          delete: {
            args: Prisma.reviewDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewPayload>
          }
          update: {
            args: Prisma.reviewUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewPayload>
          }
          deleteMany: {
            args: Prisma.reviewDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.reviewUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.reviewUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewPayload>[]
          }
          upsert: {
            args: Prisma.reviewUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewPayload>
          }
          aggregate: {
            args: Prisma.ReviewAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReview>
          }
          groupBy: {
            args: Prisma.reviewGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReviewGroupByOutputType>[]
          }
          count: {
            args: Prisma.reviewCountArgs<ExtArgs>
            result: $Utils.Optional<ReviewCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    student?: StudentOmit
    teacher?: TeacherOmit
    domain?: DomainOmit
    subDomain?: subDomainOmit
    course?: CourseOmit
    quiz?: quizOmit
    q_response?: q_responseOmit
    enroll?: enrollOmit
    score?: scoreOmit
    review?: reviewOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type StudentCountOutputType
   */

  export type StudentCountOutputType = {
    enroll: number
    score: number
    review: number
  }

  export type StudentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    enroll?: boolean | StudentCountOutputTypeCountEnrollArgs
    score?: boolean | StudentCountOutputTypeCountScoreArgs
    review?: boolean | StudentCountOutputTypeCountReviewArgs
  }

  // Custom InputTypes
  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentCountOutputType
     */
    select?: StudentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeCountEnrollArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: enrollWhereInput
  }

  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeCountScoreArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: scoreWhereInput
  }

  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeCountReviewArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: reviewWhereInput
  }


  /**
   * Count Type TeacherCountOutputType
   */

  export type TeacherCountOutputType = {
    courses: number
  }

  export type TeacherCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    courses?: boolean | TeacherCountOutputTypeCountCoursesArgs
  }

  // Custom InputTypes
  /**
   * TeacherCountOutputType without action
   */
  export type TeacherCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeacherCountOutputType
     */
    select?: TeacherCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TeacherCountOutputType without action
   */
  export type TeacherCountOutputTypeCountCoursesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CourseWhereInput
  }


  /**
   * Count Type DomainCountOutputType
   */

  export type DomainCountOutputType = {
    subdomains: number
    enroll: number
  }

  export type DomainCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subdomains?: boolean | DomainCountOutputTypeCountSubdomainsArgs
    enroll?: boolean | DomainCountOutputTypeCountEnrollArgs
  }

  // Custom InputTypes
  /**
   * DomainCountOutputType without action
   */
  export type DomainCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DomainCountOutputType
     */
    select?: DomainCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DomainCountOutputType without action
   */
  export type DomainCountOutputTypeCountSubdomainsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: subDomainWhereInput
  }

  /**
   * DomainCountOutputType without action
   */
  export type DomainCountOutputTypeCountEnrollArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: enrollWhereInput
  }


  /**
   * Count Type SubDomainCountOutputType
   */

  export type SubDomainCountOutputType = {
    courses: number
    score: number
    children: number
  }

  export type SubDomainCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    courses?: boolean | SubDomainCountOutputTypeCountCoursesArgs
    score?: boolean | SubDomainCountOutputTypeCountScoreArgs
    children?: boolean | SubDomainCountOutputTypeCountChildrenArgs
  }

  // Custom InputTypes
  /**
   * SubDomainCountOutputType without action
   */
  export type SubDomainCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubDomainCountOutputType
     */
    select?: SubDomainCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SubDomainCountOutputType without action
   */
  export type SubDomainCountOutputTypeCountCoursesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CourseWhereInput
  }

  /**
   * SubDomainCountOutputType without action
   */
  export type SubDomainCountOutputTypeCountScoreArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: scoreWhereInput
  }

  /**
   * SubDomainCountOutputType without action
   */
  export type SubDomainCountOutputTypeCountChildrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: subDomainWhereInput
  }


  /**
   * Count Type CourseCountOutputType
   */

  export type CourseCountOutputType = {
    quizzes: number
    review: number
  }

  export type CourseCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    quizzes?: boolean | CourseCountOutputTypeCountQuizzesArgs
    review?: boolean | CourseCountOutputTypeCountReviewArgs
  }

  // Custom InputTypes
  /**
   * CourseCountOutputType without action
   */
  export type CourseCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseCountOutputType
     */
    select?: CourseCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CourseCountOutputType without action
   */
  export type CourseCountOutputTypeCountQuizzesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: quizWhereInput
  }

  /**
   * CourseCountOutputType without action
   */
  export type CourseCountOutputTypeCountReviewArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: reviewWhereInput
  }


  /**
   * Count Type QuizCountOutputType
   */

  export type QuizCountOutputType = {
    responses: number
  }

  export type QuizCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    responses?: boolean | QuizCountOutputTypeCountResponsesArgs
  }

  // Custom InputTypes
  /**
   * QuizCountOutputType without action
   */
  export type QuizCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizCountOutputType
     */
    select?: QuizCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * QuizCountOutputType without action
   */
  export type QuizCountOutputTypeCountResponsesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: q_responseWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Student
   */

  export type AggregateStudent = {
    _count: StudentCountAggregateOutputType | null
    _avg: StudentAvgAggregateOutputType | null
    _sum: StudentSumAggregateOutputType | null
    _min: StudentMinAggregateOutputType | null
    _max: StudentMaxAggregateOutputType | null
  }

  export type StudentAvgAggregateOutputType = {
    std_streak: number | null
  }

  export type StudentSumAggregateOutputType = {
    std_streak: number | null
  }

  export type StudentMinAggregateOutputType = {
    std_id: string | null
    std_name: string | null
    std_lastname: string | null
    std_email: string | null
    std_pfp: string | null
    supabaseId: string | null
    std_streak: number | null
    std_last_activeDate: Date | null
    std_level: $Enums.level | null
  }

  export type StudentMaxAggregateOutputType = {
    std_id: string | null
    std_name: string | null
    std_lastname: string | null
    std_email: string | null
    std_pfp: string | null
    supabaseId: string | null
    std_streak: number | null
    std_last_activeDate: Date | null
    std_level: $Enums.level | null
  }

  export type StudentCountAggregateOutputType = {
    std_id: number
    std_name: number
    std_lastname: number
    std_email: number
    std_pfp: number
    supabaseId: number
    std_streak: number
    std_last_activeDate: number
    std_level: number
    _all: number
  }


  export type StudentAvgAggregateInputType = {
    std_streak?: true
  }

  export type StudentSumAggregateInputType = {
    std_streak?: true
  }

  export type StudentMinAggregateInputType = {
    std_id?: true
    std_name?: true
    std_lastname?: true
    std_email?: true
    std_pfp?: true
    supabaseId?: true
    std_streak?: true
    std_last_activeDate?: true
    std_level?: true
  }

  export type StudentMaxAggregateInputType = {
    std_id?: true
    std_name?: true
    std_lastname?: true
    std_email?: true
    std_pfp?: true
    supabaseId?: true
    std_streak?: true
    std_last_activeDate?: true
    std_level?: true
  }

  export type StudentCountAggregateInputType = {
    std_id?: true
    std_name?: true
    std_lastname?: true
    std_email?: true
    std_pfp?: true
    supabaseId?: true
    std_streak?: true
    std_last_activeDate?: true
    std_level?: true
    _all?: true
  }

  export type StudentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Student to aggregate.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Students
    **/
    _count?: true | StudentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StudentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StudentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StudentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StudentMaxAggregateInputType
  }

  export type GetStudentAggregateType<T extends StudentAggregateArgs> = {
        [P in keyof T & keyof AggregateStudent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStudent[P]>
      : GetScalarType<T[P], AggregateStudent[P]>
  }




  export type StudentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentWhereInput
    orderBy?: StudentOrderByWithAggregationInput | StudentOrderByWithAggregationInput[]
    by: StudentScalarFieldEnum[] | StudentScalarFieldEnum
    having?: StudentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StudentCountAggregateInputType | true
    _avg?: StudentAvgAggregateInputType
    _sum?: StudentSumAggregateInputType
    _min?: StudentMinAggregateInputType
    _max?: StudentMaxAggregateInputType
  }

  export type StudentGroupByOutputType = {
    std_id: string
    std_name: string
    std_lastname: string
    std_email: string
    std_pfp: string | null
    supabaseId: string
    std_streak: number
    std_last_activeDate: Date
    std_level: $Enums.level
    _count: StudentCountAggregateOutputType | null
    _avg: StudentAvgAggregateOutputType | null
    _sum: StudentSumAggregateOutputType | null
    _min: StudentMinAggregateOutputType | null
    _max: StudentMaxAggregateOutputType | null
  }

  type GetStudentGroupByPayload<T extends StudentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StudentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StudentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StudentGroupByOutputType[P]>
            : GetScalarType<T[P], StudentGroupByOutputType[P]>
        }
      >
    >


  export type StudentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    std_id?: boolean
    std_name?: boolean
    std_lastname?: boolean
    std_email?: boolean
    std_pfp?: boolean
    supabaseId?: boolean
    std_streak?: boolean
    std_last_activeDate?: boolean
    std_level?: boolean
    enroll?: boolean | Student$enrollArgs<ExtArgs>
    score?: boolean | Student$scoreArgs<ExtArgs>
    review?: boolean | Student$reviewArgs<ExtArgs>
    _count?: boolean | StudentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["student"]>

  export type StudentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    std_id?: boolean
    std_name?: boolean
    std_lastname?: boolean
    std_email?: boolean
    std_pfp?: boolean
    supabaseId?: boolean
    std_streak?: boolean
    std_last_activeDate?: boolean
    std_level?: boolean
  }, ExtArgs["result"]["student"]>

  export type StudentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    std_id?: boolean
    std_name?: boolean
    std_lastname?: boolean
    std_email?: boolean
    std_pfp?: boolean
    supabaseId?: boolean
    std_streak?: boolean
    std_last_activeDate?: boolean
    std_level?: boolean
  }, ExtArgs["result"]["student"]>

  export type StudentSelectScalar = {
    std_id?: boolean
    std_name?: boolean
    std_lastname?: boolean
    std_email?: boolean
    std_pfp?: boolean
    supabaseId?: boolean
    std_streak?: boolean
    std_last_activeDate?: boolean
    std_level?: boolean
  }

  export type StudentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"std_id" | "std_name" | "std_lastname" | "std_email" | "std_pfp" | "supabaseId" | "std_streak" | "std_last_activeDate" | "std_level", ExtArgs["result"]["student"]>
  export type StudentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    enroll?: boolean | Student$enrollArgs<ExtArgs>
    score?: boolean | Student$scoreArgs<ExtArgs>
    review?: boolean | Student$reviewArgs<ExtArgs>
    _count?: boolean | StudentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type StudentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type StudentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $StudentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Student"
    objects: {
      enroll: Prisma.$enrollPayload<ExtArgs>[]
      score: Prisma.$scorePayload<ExtArgs>[]
      review: Prisma.$reviewPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      std_id: string
      std_name: string
      std_lastname: string
      std_email: string
      std_pfp: string | null
      supabaseId: string
      std_streak: number
      std_last_activeDate: Date
      std_level: $Enums.level
    }, ExtArgs["result"]["student"]>
    composites: {}
  }

  type StudentGetPayload<S extends boolean | null | undefined | StudentDefaultArgs> = $Result.GetResult<Prisma.$StudentPayload, S>

  type StudentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StudentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StudentCountAggregateInputType | true
    }

  export interface StudentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Student'], meta: { name: 'Student' } }
    /**
     * Find zero or one Student that matches the filter.
     * @param {StudentFindUniqueArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StudentFindUniqueArgs>(args: SelectSubset<T, StudentFindUniqueArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Student that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StudentFindUniqueOrThrowArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StudentFindUniqueOrThrowArgs>(args: SelectSubset<T, StudentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Student that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindFirstArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StudentFindFirstArgs>(args?: SelectSubset<T, StudentFindFirstArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Student that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindFirstOrThrowArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StudentFindFirstOrThrowArgs>(args?: SelectSubset<T, StudentFindFirstOrThrowArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Students that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Students
     * const students = await prisma.student.findMany()
     * 
     * // Get first 10 Students
     * const students = await prisma.student.findMany({ take: 10 })
     * 
     * // Only select the `std_id`
     * const studentWithStd_idOnly = await prisma.student.findMany({ select: { std_id: true } })
     * 
     */
    findMany<T extends StudentFindManyArgs>(args?: SelectSubset<T, StudentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Student.
     * @param {StudentCreateArgs} args - Arguments to create a Student.
     * @example
     * // Create one Student
     * const Student = await prisma.student.create({
     *   data: {
     *     // ... data to create a Student
     *   }
     * })
     * 
     */
    create<T extends StudentCreateArgs>(args: SelectSubset<T, StudentCreateArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Students.
     * @param {StudentCreateManyArgs} args - Arguments to create many Students.
     * @example
     * // Create many Students
     * const student = await prisma.student.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StudentCreateManyArgs>(args?: SelectSubset<T, StudentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Students and returns the data saved in the database.
     * @param {StudentCreateManyAndReturnArgs} args - Arguments to create many Students.
     * @example
     * // Create many Students
     * const student = await prisma.student.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Students and only return the `std_id`
     * const studentWithStd_idOnly = await prisma.student.createManyAndReturn({
     *   select: { std_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StudentCreateManyAndReturnArgs>(args?: SelectSubset<T, StudentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Student.
     * @param {StudentDeleteArgs} args - Arguments to delete one Student.
     * @example
     * // Delete one Student
     * const Student = await prisma.student.delete({
     *   where: {
     *     // ... filter to delete one Student
     *   }
     * })
     * 
     */
    delete<T extends StudentDeleteArgs>(args: SelectSubset<T, StudentDeleteArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Student.
     * @param {StudentUpdateArgs} args - Arguments to update one Student.
     * @example
     * // Update one Student
     * const student = await prisma.student.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StudentUpdateArgs>(args: SelectSubset<T, StudentUpdateArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Students.
     * @param {StudentDeleteManyArgs} args - Arguments to filter Students to delete.
     * @example
     * // Delete a few Students
     * const { count } = await prisma.student.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StudentDeleteManyArgs>(args?: SelectSubset<T, StudentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Students.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Students
     * const student = await prisma.student.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StudentUpdateManyArgs>(args: SelectSubset<T, StudentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Students and returns the data updated in the database.
     * @param {StudentUpdateManyAndReturnArgs} args - Arguments to update many Students.
     * @example
     * // Update many Students
     * const student = await prisma.student.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Students and only return the `std_id`
     * const studentWithStd_idOnly = await prisma.student.updateManyAndReturn({
     *   select: { std_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StudentUpdateManyAndReturnArgs>(args: SelectSubset<T, StudentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Student.
     * @param {StudentUpsertArgs} args - Arguments to update or create a Student.
     * @example
     * // Update or create a Student
     * const student = await prisma.student.upsert({
     *   create: {
     *     // ... data to create a Student
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Student we want to update
     *   }
     * })
     */
    upsert<T extends StudentUpsertArgs>(args: SelectSubset<T, StudentUpsertArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Students.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentCountArgs} args - Arguments to filter Students to count.
     * @example
     * // Count the number of Students
     * const count = await prisma.student.count({
     *   where: {
     *     // ... the filter for the Students we want to count
     *   }
     * })
    **/
    count<T extends StudentCountArgs>(
      args?: Subset<T, StudentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StudentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Student.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StudentAggregateArgs>(args: Subset<T, StudentAggregateArgs>): Prisma.PrismaPromise<GetStudentAggregateType<T>>

    /**
     * Group by Student.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StudentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StudentGroupByArgs['orderBy'] }
        : { orderBy?: StudentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StudentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStudentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Student model
   */
  readonly fields: StudentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Student.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StudentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    enroll<T extends Student$enrollArgs<ExtArgs> = {}>(args?: Subset<T, Student$enrollArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$enrollPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    score<T extends Student$scoreArgs<ExtArgs> = {}>(args?: Subset<T, Student$scoreArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$scorePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    review<T extends Student$reviewArgs<ExtArgs> = {}>(args?: Subset<T, Student$reviewArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$reviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Student model
   */
  interface StudentFieldRefs {
    readonly std_id: FieldRef<"Student", 'String'>
    readonly std_name: FieldRef<"Student", 'String'>
    readonly std_lastname: FieldRef<"Student", 'String'>
    readonly std_email: FieldRef<"Student", 'String'>
    readonly std_pfp: FieldRef<"Student", 'String'>
    readonly supabaseId: FieldRef<"Student", 'String'>
    readonly std_streak: FieldRef<"Student", 'Int'>
    readonly std_last_activeDate: FieldRef<"Student", 'DateTime'>
    readonly std_level: FieldRef<"Student", 'level'>
  }
    

  // Custom InputTypes
  /**
   * Student findUnique
   */
  export type StudentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student findUniqueOrThrow
   */
  export type StudentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student findFirst
   */
  export type StudentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Students.
     */
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student findFirstOrThrow
   */
  export type StudentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Students.
     */
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student findMany
   */
  export type StudentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Students to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student create
   */
  export type StudentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The data needed to create a Student.
     */
    data: XOR<StudentCreateInput, StudentUncheckedCreateInput>
  }

  /**
   * Student createMany
   */
  export type StudentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Students.
     */
    data: StudentCreateManyInput | StudentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Student createManyAndReturn
   */
  export type StudentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * The data used to create many Students.
     */
    data: StudentCreateManyInput | StudentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Student update
   */
  export type StudentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The data needed to update a Student.
     */
    data: XOR<StudentUpdateInput, StudentUncheckedUpdateInput>
    /**
     * Choose, which Student to update.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student updateMany
   */
  export type StudentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Students.
     */
    data: XOR<StudentUpdateManyMutationInput, StudentUncheckedUpdateManyInput>
    /**
     * Filter which Students to update
     */
    where?: StudentWhereInput
    /**
     * Limit how many Students to update.
     */
    limit?: number
  }

  /**
   * Student updateManyAndReturn
   */
  export type StudentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * The data used to update Students.
     */
    data: XOR<StudentUpdateManyMutationInput, StudentUncheckedUpdateManyInput>
    /**
     * Filter which Students to update
     */
    where?: StudentWhereInput
    /**
     * Limit how many Students to update.
     */
    limit?: number
  }

  /**
   * Student upsert
   */
  export type StudentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The filter to search for the Student to update in case it exists.
     */
    where: StudentWhereUniqueInput
    /**
     * In case the Student found by the `where` argument doesn't exist, create a new Student with this data.
     */
    create: XOR<StudentCreateInput, StudentUncheckedCreateInput>
    /**
     * In case the Student was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StudentUpdateInput, StudentUncheckedUpdateInput>
  }

  /**
   * Student delete
   */
  export type StudentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter which Student to delete.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student deleteMany
   */
  export type StudentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Students to delete
     */
    where?: StudentWhereInput
    /**
     * Limit how many Students to delete.
     */
    limit?: number
  }

  /**
   * Student.enroll
   */
  export type Student$enrollArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the enroll
     */
    select?: enrollSelect<ExtArgs> | null
    /**
     * Omit specific fields from the enroll
     */
    omit?: enrollOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: enrollInclude<ExtArgs> | null
    where?: enrollWhereInput
    orderBy?: enrollOrderByWithRelationInput | enrollOrderByWithRelationInput[]
    cursor?: enrollWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EnrollScalarFieldEnum | EnrollScalarFieldEnum[]
  }

  /**
   * Student.score
   */
  export type Student$scoreArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the score
     */
    select?: scoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the score
     */
    omit?: scoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: scoreInclude<ExtArgs> | null
    where?: scoreWhereInput
    orderBy?: scoreOrderByWithRelationInput | scoreOrderByWithRelationInput[]
    cursor?: scoreWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ScoreScalarFieldEnum | ScoreScalarFieldEnum[]
  }

  /**
   * Student.review
   */
  export type Student$reviewArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the review
     */
    select?: reviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the review
     */
    omit?: reviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewInclude<ExtArgs> | null
    where?: reviewWhereInput
    orderBy?: reviewOrderByWithRelationInput | reviewOrderByWithRelationInput[]
    cursor?: reviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Student without action
   */
  export type StudentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
  }


  /**
   * Model Teacher
   */

  export type AggregateTeacher = {
    _count: TeacherCountAggregateOutputType | null
    _min: TeacherMinAggregateOutputType | null
    _max: TeacherMaxAggregateOutputType | null
  }

  export type TeacherMinAggregateOutputType = {
    tchr_id: string | null
    tchr_name: string | null
    tchr_lastname: string | null
    tchr_email: string | null
    tchr_pfp: string | null
    tchr_password: string | null
  }

  export type TeacherMaxAggregateOutputType = {
    tchr_id: string | null
    tchr_name: string | null
    tchr_lastname: string | null
    tchr_email: string | null
    tchr_pfp: string | null
    tchr_password: string | null
  }

  export type TeacherCountAggregateOutputType = {
    tchr_id: number
    tchr_name: number
    tchr_lastname: number
    tchr_email: number
    tchr_pfp: number
    tchr_password: number
    _all: number
  }


  export type TeacherMinAggregateInputType = {
    tchr_id?: true
    tchr_name?: true
    tchr_lastname?: true
    tchr_email?: true
    tchr_pfp?: true
    tchr_password?: true
  }

  export type TeacherMaxAggregateInputType = {
    tchr_id?: true
    tchr_name?: true
    tchr_lastname?: true
    tchr_email?: true
    tchr_pfp?: true
    tchr_password?: true
  }

  export type TeacherCountAggregateInputType = {
    tchr_id?: true
    tchr_name?: true
    tchr_lastname?: true
    tchr_email?: true
    tchr_pfp?: true
    tchr_password?: true
    _all?: true
  }

  export type TeacherAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Teacher to aggregate.
     */
    where?: TeacherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teachers to fetch.
     */
    orderBy?: TeacherOrderByWithRelationInput | TeacherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TeacherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teachers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teachers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Teachers
    **/
    _count?: true | TeacherCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TeacherMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TeacherMaxAggregateInputType
  }

  export type GetTeacherAggregateType<T extends TeacherAggregateArgs> = {
        [P in keyof T & keyof AggregateTeacher]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTeacher[P]>
      : GetScalarType<T[P], AggregateTeacher[P]>
  }




  export type TeacherGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeacherWhereInput
    orderBy?: TeacherOrderByWithAggregationInput | TeacherOrderByWithAggregationInput[]
    by: TeacherScalarFieldEnum[] | TeacherScalarFieldEnum
    having?: TeacherScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TeacherCountAggregateInputType | true
    _min?: TeacherMinAggregateInputType
    _max?: TeacherMaxAggregateInputType
  }

  export type TeacherGroupByOutputType = {
    tchr_id: string
    tchr_name: string
    tchr_lastname: string
    tchr_email: string
    tchr_pfp: string | null
    tchr_password: string
    _count: TeacherCountAggregateOutputType | null
    _min: TeacherMinAggregateOutputType | null
    _max: TeacherMaxAggregateOutputType | null
  }

  type GetTeacherGroupByPayload<T extends TeacherGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TeacherGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TeacherGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TeacherGroupByOutputType[P]>
            : GetScalarType<T[P], TeacherGroupByOutputType[P]>
        }
      >
    >


  export type TeacherSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    tchr_id?: boolean
    tchr_name?: boolean
    tchr_lastname?: boolean
    tchr_email?: boolean
    tchr_pfp?: boolean
    tchr_password?: boolean
    courses?: boolean | Teacher$coursesArgs<ExtArgs>
    _count?: boolean | TeacherCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["teacher"]>

  export type TeacherSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    tchr_id?: boolean
    tchr_name?: boolean
    tchr_lastname?: boolean
    tchr_email?: boolean
    tchr_pfp?: boolean
    tchr_password?: boolean
  }, ExtArgs["result"]["teacher"]>

  export type TeacherSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    tchr_id?: boolean
    tchr_name?: boolean
    tchr_lastname?: boolean
    tchr_email?: boolean
    tchr_pfp?: boolean
    tchr_password?: boolean
  }, ExtArgs["result"]["teacher"]>

  export type TeacherSelectScalar = {
    tchr_id?: boolean
    tchr_name?: boolean
    tchr_lastname?: boolean
    tchr_email?: boolean
    tchr_pfp?: boolean
    tchr_password?: boolean
  }

  export type TeacherOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"tchr_id" | "tchr_name" | "tchr_lastname" | "tchr_email" | "tchr_pfp" | "tchr_password", ExtArgs["result"]["teacher"]>
  export type TeacherInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    courses?: boolean | Teacher$coursesArgs<ExtArgs>
    _count?: boolean | TeacherCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TeacherIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type TeacherIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TeacherPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Teacher"
    objects: {
      courses: Prisma.$CoursePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      tchr_id: string
      tchr_name: string
      tchr_lastname: string
      tchr_email: string
      tchr_pfp: string | null
      tchr_password: string
    }, ExtArgs["result"]["teacher"]>
    composites: {}
  }

  type TeacherGetPayload<S extends boolean | null | undefined | TeacherDefaultArgs> = $Result.GetResult<Prisma.$TeacherPayload, S>

  type TeacherCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TeacherFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TeacherCountAggregateInputType | true
    }

  export interface TeacherDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Teacher'], meta: { name: 'Teacher' } }
    /**
     * Find zero or one Teacher that matches the filter.
     * @param {TeacherFindUniqueArgs} args - Arguments to find a Teacher
     * @example
     * // Get one Teacher
     * const teacher = await prisma.teacher.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TeacherFindUniqueArgs>(args: SelectSubset<T, TeacherFindUniqueArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Teacher that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TeacherFindUniqueOrThrowArgs} args - Arguments to find a Teacher
     * @example
     * // Get one Teacher
     * const teacher = await prisma.teacher.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TeacherFindUniqueOrThrowArgs>(args: SelectSubset<T, TeacherFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Teacher that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherFindFirstArgs} args - Arguments to find a Teacher
     * @example
     * // Get one Teacher
     * const teacher = await prisma.teacher.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TeacherFindFirstArgs>(args?: SelectSubset<T, TeacherFindFirstArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Teacher that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherFindFirstOrThrowArgs} args - Arguments to find a Teacher
     * @example
     * // Get one Teacher
     * const teacher = await prisma.teacher.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TeacherFindFirstOrThrowArgs>(args?: SelectSubset<T, TeacherFindFirstOrThrowArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Teachers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Teachers
     * const teachers = await prisma.teacher.findMany()
     * 
     * // Get first 10 Teachers
     * const teachers = await prisma.teacher.findMany({ take: 10 })
     * 
     * // Only select the `tchr_id`
     * const teacherWithTchr_idOnly = await prisma.teacher.findMany({ select: { tchr_id: true } })
     * 
     */
    findMany<T extends TeacherFindManyArgs>(args?: SelectSubset<T, TeacherFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Teacher.
     * @param {TeacherCreateArgs} args - Arguments to create a Teacher.
     * @example
     * // Create one Teacher
     * const Teacher = await prisma.teacher.create({
     *   data: {
     *     // ... data to create a Teacher
     *   }
     * })
     * 
     */
    create<T extends TeacherCreateArgs>(args: SelectSubset<T, TeacherCreateArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Teachers.
     * @param {TeacherCreateManyArgs} args - Arguments to create many Teachers.
     * @example
     * // Create many Teachers
     * const teacher = await prisma.teacher.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TeacherCreateManyArgs>(args?: SelectSubset<T, TeacherCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Teachers and returns the data saved in the database.
     * @param {TeacherCreateManyAndReturnArgs} args - Arguments to create many Teachers.
     * @example
     * // Create many Teachers
     * const teacher = await prisma.teacher.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Teachers and only return the `tchr_id`
     * const teacherWithTchr_idOnly = await prisma.teacher.createManyAndReturn({
     *   select: { tchr_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TeacherCreateManyAndReturnArgs>(args?: SelectSubset<T, TeacherCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Teacher.
     * @param {TeacherDeleteArgs} args - Arguments to delete one Teacher.
     * @example
     * // Delete one Teacher
     * const Teacher = await prisma.teacher.delete({
     *   where: {
     *     // ... filter to delete one Teacher
     *   }
     * })
     * 
     */
    delete<T extends TeacherDeleteArgs>(args: SelectSubset<T, TeacherDeleteArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Teacher.
     * @param {TeacherUpdateArgs} args - Arguments to update one Teacher.
     * @example
     * // Update one Teacher
     * const teacher = await prisma.teacher.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TeacherUpdateArgs>(args: SelectSubset<T, TeacherUpdateArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Teachers.
     * @param {TeacherDeleteManyArgs} args - Arguments to filter Teachers to delete.
     * @example
     * // Delete a few Teachers
     * const { count } = await prisma.teacher.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TeacherDeleteManyArgs>(args?: SelectSubset<T, TeacherDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Teachers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Teachers
     * const teacher = await prisma.teacher.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TeacherUpdateManyArgs>(args: SelectSubset<T, TeacherUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Teachers and returns the data updated in the database.
     * @param {TeacherUpdateManyAndReturnArgs} args - Arguments to update many Teachers.
     * @example
     * // Update many Teachers
     * const teacher = await prisma.teacher.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Teachers and only return the `tchr_id`
     * const teacherWithTchr_idOnly = await prisma.teacher.updateManyAndReturn({
     *   select: { tchr_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TeacherUpdateManyAndReturnArgs>(args: SelectSubset<T, TeacherUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Teacher.
     * @param {TeacherUpsertArgs} args - Arguments to update or create a Teacher.
     * @example
     * // Update or create a Teacher
     * const teacher = await prisma.teacher.upsert({
     *   create: {
     *     // ... data to create a Teacher
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Teacher we want to update
     *   }
     * })
     */
    upsert<T extends TeacherUpsertArgs>(args: SelectSubset<T, TeacherUpsertArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Teachers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherCountArgs} args - Arguments to filter Teachers to count.
     * @example
     * // Count the number of Teachers
     * const count = await prisma.teacher.count({
     *   where: {
     *     // ... the filter for the Teachers we want to count
     *   }
     * })
    **/
    count<T extends TeacherCountArgs>(
      args?: Subset<T, TeacherCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TeacherCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Teacher.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TeacherAggregateArgs>(args: Subset<T, TeacherAggregateArgs>): Prisma.PrismaPromise<GetTeacherAggregateType<T>>

    /**
     * Group by Teacher.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TeacherGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TeacherGroupByArgs['orderBy'] }
        : { orderBy?: TeacherGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TeacherGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTeacherGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Teacher model
   */
  readonly fields: TeacherFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Teacher.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TeacherClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    courses<T extends Teacher$coursesArgs<ExtArgs> = {}>(args?: Subset<T, Teacher$coursesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Teacher model
   */
  interface TeacherFieldRefs {
    readonly tchr_id: FieldRef<"Teacher", 'String'>
    readonly tchr_name: FieldRef<"Teacher", 'String'>
    readonly tchr_lastname: FieldRef<"Teacher", 'String'>
    readonly tchr_email: FieldRef<"Teacher", 'String'>
    readonly tchr_pfp: FieldRef<"Teacher", 'String'>
    readonly tchr_password: FieldRef<"Teacher", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Teacher findUnique
   */
  export type TeacherFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * Filter, which Teacher to fetch.
     */
    where: TeacherWhereUniqueInput
  }

  /**
   * Teacher findUniqueOrThrow
   */
  export type TeacherFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * Filter, which Teacher to fetch.
     */
    where: TeacherWhereUniqueInput
  }

  /**
   * Teacher findFirst
   */
  export type TeacherFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * Filter, which Teacher to fetch.
     */
    where?: TeacherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teachers to fetch.
     */
    orderBy?: TeacherOrderByWithRelationInput | TeacherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Teachers.
     */
    cursor?: TeacherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teachers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teachers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Teachers.
     */
    distinct?: TeacherScalarFieldEnum | TeacherScalarFieldEnum[]
  }

  /**
   * Teacher findFirstOrThrow
   */
  export type TeacherFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * Filter, which Teacher to fetch.
     */
    where?: TeacherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teachers to fetch.
     */
    orderBy?: TeacherOrderByWithRelationInput | TeacherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Teachers.
     */
    cursor?: TeacherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teachers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teachers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Teachers.
     */
    distinct?: TeacherScalarFieldEnum | TeacherScalarFieldEnum[]
  }

  /**
   * Teacher findMany
   */
  export type TeacherFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * Filter, which Teachers to fetch.
     */
    where?: TeacherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teachers to fetch.
     */
    orderBy?: TeacherOrderByWithRelationInput | TeacherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Teachers.
     */
    cursor?: TeacherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teachers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teachers.
     */
    skip?: number
    distinct?: TeacherScalarFieldEnum | TeacherScalarFieldEnum[]
  }

  /**
   * Teacher create
   */
  export type TeacherCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * The data needed to create a Teacher.
     */
    data: XOR<TeacherCreateInput, TeacherUncheckedCreateInput>
  }

  /**
   * Teacher createMany
   */
  export type TeacherCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Teachers.
     */
    data: TeacherCreateManyInput | TeacherCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Teacher createManyAndReturn
   */
  export type TeacherCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * The data used to create many Teachers.
     */
    data: TeacherCreateManyInput | TeacherCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Teacher update
   */
  export type TeacherUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * The data needed to update a Teacher.
     */
    data: XOR<TeacherUpdateInput, TeacherUncheckedUpdateInput>
    /**
     * Choose, which Teacher to update.
     */
    where: TeacherWhereUniqueInput
  }

  /**
   * Teacher updateMany
   */
  export type TeacherUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Teachers.
     */
    data: XOR<TeacherUpdateManyMutationInput, TeacherUncheckedUpdateManyInput>
    /**
     * Filter which Teachers to update
     */
    where?: TeacherWhereInput
    /**
     * Limit how many Teachers to update.
     */
    limit?: number
  }

  /**
   * Teacher updateManyAndReturn
   */
  export type TeacherUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * The data used to update Teachers.
     */
    data: XOR<TeacherUpdateManyMutationInput, TeacherUncheckedUpdateManyInput>
    /**
     * Filter which Teachers to update
     */
    where?: TeacherWhereInput
    /**
     * Limit how many Teachers to update.
     */
    limit?: number
  }

  /**
   * Teacher upsert
   */
  export type TeacherUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * The filter to search for the Teacher to update in case it exists.
     */
    where: TeacherWhereUniqueInput
    /**
     * In case the Teacher found by the `where` argument doesn't exist, create a new Teacher with this data.
     */
    create: XOR<TeacherCreateInput, TeacherUncheckedCreateInput>
    /**
     * In case the Teacher was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TeacherUpdateInput, TeacherUncheckedUpdateInput>
  }

  /**
   * Teacher delete
   */
  export type TeacherDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * Filter which Teacher to delete.
     */
    where: TeacherWhereUniqueInput
  }

  /**
   * Teacher deleteMany
   */
  export type TeacherDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Teachers to delete
     */
    where?: TeacherWhereInput
    /**
     * Limit how many Teachers to delete.
     */
    limit?: number
  }

  /**
   * Teacher.courses
   */
  export type Teacher$coursesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    where?: CourseWhereInput
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    cursor?: CourseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Teacher without action
   */
  export type TeacherDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
  }


  /**
   * Model Domain
   */

  export type AggregateDomain = {
    _count: DomainCountAggregateOutputType | null
    _avg: DomainAvgAggregateOutputType | null
    _sum: DomainSumAggregateOutputType | null
    _min: DomainMinAggregateOutputType | null
    _max: DomainMaxAggregateOutputType | null
  }

  export type DomainAvgAggregateOutputType = {
    dmn_duration: number | null
  }

  export type DomainSumAggregateOutputType = {
    dmn_duration: number | null
  }

  export type DomainMinAggregateOutputType = {
    dmn_id: string | null
    dmn_title: string | null
    dmn_dscrptn: string | null
    dmn_duration: number | null
  }

  export type DomainMaxAggregateOutputType = {
    dmn_id: string | null
    dmn_title: string | null
    dmn_dscrptn: string | null
    dmn_duration: number | null
  }

  export type DomainCountAggregateOutputType = {
    dmn_id: number
    dmn_title: number
    dmn_dscrptn: number
    dmn_duration: number
    _all: number
  }


  export type DomainAvgAggregateInputType = {
    dmn_duration?: true
  }

  export type DomainSumAggregateInputType = {
    dmn_duration?: true
  }

  export type DomainMinAggregateInputType = {
    dmn_id?: true
    dmn_title?: true
    dmn_dscrptn?: true
    dmn_duration?: true
  }

  export type DomainMaxAggregateInputType = {
    dmn_id?: true
    dmn_title?: true
    dmn_dscrptn?: true
    dmn_duration?: true
  }

  export type DomainCountAggregateInputType = {
    dmn_id?: true
    dmn_title?: true
    dmn_dscrptn?: true
    dmn_duration?: true
    _all?: true
  }

  export type DomainAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Domain to aggregate.
     */
    where?: DomainWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Domains to fetch.
     */
    orderBy?: DomainOrderByWithRelationInput | DomainOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DomainWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Domains from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Domains.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Domains
    **/
    _count?: true | DomainCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DomainAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DomainSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DomainMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DomainMaxAggregateInputType
  }

  export type GetDomainAggregateType<T extends DomainAggregateArgs> = {
        [P in keyof T & keyof AggregateDomain]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDomain[P]>
      : GetScalarType<T[P], AggregateDomain[P]>
  }




  export type DomainGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DomainWhereInput
    orderBy?: DomainOrderByWithAggregationInput | DomainOrderByWithAggregationInput[]
    by: DomainScalarFieldEnum[] | DomainScalarFieldEnum
    having?: DomainScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DomainCountAggregateInputType | true
    _avg?: DomainAvgAggregateInputType
    _sum?: DomainSumAggregateInputType
    _min?: DomainMinAggregateInputType
    _max?: DomainMaxAggregateInputType
  }

  export type DomainGroupByOutputType = {
    dmn_id: string
    dmn_title: string
    dmn_dscrptn: string
    dmn_duration: number
    _count: DomainCountAggregateOutputType | null
    _avg: DomainAvgAggregateOutputType | null
    _sum: DomainSumAggregateOutputType | null
    _min: DomainMinAggregateOutputType | null
    _max: DomainMaxAggregateOutputType | null
  }

  type GetDomainGroupByPayload<T extends DomainGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DomainGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DomainGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DomainGroupByOutputType[P]>
            : GetScalarType<T[P], DomainGroupByOutputType[P]>
        }
      >
    >


  export type DomainSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    dmn_id?: boolean
    dmn_title?: boolean
    dmn_dscrptn?: boolean
    dmn_duration?: boolean
    subdomains?: boolean | Domain$subdomainsArgs<ExtArgs>
    enroll?: boolean | Domain$enrollArgs<ExtArgs>
    _count?: boolean | DomainCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["domain"]>

  export type DomainSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    dmn_id?: boolean
    dmn_title?: boolean
    dmn_dscrptn?: boolean
    dmn_duration?: boolean
  }, ExtArgs["result"]["domain"]>

  export type DomainSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    dmn_id?: boolean
    dmn_title?: boolean
    dmn_dscrptn?: boolean
    dmn_duration?: boolean
  }, ExtArgs["result"]["domain"]>

  export type DomainSelectScalar = {
    dmn_id?: boolean
    dmn_title?: boolean
    dmn_dscrptn?: boolean
    dmn_duration?: boolean
  }

  export type DomainOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"dmn_id" | "dmn_title" | "dmn_dscrptn" | "dmn_duration", ExtArgs["result"]["domain"]>
  export type DomainInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subdomains?: boolean | Domain$subdomainsArgs<ExtArgs>
    enroll?: boolean | Domain$enrollArgs<ExtArgs>
    _count?: boolean | DomainCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DomainIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type DomainIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $DomainPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Domain"
    objects: {
      subdomains: Prisma.$subDomainPayload<ExtArgs>[]
      enroll: Prisma.$enrollPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      dmn_id: string
      dmn_title: string
      dmn_dscrptn: string
      dmn_duration: number
    }, ExtArgs["result"]["domain"]>
    composites: {}
  }

  type DomainGetPayload<S extends boolean | null | undefined | DomainDefaultArgs> = $Result.GetResult<Prisma.$DomainPayload, S>

  type DomainCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DomainFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DomainCountAggregateInputType | true
    }

  export interface DomainDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Domain'], meta: { name: 'Domain' } }
    /**
     * Find zero or one Domain that matches the filter.
     * @param {DomainFindUniqueArgs} args - Arguments to find a Domain
     * @example
     * // Get one Domain
     * const domain = await prisma.domain.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DomainFindUniqueArgs>(args: SelectSubset<T, DomainFindUniqueArgs<ExtArgs>>): Prisma__DomainClient<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Domain that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DomainFindUniqueOrThrowArgs} args - Arguments to find a Domain
     * @example
     * // Get one Domain
     * const domain = await prisma.domain.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DomainFindUniqueOrThrowArgs>(args: SelectSubset<T, DomainFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DomainClient<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Domain that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DomainFindFirstArgs} args - Arguments to find a Domain
     * @example
     * // Get one Domain
     * const domain = await prisma.domain.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DomainFindFirstArgs>(args?: SelectSubset<T, DomainFindFirstArgs<ExtArgs>>): Prisma__DomainClient<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Domain that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DomainFindFirstOrThrowArgs} args - Arguments to find a Domain
     * @example
     * // Get one Domain
     * const domain = await prisma.domain.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DomainFindFirstOrThrowArgs>(args?: SelectSubset<T, DomainFindFirstOrThrowArgs<ExtArgs>>): Prisma__DomainClient<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Domains that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DomainFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Domains
     * const domains = await prisma.domain.findMany()
     * 
     * // Get first 10 Domains
     * const domains = await prisma.domain.findMany({ take: 10 })
     * 
     * // Only select the `dmn_id`
     * const domainWithDmn_idOnly = await prisma.domain.findMany({ select: { dmn_id: true } })
     * 
     */
    findMany<T extends DomainFindManyArgs>(args?: SelectSubset<T, DomainFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Domain.
     * @param {DomainCreateArgs} args - Arguments to create a Domain.
     * @example
     * // Create one Domain
     * const Domain = await prisma.domain.create({
     *   data: {
     *     // ... data to create a Domain
     *   }
     * })
     * 
     */
    create<T extends DomainCreateArgs>(args: SelectSubset<T, DomainCreateArgs<ExtArgs>>): Prisma__DomainClient<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Domains.
     * @param {DomainCreateManyArgs} args - Arguments to create many Domains.
     * @example
     * // Create many Domains
     * const domain = await prisma.domain.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DomainCreateManyArgs>(args?: SelectSubset<T, DomainCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Domains and returns the data saved in the database.
     * @param {DomainCreateManyAndReturnArgs} args - Arguments to create many Domains.
     * @example
     * // Create many Domains
     * const domain = await prisma.domain.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Domains and only return the `dmn_id`
     * const domainWithDmn_idOnly = await prisma.domain.createManyAndReturn({
     *   select: { dmn_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DomainCreateManyAndReturnArgs>(args?: SelectSubset<T, DomainCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Domain.
     * @param {DomainDeleteArgs} args - Arguments to delete one Domain.
     * @example
     * // Delete one Domain
     * const Domain = await prisma.domain.delete({
     *   where: {
     *     // ... filter to delete one Domain
     *   }
     * })
     * 
     */
    delete<T extends DomainDeleteArgs>(args: SelectSubset<T, DomainDeleteArgs<ExtArgs>>): Prisma__DomainClient<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Domain.
     * @param {DomainUpdateArgs} args - Arguments to update one Domain.
     * @example
     * // Update one Domain
     * const domain = await prisma.domain.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DomainUpdateArgs>(args: SelectSubset<T, DomainUpdateArgs<ExtArgs>>): Prisma__DomainClient<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Domains.
     * @param {DomainDeleteManyArgs} args - Arguments to filter Domains to delete.
     * @example
     * // Delete a few Domains
     * const { count } = await prisma.domain.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DomainDeleteManyArgs>(args?: SelectSubset<T, DomainDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Domains.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DomainUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Domains
     * const domain = await prisma.domain.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DomainUpdateManyArgs>(args: SelectSubset<T, DomainUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Domains and returns the data updated in the database.
     * @param {DomainUpdateManyAndReturnArgs} args - Arguments to update many Domains.
     * @example
     * // Update many Domains
     * const domain = await prisma.domain.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Domains and only return the `dmn_id`
     * const domainWithDmn_idOnly = await prisma.domain.updateManyAndReturn({
     *   select: { dmn_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DomainUpdateManyAndReturnArgs>(args: SelectSubset<T, DomainUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Domain.
     * @param {DomainUpsertArgs} args - Arguments to update or create a Domain.
     * @example
     * // Update or create a Domain
     * const domain = await prisma.domain.upsert({
     *   create: {
     *     // ... data to create a Domain
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Domain we want to update
     *   }
     * })
     */
    upsert<T extends DomainUpsertArgs>(args: SelectSubset<T, DomainUpsertArgs<ExtArgs>>): Prisma__DomainClient<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Domains.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DomainCountArgs} args - Arguments to filter Domains to count.
     * @example
     * // Count the number of Domains
     * const count = await prisma.domain.count({
     *   where: {
     *     // ... the filter for the Domains we want to count
     *   }
     * })
    **/
    count<T extends DomainCountArgs>(
      args?: Subset<T, DomainCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DomainCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Domain.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DomainAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DomainAggregateArgs>(args: Subset<T, DomainAggregateArgs>): Prisma.PrismaPromise<GetDomainAggregateType<T>>

    /**
     * Group by Domain.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DomainGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DomainGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DomainGroupByArgs['orderBy'] }
        : { orderBy?: DomainGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DomainGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDomainGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Domain model
   */
  readonly fields: DomainFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Domain.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DomainClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    subdomains<T extends Domain$subdomainsArgs<ExtArgs> = {}>(args?: Subset<T, Domain$subdomainsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$subDomainPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    enroll<T extends Domain$enrollArgs<ExtArgs> = {}>(args?: Subset<T, Domain$enrollArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$enrollPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Domain model
   */
  interface DomainFieldRefs {
    readonly dmn_id: FieldRef<"Domain", 'String'>
    readonly dmn_title: FieldRef<"Domain", 'String'>
    readonly dmn_dscrptn: FieldRef<"Domain", 'String'>
    readonly dmn_duration: FieldRef<"Domain", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Domain findUnique
   */
  export type DomainFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Domain
     */
    omit?: DomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainInclude<ExtArgs> | null
    /**
     * Filter, which Domain to fetch.
     */
    where: DomainWhereUniqueInput
  }

  /**
   * Domain findUniqueOrThrow
   */
  export type DomainFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Domain
     */
    omit?: DomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainInclude<ExtArgs> | null
    /**
     * Filter, which Domain to fetch.
     */
    where: DomainWhereUniqueInput
  }

  /**
   * Domain findFirst
   */
  export type DomainFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Domain
     */
    omit?: DomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainInclude<ExtArgs> | null
    /**
     * Filter, which Domain to fetch.
     */
    where?: DomainWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Domains to fetch.
     */
    orderBy?: DomainOrderByWithRelationInput | DomainOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Domains.
     */
    cursor?: DomainWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Domains from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Domains.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Domains.
     */
    distinct?: DomainScalarFieldEnum | DomainScalarFieldEnum[]
  }

  /**
   * Domain findFirstOrThrow
   */
  export type DomainFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Domain
     */
    omit?: DomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainInclude<ExtArgs> | null
    /**
     * Filter, which Domain to fetch.
     */
    where?: DomainWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Domains to fetch.
     */
    orderBy?: DomainOrderByWithRelationInput | DomainOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Domains.
     */
    cursor?: DomainWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Domains from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Domains.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Domains.
     */
    distinct?: DomainScalarFieldEnum | DomainScalarFieldEnum[]
  }

  /**
   * Domain findMany
   */
  export type DomainFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Domain
     */
    omit?: DomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainInclude<ExtArgs> | null
    /**
     * Filter, which Domains to fetch.
     */
    where?: DomainWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Domains to fetch.
     */
    orderBy?: DomainOrderByWithRelationInput | DomainOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Domains.
     */
    cursor?: DomainWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Domains from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Domains.
     */
    skip?: number
    distinct?: DomainScalarFieldEnum | DomainScalarFieldEnum[]
  }

  /**
   * Domain create
   */
  export type DomainCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Domain
     */
    omit?: DomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainInclude<ExtArgs> | null
    /**
     * The data needed to create a Domain.
     */
    data: XOR<DomainCreateInput, DomainUncheckedCreateInput>
  }

  /**
   * Domain createMany
   */
  export type DomainCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Domains.
     */
    data: DomainCreateManyInput | DomainCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Domain createManyAndReturn
   */
  export type DomainCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Domain
     */
    omit?: DomainOmit<ExtArgs> | null
    /**
     * The data used to create many Domains.
     */
    data: DomainCreateManyInput | DomainCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Domain update
   */
  export type DomainUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Domain
     */
    omit?: DomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainInclude<ExtArgs> | null
    /**
     * The data needed to update a Domain.
     */
    data: XOR<DomainUpdateInput, DomainUncheckedUpdateInput>
    /**
     * Choose, which Domain to update.
     */
    where: DomainWhereUniqueInput
  }

  /**
   * Domain updateMany
   */
  export type DomainUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Domains.
     */
    data: XOR<DomainUpdateManyMutationInput, DomainUncheckedUpdateManyInput>
    /**
     * Filter which Domains to update
     */
    where?: DomainWhereInput
    /**
     * Limit how many Domains to update.
     */
    limit?: number
  }

  /**
   * Domain updateManyAndReturn
   */
  export type DomainUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Domain
     */
    omit?: DomainOmit<ExtArgs> | null
    /**
     * The data used to update Domains.
     */
    data: XOR<DomainUpdateManyMutationInput, DomainUncheckedUpdateManyInput>
    /**
     * Filter which Domains to update
     */
    where?: DomainWhereInput
    /**
     * Limit how many Domains to update.
     */
    limit?: number
  }

  /**
   * Domain upsert
   */
  export type DomainUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Domain
     */
    omit?: DomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainInclude<ExtArgs> | null
    /**
     * The filter to search for the Domain to update in case it exists.
     */
    where: DomainWhereUniqueInput
    /**
     * In case the Domain found by the `where` argument doesn't exist, create a new Domain with this data.
     */
    create: XOR<DomainCreateInput, DomainUncheckedCreateInput>
    /**
     * In case the Domain was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DomainUpdateInput, DomainUncheckedUpdateInput>
  }

  /**
   * Domain delete
   */
  export type DomainDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Domain
     */
    omit?: DomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainInclude<ExtArgs> | null
    /**
     * Filter which Domain to delete.
     */
    where: DomainWhereUniqueInput
  }

  /**
   * Domain deleteMany
   */
  export type DomainDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Domains to delete
     */
    where?: DomainWhereInput
    /**
     * Limit how many Domains to delete.
     */
    limit?: number
  }

  /**
   * Domain.subdomains
   */
  export type Domain$subdomainsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subDomain
     */
    select?: subDomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subDomain
     */
    omit?: subDomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subDomainInclude<ExtArgs> | null
    where?: subDomainWhereInput
    orderBy?: subDomainOrderByWithRelationInput | subDomainOrderByWithRelationInput[]
    cursor?: subDomainWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubDomainScalarFieldEnum | SubDomainScalarFieldEnum[]
  }

  /**
   * Domain.enroll
   */
  export type Domain$enrollArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the enroll
     */
    select?: enrollSelect<ExtArgs> | null
    /**
     * Omit specific fields from the enroll
     */
    omit?: enrollOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: enrollInclude<ExtArgs> | null
    where?: enrollWhereInput
    orderBy?: enrollOrderByWithRelationInput | enrollOrderByWithRelationInput[]
    cursor?: enrollWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EnrollScalarFieldEnum | EnrollScalarFieldEnum[]
  }

  /**
   * Domain without action
   */
  export type DomainDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Domain
     */
    omit?: DomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainInclude<ExtArgs> | null
  }


  /**
   * Model subDomain
   */

  export type AggregateSubDomain = {
    _count: SubDomainCountAggregateOutputType | null
    _min: SubDomainMinAggregateOutputType | null
    _max: SubDomainMaxAggregateOutputType | null
  }

  export type SubDomainMinAggregateOutputType = {
    subdom_id: string | null
    subdom_title: string | null
    domainId: string | null
    parentId: string | null
  }

  export type SubDomainMaxAggregateOutputType = {
    subdom_id: string | null
    subdom_title: string | null
    domainId: string | null
    parentId: string | null
  }

  export type SubDomainCountAggregateOutputType = {
    subdom_id: number
    subdom_title: number
    domainId: number
    parentId: number
    _all: number
  }


  export type SubDomainMinAggregateInputType = {
    subdom_id?: true
    subdom_title?: true
    domainId?: true
    parentId?: true
  }

  export type SubDomainMaxAggregateInputType = {
    subdom_id?: true
    subdom_title?: true
    domainId?: true
    parentId?: true
  }

  export type SubDomainCountAggregateInputType = {
    subdom_id?: true
    subdom_title?: true
    domainId?: true
    parentId?: true
    _all?: true
  }

  export type SubDomainAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which subDomain to aggregate.
     */
    where?: subDomainWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of subDomains to fetch.
     */
    orderBy?: subDomainOrderByWithRelationInput | subDomainOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: subDomainWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` subDomains from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` subDomains.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned subDomains
    **/
    _count?: true | SubDomainCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubDomainMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubDomainMaxAggregateInputType
  }

  export type GetSubDomainAggregateType<T extends SubDomainAggregateArgs> = {
        [P in keyof T & keyof AggregateSubDomain]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubDomain[P]>
      : GetScalarType<T[P], AggregateSubDomain[P]>
  }




  export type subDomainGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: subDomainWhereInput
    orderBy?: subDomainOrderByWithAggregationInput | subDomainOrderByWithAggregationInput[]
    by: SubDomainScalarFieldEnum[] | SubDomainScalarFieldEnum
    having?: subDomainScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubDomainCountAggregateInputType | true
    _min?: SubDomainMinAggregateInputType
    _max?: SubDomainMaxAggregateInputType
  }

  export type SubDomainGroupByOutputType = {
    subdom_id: string
    subdom_title: string
    domainId: string
    parentId: string | null
    _count: SubDomainCountAggregateOutputType | null
    _min: SubDomainMinAggregateOutputType | null
    _max: SubDomainMaxAggregateOutputType | null
  }

  type GetSubDomainGroupByPayload<T extends subDomainGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubDomainGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubDomainGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubDomainGroupByOutputType[P]>
            : GetScalarType<T[P], SubDomainGroupByOutputType[P]>
        }
      >
    >


  export type subDomainSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    subdom_id?: boolean
    subdom_title?: boolean
    domainId?: boolean
    parentId?: boolean
    courses?: boolean | subDomain$coursesArgs<ExtArgs>
    domain?: boolean | DomainDefaultArgs<ExtArgs>
    score?: boolean | subDomain$scoreArgs<ExtArgs>
    parent?: boolean | subDomain$parentArgs<ExtArgs>
    children?: boolean | subDomain$childrenArgs<ExtArgs>
    _count?: boolean | SubDomainCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subDomain"]>

  export type subDomainSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    subdom_id?: boolean
    subdom_title?: boolean
    domainId?: boolean
    parentId?: boolean
    domain?: boolean | DomainDefaultArgs<ExtArgs>
    parent?: boolean | subDomain$parentArgs<ExtArgs>
  }, ExtArgs["result"]["subDomain"]>

  export type subDomainSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    subdom_id?: boolean
    subdom_title?: boolean
    domainId?: boolean
    parentId?: boolean
    domain?: boolean | DomainDefaultArgs<ExtArgs>
    parent?: boolean | subDomain$parentArgs<ExtArgs>
  }, ExtArgs["result"]["subDomain"]>

  export type subDomainSelectScalar = {
    subdom_id?: boolean
    subdom_title?: boolean
    domainId?: boolean
    parentId?: boolean
  }

  export type subDomainOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"subdom_id" | "subdom_title" | "domainId" | "parentId", ExtArgs["result"]["subDomain"]>
  export type subDomainInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    courses?: boolean | subDomain$coursesArgs<ExtArgs>
    domain?: boolean | DomainDefaultArgs<ExtArgs>
    score?: boolean | subDomain$scoreArgs<ExtArgs>
    parent?: boolean | subDomain$parentArgs<ExtArgs>
    children?: boolean | subDomain$childrenArgs<ExtArgs>
    _count?: boolean | SubDomainCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type subDomainIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    domain?: boolean | DomainDefaultArgs<ExtArgs>
    parent?: boolean | subDomain$parentArgs<ExtArgs>
  }
  export type subDomainIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    domain?: boolean | DomainDefaultArgs<ExtArgs>
    parent?: boolean | subDomain$parentArgs<ExtArgs>
  }

  export type $subDomainPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "subDomain"
    objects: {
      courses: Prisma.$CoursePayload<ExtArgs>[]
      domain: Prisma.$DomainPayload<ExtArgs>
      score: Prisma.$scorePayload<ExtArgs>[]
      parent: Prisma.$subDomainPayload<ExtArgs> | null
      children: Prisma.$subDomainPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      subdom_id: string
      subdom_title: string
      domainId: string
      parentId: string | null
    }, ExtArgs["result"]["subDomain"]>
    composites: {}
  }

  type subDomainGetPayload<S extends boolean | null | undefined | subDomainDefaultArgs> = $Result.GetResult<Prisma.$subDomainPayload, S>

  type subDomainCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<subDomainFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubDomainCountAggregateInputType | true
    }

  export interface subDomainDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['subDomain'], meta: { name: 'subDomain' } }
    /**
     * Find zero or one SubDomain that matches the filter.
     * @param {subDomainFindUniqueArgs} args - Arguments to find a SubDomain
     * @example
     * // Get one SubDomain
     * const subDomain = await prisma.subDomain.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends subDomainFindUniqueArgs>(args: SelectSubset<T, subDomainFindUniqueArgs<ExtArgs>>): Prisma__subDomainClient<$Result.GetResult<Prisma.$subDomainPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SubDomain that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {subDomainFindUniqueOrThrowArgs} args - Arguments to find a SubDomain
     * @example
     * // Get one SubDomain
     * const subDomain = await prisma.subDomain.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends subDomainFindUniqueOrThrowArgs>(args: SelectSubset<T, subDomainFindUniqueOrThrowArgs<ExtArgs>>): Prisma__subDomainClient<$Result.GetResult<Prisma.$subDomainPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SubDomain that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {subDomainFindFirstArgs} args - Arguments to find a SubDomain
     * @example
     * // Get one SubDomain
     * const subDomain = await prisma.subDomain.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends subDomainFindFirstArgs>(args?: SelectSubset<T, subDomainFindFirstArgs<ExtArgs>>): Prisma__subDomainClient<$Result.GetResult<Prisma.$subDomainPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SubDomain that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {subDomainFindFirstOrThrowArgs} args - Arguments to find a SubDomain
     * @example
     * // Get one SubDomain
     * const subDomain = await prisma.subDomain.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends subDomainFindFirstOrThrowArgs>(args?: SelectSubset<T, subDomainFindFirstOrThrowArgs<ExtArgs>>): Prisma__subDomainClient<$Result.GetResult<Prisma.$subDomainPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SubDomains that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {subDomainFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SubDomains
     * const subDomains = await prisma.subDomain.findMany()
     * 
     * // Get first 10 SubDomains
     * const subDomains = await prisma.subDomain.findMany({ take: 10 })
     * 
     * // Only select the `subdom_id`
     * const subDomainWithSubdom_idOnly = await prisma.subDomain.findMany({ select: { subdom_id: true } })
     * 
     */
    findMany<T extends subDomainFindManyArgs>(args?: SelectSubset<T, subDomainFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$subDomainPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SubDomain.
     * @param {subDomainCreateArgs} args - Arguments to create a SubDomain.
     * @example
     * // Create one SubDomain
     * const SubDomain = await prisma.subDomain.create({
     *   data: {
     *     // ... data to create a SubDomain
     *   }
     * })
     * 
     */
    create<T extends subDomainCreateArgs>(args: SelectSubset<T, subDomainCreateArgs<ExtArgs>>): Prisma__subDomainClient<$Result.GetResult<Prisma.$subDomainPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SubDomains.
     * @param {subDomainCreateManyArgs} args - Arguments to create many SubDomains.
     * @example
     * // Create many SubDomains
     * const subDomain = await prisma.subDomain.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends subDomainCreateManyArgs>(args?: SelectSubset<T, subDomainCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SubDomains and returns the data saved in the database.
     * @param {subDomainCreateManyAndReturnArgs} args - Arguments to create many SubDomains.
     * @example
     * // Create many SubDomains
     * const subDomain = await prisma.subDomain.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SubDomains and only return the `subdom_id`
     * const subDomainWithSubdom_idOnly = await prisma.subDomain.createManyAndReturn({
     *   select: { subdom_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends subDomainCreateManyAndReturnArgs>(args?: SelectSubset<T, subDomainCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$subDomainPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SubDomain.
     * @param {subDomainDeleteArgs} args - Arguments to delete one SubDomain.
     * @example
     * // Delete one SubDomain
     * const SubDomain = await prisma.subDomain.delete({
     *   where: {
     *     // ... filter to delete one SubDomain
     *   }
     * })
     * 
     */
    delete<T extends subDomainDeleteArgs>(args: SelectSubset<T, subDomainDeleteArgs<ExtArgs>>): Prisma__subDomainClient<$Result.GetResult<Prisma.$subDomainPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SubDomain.
     * @param {subDomainUpdateArgs} args - Arguments to update one SubDomain.
     * @example
     * // Update one SubDomain
     * const subDomain = await prisma.subDomain.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends subDomainUpdateArgs>(args: SelectSubset<T, subDomainUpdateArgs<ExtArgs>>): Prisma__subDomainClient<$Result.GetResult<Prisma.$subDomainPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SubDomains.
     * @param {subDomainDeleteManyArgs} args - Arguments to filter SubDomains to delete.
     * @example
     * // Delete a few SubDomains
     * const { count } = await prisma.subDomain.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends subDomainDeleteManyArgs>(args?: SelectSubset<T, subDomainDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SubDomains.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {subDomainUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SubDomains
     * const subDomain = await prisma.subDomain.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends subDomainUpdateManyArgs>(args: SelectSubset<T, subDomainUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SubDomains and returns the data updated in the database.
     * @param {subDomainUpdateManyAndReturnArgs} args - Arguments to update many SubDomains.
     * @example
     * // Update many SubDomains
     * const subDomain = await prisma.subDomain.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SubDomains and only return the `subdom_id`
     * const subDomainWithSubdom_idOnly = await prisma.subDomain.updateManyAndReturn({
     *   select: { subdom_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends subDomainUpdateManyAndReturnArgs>(args: SelectSubset<T, subDomainUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$subDomainPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SubDomain.
     * @param {subDomainUpsertArgs} args - Arguments to update or create a SubDomain.
     * @example
     * // Update or create a SubDomain
     * const subDomain = await prisma.subDomain.upsert({
     *   create: {
     *     // ... data to create a SubDomain
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SubDomain we want to update
     *   }
     * })
     */
    upsert<T extends subDomainUpsertArgs>(args: SelectSubset<T, subDomainUpsertArgs<ExtArgs>>): Prisma__subDomainClient<$Result.GetResult<Prisma.$subDomainPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SubDomains.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {subDomainCountArgs} args - Arguments to filter SubDomains to count.
     * @example
     * // Count the number of SubDomains
     * const count = await prisma.subDomain.count({
     *   where: {
     *     // ... the filter for the SubDomains we want to count
     *   }
     * })
    **/
    count<T extends subDomainCountArgs>(
      args?: Subset<T, subDomainCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubDomainCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SubDomain.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubDomainAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SubDomainAggregateArgs>(args: Subset<T, SubDomainAggregateArgs>): Prisma.PrismaPromise<GetSubDomainAggregateType<T>>

    /**
     * Group by SubDomain.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {subDomainGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends subDomainGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: subDomainGroupByArgs['orderBy'] }
        : { orderBy?: subDomainGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, subDomainGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubDomainGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the subDomain model
   */
  readonly fields: subDomainFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for subDomain.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__subDomainClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    courses<T extends subDomain$coursesArgs<ExtArgs> = {}>(args?: Subset<T, subDomain$coursesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    domain<T extends DomainDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DomainDefaultArgs<ExtArgs>>): Prisma__DomainClient<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    score<T extends subDomain$scoreArgs<ExtArgs> = {}>(args?: Subset<T, subDomain$scoreArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$scorePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    parent<T extends subDomain$parentArgs<ExtArgs> = {}>(args?: Subset<T, subDomain$parentArgs<ExtArgs>>): Prisma__subDomainClient<$Result.GetResult<Prisma.$subDomainPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    children<T extends subDomain$childrenArgs<ExtArgs> = {}>(args?: Subset<T, subDomain$childrenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$subDomainPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the subDomain model
   */
  interface subDomainFieldRefs {
    readonly subdom_id: FieldRef<"subDomain", 'String'>
    readonly subdom_title: FieldRef<"subDomain", 'String'>
    readonly domainId: FieldRef<"subDomain", 'String'>
    readonly parentId: FieldRef<"subDomain", 'String'>
  }
    

  // Custom InputTypes
  /**
   * subDomain findUnique
   */
  export type subDomainFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subDomain
     */
    select?: subDomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subDomain
     */
    omit?: subDomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subDomainInclude<ExtArgs> | null
    /**
     * Filter, which subDomain to fetch.
     */
    where: subDomainWhereUniqueInput
  }

  /**
   * subDomain findUniqueOrThrow
   */
  export type subDomainFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subDomain
     */
    select?: subDomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subDomain
     */
    omit?: subDomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subDomainInclude<ExtArgs> | null
    /**
     * Filter, which subDomain to fetch.
     */
    where: subDomainWhereUniqueInput
  }

  /**
   * subDomain findFirst
   */
  export type subDomainFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subDomain
     */
    select?: subDomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subDomain
     */
    omit?: subDomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subDomainInclude<ExtArgs> | null
    /**
     * Filter, which subDomain to fetch.
     */
    where?: subDomainWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of subDomains to fetch.
     */
    orderBy?: subDomainOrderByWithRelationInput | subDomainOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for subDomains.
     */
    cursor?: subDomainWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` subDomains from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` subDomains.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of subDomains.
     */
    distinct?: SubDomainScalarFieldEnum | SubDomainScalarFieldEnum[]
  }

  /**
   * subDomain findFirstOrThrow
   */
  export type subDomainFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subDomain
     */
    select?: subDomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subDomain
     */
    omit?: subDomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subDomainInclude<ExtArgs> | null
    /**
     * Filter, which subDomain to fetch.
     */
    where?: subDomainWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of subDomains to fetch.
     */
    orderBy?: subDomainOrderByWithRelationInput | subDomainOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for subDomains.
     */
    cursor?: subDomainWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` subDomains from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` subDomains.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of subDomains.
     */
    distinct?: SubDomainScalarFieldEnum | SubDomainScalarFieldEnum[]
  }

  /**
   * subDomain findMany
   */
  export type subDomainFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subDomain
     */
    select?: subDomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subDomain
     */
    omit?: subDomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subDomainInclude<ExtArgs> | null
    /**
     * Filter, which subDomains to fetch.
     */
    where?: subDomainWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of subDomains to fetch.
     */
    orderBy?: subDomainOrderByWithRelationInput | subDomainOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing subDomains.
     */
    cursor?: subDomainWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` subDomains from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` subDomains.
     */
    skip?: number
    distinct?: SubDomainScalarFieldEnum | SubDomainScalarFieldEnum[]
  }

  /**
   * subDomain create
   */
  export type subDomainCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subDomain
     */
    select?: subDomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subDomain
     */
    omit?: subDomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subDomainInclude<ExtArgs> | null
    /**
     * The data needed to create a subDomain.
     */
    data: XOR<subDomainCreateInput, subDomainUncheckedCreateInput>
  }

  /**
   * subDomain createMany
   */
  export type subDomainCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many subDomains.
     */
    data: subDomainCreateManyInput | subDomainCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * subDomain createManyAndReturn
   */
  export type subDomainCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subDomain
     */
    select?: subDomainSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the subDomain
     */
    omit?: subDomainOmit<ExtArgs> | null
    /**
     * The data used to create many subDomains.
     */
    data: subDomainCreateManyInput | subDomainCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subDomainIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * subDomain update
   */
  export type subDomainUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subDomain
     */
    select?: subDomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subDomain
     */
    omit?: subDomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subDomainInclude<ExtArgs> | null
    /**
     * The data needed to update a subDomain.
     */
    data: XOR<subDomainUpdateInput, subDomainUncheckedUpdateInput>
    /**
     * Choose, which subDomain to update.
     */
    where: subDomainWhereUniqueInput
  }

  /**
   * subDomain updateMany
   */
  export type subDomainUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update subDomains.
     */
    data: XOR<subDomainUpdateManyMutationInput, subDomainUncheckedUpdateManyInput>
    /**
     * Filter which subDomains to update
     */
    where?: subDomainWhereInput
    /**
     * Limit how many subDomains to update.
     */
    limit?: number
  }

  /**
   * subDomain updateManyAndReturn
   */
  export type subDomainUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subDomain
     */
    select?: subDomainSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the subDomain
     */
    omit?: subDomainOmit<ExtArgs> | null
    /**
     * The data used to update subDomains.
     */
    data: XOR<subDomainUpdateManyMutationInput, subDomainUncheckedUpdateManyInput>
    /**
     * Filter which subDomains to update
     */
    where?: subDomainWhereInput
    /**
     * Limit how many subDomains to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subDomainIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * subDomain upsert
   */
  export type subDomainUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subDomain
     */
    select?: subDomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subDomain
     */
    omit?: subDomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subDomainInclude<ExtArgs> | null
    /**
     * The filter to search for the subDomain to update in case it exists.
     */
    where: subDomainWhereUniqueInput
    /**
     * In case the subDomain found by the `where` argument doesn't exist, create a new subDomain with this data.
     */
    create: XOR<subDomainCreateInput, subDomainUncheckedCreateInput>
    /**
     * In case the subDomain was found with the provided `where` argument, update it with this data.
     */
    update: XOR<subDomainUpdateInput, subDomainUncheckedUpdateInput>
  }

  /**
   * subDomain delete
   */
  export type subDomainDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subDomain
     */
    select?: subDomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subDomain
     */
    omit?: subDomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subDomainInclude<ExtArgs> | null
    /**
     * Filter which subDomain to delete.
     */
    where: subDomainWhereUniqueInput
  }

  /**
   * subDomain deleteMany
   */
  export type subDomainDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which subDomains to delete
     */
    where?: subDomainWhereInput
    /**
     * Limit how many subDomains to delete.
     */
    limit?: number
  }

  /**
   * subDomain.courses
   */
  export type subDomain$coursesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    where?: CourseWhereInput
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    cursor?: CourseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * subDomain.score
   */
  export type subDomain$scoreArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the score
     */
    select?: scoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the score
     */
    omit?: scoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: scoreInclude<ExtArgs> | null
    where?: scoreWhereInput
    orderBy?: scoreOrderByWithRelationInput | scoreOrderByWithRelationInput[]
    cursor?: scoreWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ScoreScalarFieldEnum | ScoreScalarFieldEnum[]
  }

  /**
   * subDomain.parent
   */
  export type subDomain$parentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subDomain
     */
    select?: subDomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subDomain
     */
    omit?: subDomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subDomainInclude<ExtArgs> | null
    where?: subDomainWhereInput
  }

  /**
   * subDomain.children
   */
  export type subDomain$childrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subDomain
     */
    select?: subDomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subDomain
     */
    omit?: subDomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subDomainInclude<ExtArgs> | null
    where?: subDomainWhereInput
    orderBy?: subDomainOrderByWithRelationInput | subDomainOrderByWithRelationInput[]
    cursor?: subDomainWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubDomainScalarFieldEnum | SubDomainScalarFieldEnum[]
  }

  /**
   * subDomain without action
   */
  export type subDomainDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subDomain
     */
    select?: subDomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subDomain
     */
    omit?: subDomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subDomainInclude<ExtArgs> | null
  }


  /**
   * Model Course
   */

  export type AggregateCourse = {
    _count: CourseCountAggregateOutputType | null
    _min: CourseMinAggregateOutputType | null
    _max: CourseMaxAggregateOutputType | null
  }

  export type CourseMinAggregateOutputType = {
    crs_id: string | null
    crs_title: string | null
    crs_type: $Enums.crs_type | null
    vd_link: string | null
    pdf_file: string | null
    article_content: string | null
    subdom: string | null
    teacherId: string | null
  }

  export type CourseMaxAggregateOutputType = {
    crs_id: string | null
    crs_title: string | null
    crs_type: $Enums.crs_type | null
    vd_link: string | null
    pdf_file: string | null
    article_content: string | null
    subdom: string | null
    teacherId: string | null
  }

  export type CourseCountAggregateOutputType = {
    crs_id: number
    crs_title: number
    crs_type: number
    vd_link: number
    pdf_file: number
    article_content: number
    subdom: number
    teacherId: number
    _all: number
  }


  export type CourseMinAggregateInputType = {
    crs_id?: true
    crs_title?: true
    crs_type?: true
    vd_link?: true
    pdf_file?: true
    article_content?: true
    subdom?: true
    teacherId?: true
  }

  export type CourseMaxAggregateInputType = {
    crs_id?: true
    crs_title?: true
    crs_type?: true
    vd_link?: true
    pdf_file?: true
    article_content?: true
    subdom?: true
    teacherId?: true
  }

  export type CourseCountAggregateInputType = {
    crs_id?: true
    crs_title?: true
    crs_type?: true
    vd_link?: true
    pdf_file?: true
    article_content?: true
    subdom?: true
    teacherId?: true
    _all?: true
  }

  export type CourseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Course to aggregate.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Courses
    **/
    _count?: true | CourseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CourseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CourseMaxAggregateInputType
  }

  export type GetCourseAggregateType<T extends CourseAggregateArgs> = {
        [P in keyof T & keyof AggregateCourse]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCourse[P]>
      : GetScalarType<T[P], AggregateCourse[P]>
  }




  export type CourseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CourseWhereInput
    orderBy?: CourseOrderByWithAggregationInput | CourseOrderByWithAggregationInput[]
    by: CourseScalarFieldEnum[] | CourseScalarFieldEnum
    having?: CourseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CourseCountAggregateInputType | true
    _min?: CourseMinAggregateInputType
    _max?: CourseMaxAggregateInputType
  }

  export type CourseGroupByOutputType = {
    crs_id: string
    crs_title: string
    crs_type: $Enums.crs_type
    vd_link: string | null
    pdf_file: string | null
    article_content: string | null
    subdom: string
    teacherId: string
    _count: CourseCountAggregateOutputType | null
    _min: CourseMinAggregateOutputType | null
    _max: CourseMaxAggregateOutputType | null
  }

  type GetCourseGroupByPayload<T extends CourseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CourseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CourseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CourseGroupByOutputType[P]>
            : GetScalarType<T[P], CourseGroupByOutputType[P]>
        }
      >
    >


  export type CourseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    crs_id?: boolean
    crs_title?: boolean
    crs_type?: boolean
    vd_link?: boolean
    pdf_file?: boolean
    article_content?: boolean
    subdom?: boolean
    teacherId?: boolean
    quizzes?: boolean | Course$quizzesArgs<ExtArgs>
    subdomain?: boolean | subDomainDefaultArgs<ExtArgs>
    teacher?: boolean | TeacherDefaultArgs<ExtArgs>
    review?: boolean | Course$reviewArgs<ExtArgs>
    _count?: boolean | CourseCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["course"]>

  export type CourseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    crs_id?: boolean
    crs_title?: boolean
    crs_type?: boolean
    vd_link?: boolean
    pdf_file?: boolean
    article_content?: boolean
    subdom?: boolean
    teacherId?: boolean
    subdomain?: boolean | subDomainDefaultArgs<ExtArgs>
    teacher?: boolean | TeacherDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["course"]>

  export type CourseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    crs_id?: boolean
    crs_title?: boolean
    crs_type?: boolean
    vd_link?: boolean
    pdf_file?: boolean
    article_content?: boolean
    subdom?: boolean
    teacherId?: boolean
    subdomain?: boolean | subDomainDefaultArgs<ExtArgs>
    teacher?: boolean | TeacherDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["course"]>

  export type CourseSelectScalar = {
    crs_id?: boolean
    crs_title?: boolean
    crs_type?: boolean
    vd_link?: boolean
    pdf_file?: boolean
    article_content?: boolean
    subdom?: boolean
    teacherId?: boolean
  }

  export type CourseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"crs_id" | "crs_title" | "crs_type" | "vd_link" | "pdf_file" | "article_content" | "subdom" | "teacherId", ExtArgs["result"]["course"]>
  export type CourseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    quizzes?: boolean | Course$quizzesArgs<ExtArgs>
    subdomain?: boolean | subDomainDefaultArgs<ExtArgs>
    teacher?: boolean | TeacherDefaultArgs<ExtArgs>
    review?: boolean | Course$reviewArgs<ExtArgs>
    _count?: boolean | CourseCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CourseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subdomain?: boolean | subDomainDefaultArgs<ExtArgs>
    teacher?: boolean | TeacherDefaultArgs<ExtArgs>
  }
  export type CourseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subdomain?: boolean | subDomainDefaultArgs<ExtArgs>
    teacher?: boolean | TeacherDefaultArgs<ExtArgs>
  }

  export type $CoursePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Course"
    objects: {
      quizzes: Prisma.$quizPayload<ExtArgs>[]
      subdomain: Prisma.$subDomainPayload<ExtArgs>
      teacher: Prisma.$TeacherPayload<ExtArgs>
      review: Prisma.$reviewPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      crs_id: string
      crs_title: string
      crs_type: $Enums.crs_type
      vd_link: string | null
      pdf_file: string | null
      article_content: string | null
      subdom: string
      teacherId: string
    }, ExtArgs["result"]["course"]>
    composites: {}
  }

  type CourseGetPayload<S extends boolean | null | undefined | CourseDefaultArgs> = $Result.GetResult<Prisma.$CoursePayload, S>

  type CourseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CourseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CourseCountAggregateInputType | true
    }

  export interface CourseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Course'], meta: { name: 'Course' } }
    /**
     * Find zero or one Course that matches the filter.
     * @param {CourseFindUniqueArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CourseFindUniqueArgs>(args: SelectSubset<T, CourseFindUniqueArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Course that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CourseFindUniqueOrThrowArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CourseFindUniqueOrThrowArgs>(args: SelectSubset<T, CourseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Course that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindFirstArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CourseFindFirstArgs>(args?: SelectSubset<T, CourseFindFirstArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Course that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindFirstOrThrowArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CourseFindFirstOrThrowArgs>(args?: SelectSubset<T, CourseFindFirstOrThrowArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Courses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Courses
     * const courses = await prisma.course.findMany()
     * 
     * // Get first 10 Courses
     * const courses = await prisma.course.findMany({ take: 10 })
     * 
     * // Only select the `crs_id`
     * const courseWithCrs_idOnly = await prisma.course.findMany({ select: { crs_id: true } })
     * 
     */
    findMany<T extends CourseFindManyArgs>(args?: SelectSubset<T, CourseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Course.
     * @param {CourseCreateArgs} args - Arguments to create a Course.
     * @example
     * // Create one Course
     * const Course = await prisma.course.create({
     *   data: {
     *     // ... data to create a Course
     *   }
     * })
     * 
     */
    create<T extends CourseCreateArgs>(args: SelectSubset<T, CourseCreateArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Courses.
     * @param {CourseCreateManyArgs} args - Arguments to create many Courses.
     * @example
     * // Create many Courses
     * const course = await prisma.course.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CourseCreateManyArgs>(args?: SelectSubset<T, CourseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Courses and returns the data saved in the database.
     * @param {CourseCreateManyAndReturnArgs} args - Arguments to create many Courses.
     * @example
     * // Create many Courses
     * const course = await prisma.course.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Courses and only return the `crs_id`
     * const courseWithCrs_idOnly = await prisma.course.createManyAndReturn({
     *   select: { crs_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CourseCreateManyAndReturnArgs>(args?: SelectSubset<T, CourseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Course.
     * @param {CourseDeleteArgs} args - Arguments to delete one Course.
     * @example
     * // Delete one Course
     * const Course = await prisma.course.delete({
     *   where: {
     *     // ... filter to delete one Course
     *   }
     * })
     * 
     */
    delete<T extends CourseDeleteArgs>(args: SelectSubset<T, CourseDeleteArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Course.
     * @param {CourseUpdateArgs} args - Arguments to update one Course.
     * @example
     * // Update one Course
     * const course = await prisma.course.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CourseUpdateArgs>(args: SelectSubset<T, CourseUpdateArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Courses.
     * @param {CourseDeleteManyArgs} args - Arguments to filter Courses to delete.
     * @example
     * // Delete a few Courses
     * const { count } = await prisma.course.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CourseDeleteManyArgs>(args?: SelectSubset<T, CourseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Courses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Courses
     * const course = await prisma.course.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CourseUpdateManyArgs>(args: SelectSubset<T, CourseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Courses and returns the data updated in the database.
     * @param {CourseUpdateManyAndReturnArgs} args - Arguments to update many Courses.
     * @example
     * // Update many Courses
     * const course = await prisma.course.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Courses and only return the `crs_id`
     * const courseWithCrs_idOnly = await prisma.course.updateManyAndReturn({
     *   select: { crs_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CourseUpdateManyAndReturnArgs>(args: SelectSubset<T, CourseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Course.
     * @param {CourseUpsertArgs} args - Arguments to update or create a Course.
     * @example
     * // Update or create a Course
     * const course = await prisma.course.upsert({
     *   create: {
     *     // ... data to create a Course
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Course we want to update
     *   }
     * })
     */
    upsert<T extends CourseUpsertArgs>(args: SelectSubset<T, CourseUpsertArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Courses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseCountArgs} args - Arguments to filter Courses to count.
     * @example
     * // Count the number of Courses
     * const count = await prisma.course.count({
     *   where: {
     *     // ... the filter for the Courses we want to count
     *   }
     * })
    **/
    count<T extends CourseCountArgs>(
      args?: Subset<T, CourseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CourseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Course.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CourseAggregateArgs>(args: Subset<T, CourseAggregateArgs>): Prisma.PrismaPromise<GetCourseAggregateType<T>>

    /**
     * Group by Course.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CourseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CourseGroupByArgs['orderBy'] }
        : { orderBy?: CourseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CourseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCourseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Course model
   */
  readonly fields: CourseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Course.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CourseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    quizzes<T extends Course$quizzesArgs<ExtArgs> = {}>(args?: Subset<T, Course$quizzesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$quizPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    subdomain<T extends subDomainDefaultArgs<ExtArgs> = {}>(args?: Subset<T, subDomainDefaultArgs<ExtArgs>>): Prisma__subDomainClient<$Result.GetResult<Prisma.$subDomainPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    teacher<T extends TeacherDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TeacherDefaultArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    review<T extends Course$reviewArgs<ExtArgs> = {}>(args?: Subset<T, Course$reviewArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$reviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Course model
   */
  interface CourseFieldRefs {
    readonly crs_id: FieldRef<"Course", 'String'>
    readonly crs_title: FieldRef<"Course", 'String'>
    readonly crs_type: FieldRef<"Course", 'crs_type'>
    readonly vd_link: FieldRef<"Course", 'String'>
    readonly pdf_file: FieldRef<"Course", 'String'>
    readonly article_content: FieldRef<"Course", 'String'>
    readonly subdom: FieldRef<"Course", 'String'>
    readonly teacherId: FieldRef<"Course", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Course findUnique
   */
  export type CourseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course findUniqueOrThrow
   */
  export type CourseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course findFirst
   */
  export type CourseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Courses.
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Courses.
     */
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Course findFirstOrThrow
   */
  export type CourseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Courses.
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Courses.
     */
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Course findMany
   */
  export type CourseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Courses to fetch.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Courses.
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Course create
   */
  export type CourseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * The data needed to create a Course.
     */
    data: XOR<CourseCreateInput, CourseUncheckedCreateInput>
  }

  /**
   * Course createMany
   */
  export type CourseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Courses.
     */
    data: CourseCreateManyInput | CourseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Course createManyAndReturn
   */
  export type CourseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * The data used to create many Courses.
     */
    data: CourseCreateManyInput | CourseCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Course update
   */
  export type CourseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * The data needed to update a Course.
     */
    data: XOR<CourseUpdateInput, CourseUncheckedUpdateInput>
    /**
     * Choose, which Course to update.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course updateMany
   */
  export type CourseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Courses.
     */
    data: XOR<CourseUpdateManyMutationInput, CourseUncheckedUpdateManyInput>
    /**
     * Filter which Courses to update
     */
    where?: CourseWhereInput
    /**
     * Limit how many Courses to update.
     */
    limit?: number
  }

  /**
   * Course updateManyAndReturn
   */
  export type CourseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * The data used to update Courses.
     */
    data: XOR<CourseUpdateManyMutationInput, CourseUncheckedUpdateManyInput>
    /**
     * Filter which Courses to update
     */
    where?: CourseWhereInput
    /**
     * Limit how many Courses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Course upsert
   */
  export type CourseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * The filter to search for the Course to update in case it exists.
     */
    where: CourseWhereUniqueInput
    /**
     * In case the Course found by the `where` argument doesn't exist, create a new Course with this data.
     */
    create: XOR<CourseCreateInput, CourseUncheckedCreateInput>
    /**
     * In case the Course was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CourseUpdateInput, CourseUncheckedUpdateInput>
  }

  /**
   * Course delete
   */
  export type CourseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter which Course to delete.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course deleteMany
   */
  export type CourseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Courses to delete
     */
    where?: CourseWhereInput
    /**
     * Limit how many Courses to delete.
     */
    limit?: number
  }

  /**
   * Course.quizzes
   */
  export type Course$quizzesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the quiz
     */
    select?: quizSelect<ExtArgs> | null
    /**
     * Omit specific fields from the quiz
     */
    omit?: quizOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: quizInclude<ExtArgs> | null
    where?: quizWhereInput
    orderBy?: quizOrderByWithRelationInput | quizOrderByWithRelationInput[]
    cursor?: quizWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QuizScalarFieldEnum | QuizScalarFieldEnum[]
  }

  /**
   * Course.review
   */
  export type Course$reviewArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the review
     */
    select?: reviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the review
     */
    omit?: reviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewInclude<ExtArgs> | null
    where?: reviewWhereInput
    orderBy?: reviewOrderByWithRelationInput | reviewOrderByWithRelationInput[]
    cursor?: reviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Course without action
   */
  export type CourseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
  }


  /**
   * Model quiz
   */

  export type AggregateQuiz = {
    _count: QuizCountAggregateOutputType | null
    _min: QuizMinAggregateOutputType | null
    _max: QuizMaxAggregateOutputType | null
  }

  export type QuizMinAggregateOutputType = {
    qst_id: string | null
    question: string | null
    difficulty: $Enums.difficulty | null
    courseId: string | null
  }

  export type QuizMaxAggregateOutputType = {
    qst_id: string | null
    question: string | null
    difficulty: $Enums.difficulty | null
    courseId: string | null
  }

  export type QuizCountAggregateOutputType = {
    qst_id: number
    question: number
    difficulty: number
    courseId: number
    _all: number
  }


  export type QuizMinAggregateInputType = {
    qst_id?: true
    question?: true
    difficulty?: true
    courseId?: true
  }

  export type QuizMaxAggregateInputType = {
    qst_id?: true
    question?: true
    difficulty?: true
    courseId?: true
  }

  export type QuizCountAggregateInputType = {
    qst_id?: true
    question?: true
    difficulty?: true
    courseId?: true
    _all?: true
  }

  export type QuizAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which quiz to aggregate.
     */
    where?: quizWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of quizzes to fetch.
     */
    orderBy?: quizOrderByWithRelationInput | quizOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: quizWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` quizzes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` quizzes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned quizzes
    **/
    _count?: true | QuizCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QuizMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QuizMaxAggregateInputType
  }

  export type GetQuizAggregateType<T extends QuizAggregateArgs> = {
        [P in keyof T & keyof AggregateQuiz]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuiz[P]>
      : GetScalarType<T[P], AggregateQuiz[P]>
  }




  export type quizGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: quizWhereInput
    orderBy?: quizOrderByWithAggregationInput | quizOrderByWithAggregationInput[]
    by: QuizScalarFieldEnum[] | QuizScalarFieldEnum
    having?: quizScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QuizCountAggregateInputType | true
    _min?: QuizMinAggregateInputType
    _max?: QuizMaxAggregateInputType
  }

  export type QuizGroupByOutputType = {
    qst_id: string
    question: string
    difficulty: $Enums.difficulty
    courseId: string
    _count: QuizCountAggregateOutputType | null
    _min: QuizMinAggregateOutputType | null
    _max: QuizMaxAggregateOutputType | null
  }

  type GetQuizGroupByPayload<T extends quizGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QuizGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QuizGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QuizGroupByOutputType[P]>
            : GetScalarType<T[P], QuizGroupByOutputType[P]>
        }
      >
    >


  export type quizSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    qst_id?: boolean
    question?: boolean
    difficulty?: boolean
    courseId?: boolean
    responses?: boolean | quiz$responsesArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
    _count?: boolean | QuizCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quiz"]>

  export type quizSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    qst_id?: boolean
    question?: boolean
    difficulty?: boolean
    courseId?: boolean
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quiz"]>

  export type quizSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    qst_id?: boolean
    question?: boolean
    difficulty?: boolean
    courseId?: boolean
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quiz"]>

  export type quizSelectScalar = {
    qst_id?: boolean
    question?: boolean
    difficulty?: boolean
    courseId?: boolean
  }

  export type quizOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"qst_id" | "question" | "difficulty" | "courseId", ExtArgs["result"]["quiz"]>
  export type quizInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    responses?: boolean | quiz$responsesArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
    _count?: boolean | QuizCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type quizIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }
  export type quizIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }

  export type $quizPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "quiz"
    objects: {
      responses: Prisma.$q_responsePayload<ExtArgs>[]
      course: Prisma.$CoursePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      qst_id: string
      question: string
      difficulty: $Enums.difficulty
      courseId: string
    }, ExtArgs["result"]["quiz"]>
    composites: {}
  }

  type quizGetPayload<S extends boolean | null | undefined | quizDefaultArgs> = $Result.GetResult<Prisma.$quizPayload, S>

  type quizCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<quizFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: QuizCountAggregateInputType | true
    }

  export interface quizDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['quiz'], meta: { name: 'quiz' } }
    /**
     * Find zero or one Quiz that matches the filter.
     * @param {quizFindUniqueArgs} args - Arguments to find a Quiz
     * @example
     * // Get one Quiz
     * const quiz = await prisma.quiz.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends quizFindUniqueArgs>(args: SelectSubset<T, quizFindUniqueArgs<ExtArgs>>): Prisma__quizClient<$Result.GetResult<Prisma.$quizPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Quiz that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {quizFindUniqueOrThrowArgs} args - Arguments to find a Quiz
     * @example
     * // Get one Quiz
     * const quiz = await prisma.quiz.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends quizFindUniqueOrThrowArgs>(args: SelectSubset<T, quizFindUniqueOrThrowArgs<ExtArgs>>): Prisma__quizClient<$Result.GetResult<Prisma.$quizPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Quiz that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {quizFindFirstArgs} args - Arguments to find a Quiz
     * @example
     * // Get one Quiz
     * const quiz = await prisma.quiz.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends quizFindFirstArgs>(args?: SelectSubset<T, quizFindFirstArgs<ExtArgs>>): Prisma__quizClient<$Result.GetResult<Prisma.$quizPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Quiz that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {quizFindFirstOrThrowArgs} args - Arguments to find a Quiz
     * @example
     * // Get one Quiz
     * const quiz = await prisma.quiz.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends quizFindFirstOrThrowArgs>(args?: SelectSubset<T, quizFindFirstOrThrowArgs<ExtArgs>>): Prisma__quizClient<$Result.GetResult<Prisma.$quizPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Quizzes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {quizFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Quizzes
     * const quizzes = await prisma.quiz.findMany()
     * 
     * // Get first 10 Quizzes
     * const quizzes = await prisma.quiz.findMany({ take: 10 })
     * 
     * // Only select the `qst_id`
     * const quizWithQst_idOnly = await prisma.quiz.findMany({ select: { qst_id: true } })
     * 
     */
    findMany<T extends quizFindManyArgs>(args?: SelectSubset<T, quizFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$quizPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Quiz.
     * @param {quizCreateArgs} args - Arguments to create a Quiz.
     * @example
     * // Create one Quiz
     * const Quiz = await prisma.quiz.create({
     *   data: {
     *     // ... data to create a Quiz
     *   }
     * })
     * 
     */
    create<T extends quizCreateArgs>(args: SelectSubset<T, quizCreateArgs<ExtArgs>>): Prisma__quizClient<$Result.GetResult<Prisma.$quizPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Quizzes.
     * @param {quizCreateManyArgs} args - Arguments to create many Quizzes.
     * @example
     * // Create many Quizzes
     * const quiz = await prisma.quiz.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends quizCreateManyArgs>(args?: SelectSubset<T, quizCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Quizzes and returns the data saved in the database.
     * @param {quizCreateManyAndReturnArgs} args - Arguments to create many Quizzes.
     * @example
     * // Create many Quizzes
     * const quiz = await prisma.quiz.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Quizzes and only return the `qst_id`
     * const quizWithQst_idOnly = await prisma.quiz.createManyAndReturn({
     *   select: { qst_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends quizCreateManyAndReturnArgs>(args?: SelectSubset<T, quizCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$quizPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Quiz.
     * @param {quizDeleteArgs} args - Arguments to delete one Quiz.
     * @example
     * // Delete one Quiz
     * const Quiz = await prisma.quiz.delete({
     *   where: {
     *     // ... filter to delete one Quiz
     *   }
     * })
     * 
     */
    delete<T extends quizDeleteArgs>(args: SelectSubset<T, quizDeleteArgs<ExtArgs>>): Prisma__quizClient<$Result.GetResult<Prisma.$quizPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Quiz.
     * @param {quizUpdateArgs} args - Arguments to update one Quiz.
     * @example
     * // Update one Quiz
     * const quiz = await prisma.quiz.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends quizUpdateArgs>(args: SelectSubset<T, quizUpdateArgs<ExtArgs>>): Prisma__quizClient<$Result.GetResult<Prisma.$quizPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Quizzes.
     * @param {quizDeleteManyArgs} args - Arguments to filter Quizzes to delete.
     * @example
     * // Delete a few Quizzes
     * const { count } = await prisma.quiz.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends quizDeleteManyArgs>(args?: SelectSubset<T, quizDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Quizzes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {quizUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Quizzes
     * const quiz = await prisma.quiz.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends quizUpdateManyArgs>(args: SelectSubset<T, quizUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Quizzes and returns the data updated in the database.
     * @param {quizUpdateManyAndReturnArgs} args - Arguments to update many Quizzes.
     * @example
     * // Update many Quizzes
     * const quiz = await prisma.quiz.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Quizzes and only return the `qst_id`
     * const quizWithQst_idOnly = await prisma.quiz.updateManyAndReturn({
     *   select: { qst_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends quizUpdateManyAndReturnArgs>(args: SelectSubset<T, quizUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$quizPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Quiz.
     * @param {quizUpsertArgs} args - Arguments to update or create a Quiz.
     * @example
     * // Update or create a Quiz
     * const quiz = await prisma.quiz.upsert({
     *   create: {
     *     // ... data to create a Quiz
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Quiz we want to update
     *   }
     * })
     */
    upsert<T extends quizUpsertArgs>(args: SelectSubset<T, quizUpsertArgs<ExtArgs>>): Prisma__quizClient<$Result.GetResult<Prisma.$quizPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Quizzes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {quizCountArgs} args - Arguments to filter Quizzes to count.
     * @example
     * // Count the number of Quizzes
     * const count = await prisma.quiz.count({
     *   where: {
     *     // ... the filter for the Quizzes we want to count
     *   }
     * })
    **/
    count<T extends quizCountArgs>(
      args?: Subset<T, quizCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QuizCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Quiz.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QuizAggregateArgs>(args: Subset<T, QuizAggregateArgs>): Prisma.PrismaPromise<GetQuizAggregateType<T>>

    /**
     * Group by Quiz.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {quizGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends quizGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: quizGroupByArgs['orderBy'] }
        : { orderBy?: quizGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, quizGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuizGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the quiz model
   */
  readonly fields: quizFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for quiz.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__quizClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    responses<T extends quiz$responsesArgs<ExtArgs> = {}>(args?: Subset<T, quiz$responsesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$q_responsePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    course<T extends CourseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CourseDefaultArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the quiz model
   */
  interface quizFieldRefs {
    readonly qst_id: FieldRef<"quiz", 'String'>
    readonly question: FieldRef<"quiz", 'String'>
    readonly difficulty: FieldRef<"quiz", 'difficulty'>
    readonly courseId: FieldRef<"quiz", 'String'>
  }
    

  // Custom InputTypes
  /**
   * quiz findUnique
   */
  export type quizFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the quiz
     */
    select?: quizSelect<ExtArgs> | null
    /**
     * Omit specific fields from the quiz
     */
    omit?: quizOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: quizInclude<ExtArgs> | null
    /**
     * Filter, which quiz to fetch.
     */
    where: quizWhereUniqueInput
  }

  /**
   * quiz findUniqueOrThrow
   */
  export type quizFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the quiz
     */
    select?: quizSelect<ExtArgs> | null
    /**
     * Omit specific fields from the quiz
     */
    omit?: quizOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: quizInclude<ExtArgs> | null
    /**
     * Filter, which quiz to fetch.
     */
    where: quizWhereUniqueInput
  }

  /**
   * quiz findFirst
   */
  export type quizFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the quiz
     */
    select?: quizSelect<ExtArgs> | null
    /**
     * Omit specific fields from the quiz
     */
    omit?: quizOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: quizInclude<ExtArgs> | null
    /**
     * Filter, which quiz to fetch.
     */
    where?: quizWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of quizzes to fetch.
     */
    orderBy?: quizOrderByWithRelationInput | quizOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for quizzes.
     */
    cursor?: quizWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` quizzes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` quizzes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of quizzes.
     */
    distinct?: QuizScalarFieldEnum | QuizScalarFieldEnum[]
  }

  /**
   * quiz findFirstOrThrow
   */
  export type quizFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the quiz
     */
    select?: quizSelect<ExtArgs> | null
    /**
     * Omit specific fields from the quiz
     */
    omit?: quizOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: quizInclude<ExtArgs> | null
    /**
     * Filter, which quiz to fetch.
     */
    where?: quizWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of quizzes to fetch.
     */
    orderBy?: quizOrderByWithRelationInput | quizOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for quizzes.
     */
    cursor?: quizWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` quizzes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` quizzes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of quizzes.
     */
    distinct?: QuizScalarFieldEnum | QuizScalarFieldEnum[]
  }

  /**
   * quiz findMany
   */
  export type quizFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the quiz
     */
    select?: quizSelect<ExtArgs> | null
    /**
     * Omit specific fields from the quiz
     */
    omit?: quizOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: quizInclude<ExtArgs> | null
    /**
     * Filter, which quizzes to fetch.
     */
    where?: quizWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of quizzes to fetch.
     */
    orderBy?: quizOrderByWithRelationInput | quizOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing quizzes.
     */
    cursor?: quizWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` quizzes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` quizzes.
     */
    skip?: number
    distinct?: QuizScalarFieldEnum | QuizScalarFieldEnum[]
  }

  /**
   * quiz create
   */
  export type quizCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the quiz
     */
    select?: quizSelect<ExtArgs> | null
    /**
     * Omit specific fields from the quiz
     */
    omit?: quizOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: quizInclude<ExtArgs> | null
    /**
     * The data needed to create a quiz.
     */
    data: XOR<quizCreateInput, quizUncheckedCreateInput>
  }

  /**
   * quiz createMany
   */
  export type quizCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many quizzes.
     */
    data: quizCreateManyInput | quizCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * quiz createManyAndReturn
   */
  export type quizCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the quiz
     */
    select?: quizSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the quiz
     */
    omit?: quizOmit<ExtArgs> | null
    /**
     * The data used to create many quizzes.
     */
    data: quizCreateManyInput | quizCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: quizIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * quiz update
   */
  export type quizUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the quiz
     */
    select?: quizSelect<ExtArgs> | null
    /**
     * Omit specific fields from the quiz
     */
    omit?: quizOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: quizInclude<ExtArgs> | null
    /**
     * The data needed to update a quiz.
     */
    data: XOR<quizUpdateInput, quizUncheckedUpdateInput>
    /**
     * Choose, which quiz to update.
     */
    where: quizWhereUniqueInput
  }

  /**
   * quiz updateMany
   */
  export type quizUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update quizzes.
     */
    data: XOR<quizUpdateManyMutationInput, quizUncheckedUpdateManyInput>
    /**
     * Filter which quizzes to update
     */
    where?: quizWhereInput
    /**
     * Limit how many quizzes to update.
     */
    limit?: number
  }

  /**
   * quiz updateManyAndReturn
   */
  export type quizUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the quiz
     */
    select?: quizSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the quiz
     */
    omit?: quizOmit<ExtArgs> | null
    /**
     * The data used to update quizzes.
     */
    data: XOR<quizUpdateManyMutationInput, quizUncheckedUpdateManyInput>
    /**
     * Filter which quizzes to update
     */
    where?: quizWhereInput
    /**
     * Limit how many quizzes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: quizIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * quiz upsert
   */
  export type quizUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the quiz
     */
    select?: quizSelect<ExtArgs> | null
    /**
     * Omit specific fields from the quiz
     */
    omit?: quizOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: quizInclude<ExtArgs> | null
    /**
     * The filter to search for the quiz to update in case it exists.
     */
    where: quizWhereUniqueInput
    /**
     * In case the quiz found by the `where` argument doesn't exist, create a new quiz with this data.
     */
    create: XOR<quizCreateInput, quizUncheckedCreateInput>
    /**
     * In case the quiz was found with the provided `where` argument, update it with this data.
     */
    update: XOR<quizUpdateInput, quizUncheckedUpdateInput>
  }

  /**
   * quiz delete
   */
  export type quizDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the quiz
     */
    select?: quizSelect<ExtArgs> | null
    /**
     * Omit specific fields from the quiz
     */
    omit?: quizOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: quizInclude<ExtArgs> | null
    /**
     * Filter which quiz to delete.
     */
    where: quizWhereUniqueInput
  }

  /**
   * quiz deleteMany
   */
  export type quizDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which quizzes to delete
     */
    where?: quizWhereInput
    /**
     * Limit how many quizzes to delete.
     */
    limit?: number
  }

  /**
   * quiz.responses
   */
  export type quiz$responsesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the q_response
     */
    select?: q_responseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the q_response
     */
    omit?: q_responseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: q_responseInclude<ExtArgs> | null
    where?: q_responseWhereInput
    orderBy?: q_responseOrderByWithRelationInput | q_responseOrderByWithRelationInput[]
    cursor?: q_responseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Q_responseScalarFieldEnum | Q_responseScalarFieldEnum[]
  }

  /**
   * quiz without action
   */
  export type quizDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the quiz
     */
    select?: quizSelect<ExtArgs> | null
    /**
     * Omit specific fields from the quiz
     */
    omit?: quizOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: quizInclude<ExtArgs> | null
  }


  /**
   * Model q_response
   */

  export type AggregateQ_response = {
    _count: Q_responseCountAggregateOutputType | null
    _min: Q_responseMinAggregateOutputType | null
    _max: Q_responseMaxAggregateOutputType | null
  }

  export type Q_responseMinAggregateOutputType = {
    rspns_id: string | null
    response: string | null
    isCorrect: boolean | null
    quizId: string | null
  }

  export type Q_responseMaxAggregateOutputType = {
    rspns_id: string | null
    response: string | null
    isCorrect: boolean | null
    quizId: string | null
  }

  export type Q_responseCountAggregateOutputType = {
    rspns_id: number
    response: number
    isCorrect: number
    quizId: number
    _all: number
  }


  export type Q_responseMinAggregateInputType = {
    rspns_id?: true
    response?: true
    isCorrect?: true
    quizId?: true
  }

  export type Q_responseMaxAggregateInputType = {
    rspns_id?: true
    response?: true
    isCorrect?: true
    quizId?: true
  }

  export type Q_responseCountAggregateInputType = {
    rspns_id?: true
    response?: true
    isCorrect?: true
    quizId?: true
    _all?: true
  }

  export type Q_responseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which q_response to aggregate.
     */
    where?: q_responseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of q_responses to fetch.
     */
    orderBy?: q_responseOrderByWithRelationInput | q_responseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: q_responseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` q_responses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` q_responses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned q_responses
    **/
    _count?: true | Q_responseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Q_responseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Q_responseMaxAggregateInputType
  }

  export type GetQ_responseAggregateType<T extends Q_responseAggregateArgs> = {
        [P in keyof T & keyof AggregateQ_response]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQ_response[P]>
      : GetScalarType<T[P], AggregateQ_response[P]>
  }




  export type q_responseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: q_responseWhereInput
    orderBy?: q_responseOrderByWithAggregationInput | q_responseOrderByWithAggregationInput[]
    by: Q_responseScalarFieldEnum[] | Q_responseScalarFieldEnum
    having?: q_responseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Q_responseCountAggregateInputType | true
    _min?: Q_responseMinAggregateInputType
    _max?: Q_responseMaxAggregateInputType
  }

  export type Q_responseGroupByOutputType = {
    rspns_id: string
    response: string
    isCorrect: boolean
    quizId: string
    _count: Q_responseCountAggregateOutputType | null
    _min: Q_responseMinAggregateOutputType | null
    _max: Q_responseMaxAggregateOutputType | null
  }

  type GetQ_responseGroupByPayload<T extends q_responseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Q_responseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Q_responseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Q_responseGroupByOutputType[P]>
            : GetScalarType<T[P], Q_responseGroupByOutputType[P]>
        }
      >
    >


  export type q_responseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    rspns_id?: boolean
    response?: boolean
    isCorrect?: boolean
    quizId?: boolean
    quiz?: boolean | quizDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["q_response"]>

  export type q_responseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    rspns_id?: boolean
    response?: boolean
    isCorrect?: boolean
    quizId?: boolean
    quiz?: boolean | quizDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["q_response"]>

  export type q_responseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    rspns_id?: boolean
    response?: boolean
    isCorrect?: boolean
    quizId?: boolean
    quiz?: boolean | quizDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["q_response"]>

  export type q_responseSelectScalar = {
    rspns_id?: boolean
    response?: boolean
    isCorrect?: boolean
    quizId?: boolean
  }

  export type q_responseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"rspns_id" | "response" | "isCorrect" | "quizId", ExtArgs["result"]["q_response"]>
  export type q_responseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    quiz?: boolean | quizDefaultArgs<ExtArgs>
  }
  export type q_responseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    quiz?: boolean | quizDefaultArgs<ExtArgs>
  }
  export type q_responseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    quiz?: boolean | quizDefaultArgs<ExtArgs>
  }

  export type $q_responsePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "q_response"
    objects: {
      quiz: Prisma.$quizPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      rspns_id: string
      response: string
      isCorrect: boolean
      quizId: string
    }, ExtArgs["result"]["q_response"]>
    composites: {}
  }

  type q_responseGetPayload<S extends boolean | null | undefined | q_responseDefaultArgs> = $Result.GetResult<Prisma.$q_responsePayload, S>

  type q_responseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<q_responseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Q_responseCountAggregateInputType | true
    }

  export interface q_responseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['q_response'], meta: { name: 'q_response' } }
    /**
     * Find zero or one Q_response that matches the filter.
     * @param {q_responseFindUniqueArgs} args - Arguments to find a Q_response
     * @example
     * // Get one Q_response
     * const q_response = await prisma.q_response.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends q_responseFindUniqueArgs>(args: SelectSubset<T, q_responseFindUniqueArgs<ExtArgs>>): Prisma__q_responseClient<$Result.GetResult<Prisma.$q_responsePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Q_response that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {q_responseFindUniqueOrThrowArgs} args - Arguments to find a Q_response
     * @example
     * // Get one Q_response
     * const q_response = await prisma.q_response.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends q_responseFindUniqueOrThrowArgs>(args: SelectSubset<T, q_responseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__q_responseClient<$Result.GetResult<Prisma.$q_responsePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Q_response that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {q_responseFindFirstArgs} args - Arguments to find a Q_response
     * @example
     * // Get one Q_response
     * const q_response = await prisma.q_response.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends q_responseFindFirstArgs>(args?: SelectSubset<T, q_responseFindFirstArgs<ExtArgs>>): Prisma__q_responseClient<$Result.GetResult<Prisma.$q_responsePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Q_response that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {q_responseFindFirstOrThrowArgs} args - Arguments to find a Q_response
     * @example
     * // Get one Q_response
     * const q_response = await prisma.q_response.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends q_responseFindFirstOrThrowArgs>(args?: SelectSubset<T, q_responseFindFirstOrThrowArgs<ExtArgs>>): Prisma__q_responseClient<$Result.GetResult<Prisma.$q_responsePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Q_responses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {q_responseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Q_responses
     * const q_responses = await prisma.q_response.findMany()
     * 
     * // Get first 10 Q_responses
     * const q_responses = await prisma.q_response.findMany({ take: 10 })
     * 
     * // Only select the `rspns_id`
     * const q_responseWithRspns_idOnly = await prisma.q_response.findMany({ select: { rspns_id: true } })
     * 
     */
    findMany<T extends q_responseFindManyArgs>(args?: SelectSubset<T, q_responseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$q_responsePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Q_response.
     * @param {q_responseCreateArgs} args - Arguments to create a Q_response.
     * @example
     * // Create one Q_response
     * const Q_response = await prisma.q_response.create({
     *   data: {
     *     // ... data to create a Q_response
     *   }
     * })
     * 
     */
    create<T extends q_responseCreateArgs>(args: SelectSubset<T, q_responseCreateArgs<ExtArgs>>): Prisma__q_responseClient<$Result.GetResult<Prisma.$q_responsePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Q_responses.
     * @param {q_responseCreateManyArgs} args - Arguments to create many Q_responses.
     * @example
     * // Create many Q_responses
     * const q_response = await prisma.q_response.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends q_responseCreateManyArgs>(args?: SelectSubset<T, q_responseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Q_responses and returns the data saved in the database.
     * @param {q_responseCreateManyAndReturnArgs} args - Arguments to create many Q_responses.
     * @example
     * // Create many Q_responses
     * const q_response = await prisma.q_response.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Q_responses and only return the `rspns_id`
     * const q_responseWithRspns_idOnly = await prisma.q_response.createManyAndReturn({
     *   select: { rspns_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends q_responseCreateManyAndReturnArgs>(args?: SelectSubset<T, q_responseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$q_responsePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Q_response.
     * @param {q_responseDeleteArgs} args - Arguments to delete one Q_response.
     * @example
     * // Delete one Q_response
     * const Q_response = await prisma.q_response.delete({
     *   where: {
     *     // ... filter to delete one Q_response
     *   }
     * })
     * 
     */
    delete<T extends q_responseDeleteArgs>(args: SelectSubset<T, q_responseDeleteArgs<ExtArgs>>): Prisma__q_responseClient<$Result.GetResult<Prisma.$q_responsePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Q_response.
     * @param {q_responseUpdateArgs} args - Arguments to update one Q_response.
     * @example
     * // Update one Q_response
     * const q_response = await prisma.q_response.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends q_responseUpdateArgs>(args: SelectSubset<T, q_responseUpdateArgs<ExtArgs>>): Prisma__q_responseClient<$Result.GetResult<Prisma.$q_responsePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Q_responses.
     * @param {q_responseDeleteManyArgs} args - Arguments to filter Q_responses to delete.
     * @example
     * // Delete a few Q_responses
     * const { count } = await prisma.q_response.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends q_responseDeleteManyArgs>(args?: SelectSubset<T, q_responseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Q_responses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {q_responseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Q_responses
     * const q_response = await prisma.q_response.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends q_responseUpdateManyArgs>(args: SelectSubset<T, q_responseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Q_responses and returns the data updated in the database.
     * @param {q_responseUpdateManyAndReturnArgs} args - Arguments to update many Q_responses.
     * @example
     * // Update many Q_responses
     * const q_response = await prisma.q_response.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Q_responses and only return the `rspns_id`
     * const q_responseWithRspns_idOnly = await prisma.q_response.updateManyAndReturn({
     *   select: { rspns_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends q_responseUpdateManyAndReturnArgs>(args: SelectSubset<T, q_responseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$q_responsePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Q_response.
     * @param {q_responseUpsertArgs} args - Arguments to update or create a Q_response.
     * @example
     * // Update or create a Q_response
     * const q_response = await prisma.q_response.upsert({
     *   create: {
     *     // ... data to create a Q_response
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Q_response we want to update
     *   }
     * })
     */
    upsert<T extends q_responseUpsertArgs>(args: SelectSubset<T, q_responseUpsertArgs<ExtArgs>>): Prisma__q_responseClient<$Result.GetResult<Prisma.$q_responsePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Q_responses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {q_responseCountArgs} args - Arguments to filter Q_responses to count.
     * @example
     * // Count the number of Q_responses
     * const count = await prisma.q_response.count({
     *   where: {
     *     // ... the filter for the Q_responses we want to count
     *   }
     * })
    **/
    count<T extends q_responseCountArgs>(
      args?: Subset<T, q_responseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Q_responseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Q_response.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Q_responseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Q_responseAggregateArgs>(args: Subset<T, Q_responseAggregateArgs>): Prisma.PrismaPromise<GetQ_responseAggregateType<T>>

    /**
     * Group by Q_response.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {q_responseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends q_responseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: q_responseGroupByArgs['orderBy'] }
        : { orderBy?: q_responseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, q_responseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQ_responseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the q_response model
   */
  readonly fields: q_responseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for q_response.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__q_responseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    quiz<T extends quizDefaultArgs<ExtArgs> = {}>(args?: Subset<T, quizDefaultArgs<ExtArgs>>): Prisma__quizClient<$Result.GetResult<Prisma.$quizPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the q_response model
   */
  interface q_responseFieldRefs {
    readonly rspns_id: FieldRef<"q_response", 'String'>
    readonly response: FieldRef<"q_response", 'String'>
    readonly isCorrect: FieldRef<"q_response", 'Boolean'>
    readonly quizId: FieldRef<"q_response", 'String'>
  }
    

  // Custom InputTypes
  /**
   * q_response findUnique
   */
  export type q_responseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the q_response
     */
    select?: q_responseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the q_response
     */
    omit?: q_responseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: q_responseInclude<ExtArgs> | null
    /**
     * Filter, which q_response to fetch.
     */
    where: q_responseWhereUniqueInput
  }

  /**
   * q_response findUniqueOrThrow
   */
  export type q_responseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the q_response
     */
    select?: q_responseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the q_response
     */
    omit?: q_responseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: q_responseInclude<ExtArgs> | null
    /**
     * Filter, which q_response to fetch.
     */
    where: q_responseWhereUniqueInput
  }

  /**
   * q_response findFirst
   */
  export type q_responseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the q_response
     */
    select?: q_responseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the q_response
     */
    omit?: q_responseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: q_responseInclude<ExtArgs> | null
    /**
     * Filter, which q_response to fetch.
     */
    where?: q_responseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of q_responses to fetch.
     */
    orderBy?: q_responseOrderByWithRelationInput | q_responseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for q_responses.
     */
    cursor?: q_responseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` q_responses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` q_responses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of q_responses.
     */
    distinct?: Q_responseScalarFieldEnum | Q_responseScalarFieldEnum[]
  }

  /**
   * q_response findFirstOrThrow
   */
  export type q_responseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the q_response
     */
    select?: q_responseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the q_response
     */
    omit?: q_responseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: q_responseInclude<ExtArgs> | null
    /**
     * Filter, which q_response to fetch.
     */
    where?: q_responseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of q_responses to fetch.
     */
    orderBy?: q_responseOrderByWithRelationInput | q_responseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for q_responses.
     */
    cursor?: q_responseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` q_responses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` q_responses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of q_responses.
     */
    distinct?: Q_responseScalarFieldEnum | Q_responseScalarFieldEnum[]
  }

  /**
   * q_response findMany
   */
  export type q_responseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the q_response
     */
    select?: q_responseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the q_response
     */
    omit?: q_responseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: q_responseInclude<ExtArgs> | null
    /**
     * Filter, which q_responses to fetch.
     */
    where?: q_responseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of q_responses to fetch.
     */
    orderBy?: q_responseOrderByWithRelationInput | q_responseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing q_responses.
     */
    cursor?: q_responseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` q_responses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` q_responses.
     */
    skip?: number
    distinct?: Q_responseScalarFieldEnum | Q_responseScalarFieldEnum[]
  }

  /**
   * q_response create
   */
  export type q_responseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the q_response
     */
    select?: q_responseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the q_response
     */
    omit?: q_responseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: q_responseInclude<ExtArgs> | null
    /**
     * The data needed to create a q_response.
     */
    data: XOR<q_responseCreateInput, q_responseUncheckedCreateInput>
  }

  /**
   * q_response createMany
   */
  export type q_responseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many q_responses.
     */
    data: q_responseCreateManyInput | q_responseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * q_response createManyAndReturn
   */
  export type q_responseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the q_response
     */
    select?: q_responseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the q_response
     */
    omit?: q_responseOmit<ExtArgs> | null
    /**
     * The data used to create many q_responses.
     */
    data: q_responseCreateManyInput | q_responseCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: q_responseIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * q_response update
   */
  export type q_responseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the q_response
     */
    select?: q_responseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the q_response
     */
    omit?: q_responseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: q_responseInclude<ExtArgs> | null
    /**
     * The data needed to update a q_response.
     */
    data: XOR<q_responseUpdateInput, q_responseUncheckedUpdateInput>
    /**
     * Choose, which q_response to update.
     */
    where: q_responseWhereUniqueInput
  }

  /**
   * q_response updateMany
   */
  export type q_responseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update q_responses.
     */
    data: XOR<q_responseUpdateManyMutationInput, q_responseUncheckedUpdateManyInput>
    /**
     * Filter which q_responses to update
     */
    where?: q_responseWhereInput
    /**
     * Limit how many q_responses to update.
     */
    limit?: number
  }

  /**
   * q_response updateManyAndReturn
   */
  export type q_responseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the q_response
     */
    select?: q_responseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the q_response
     */
    omit?: q_responseOmit<ExtArgs> | null
    /**
     * The data used to update q_responses.
     */
    data: XOR<q_responseUpdateManyMutationInput, q_responseUncheckedUpdateManyInput>
    /**
     * Filter which q_responses to update
     */
    where?: q_responseWhereInput
    /**
     * Limit how many q_responses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: q_responseIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * q_response upsert
   */
  export type q_responseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the q_response
     */
    select?: q_responseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the q_response
     */
    omit?: q_responseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: q_responseInclude<ExtArgs> | null
    /**
     * The filter to search for the q_response to update in case it exists.
     */
    where: q_responseWhereUniqueInput
    /**
     * In case the q_response found by the `where` argument doesn't exist, create a new q_response with this data.
     */
    create: XOR<q_responseCreateInput, q_responseUncheckedCreateInput>
    /**
     * In case the q_response was found with the provided `where` argument, update it with this data.
     */
    update: XOR<q_responseUpdateInput, q_responseUncheckedUpdateInput>
  }

  /**
   * q_response delete
   */
  export type q_responseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the q_response
     */
    select?: q_responseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the q_response
     */
    omit?: q_responseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: q_responseInclude<ExtArgs> | null
    /**
     * Filter which q_response to delete.
     */
    where: q_responseWhereUniqueInput
  }

  /**
   * q_response deleteMany
   */
  export type q_responseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which q_responses to delete
     */
    where?: q_responseWhereInput
    /**
     * Limit how many q_responses to delete.
     */
    limit?: number
  }

  /**
   * q_response without action
   */
  export type q_responseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the q_response
     */
    select?: q_responseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the q_response
     */
    omit?: q_responseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: q_responseInclude<ExtArgs> | null
  }


  /**
   * Model enroll
   */

  export type AggregateEnroll = {
    _count: EnrollCountAggregateOutputType | null
    _avg: EnrollAvgAggregateOutputType | null
    _sum: EnrollSumAggregateOutputType | null
    _min: EnrollMinAggregateOutputType | null
    _max: EnrollMaxAggregateOutputType | null
  }

  export type EnrollAvgAggregateOutputType = {
    progress: number | null
  }

  export type EnrollSumAggregateOutputType = {
    progress: number | null
  }

  export type EnrollMinAggregateOutputType = {
    studentId: string | null
    domainId: string | null
    progress: number | null
  }

  export type EnrollMaxAggregateOutputType = {
    studentId: string | null
    domainId: string | null
    progress: number | null
  }

  export type EnrollCountAggregateOutputType = {
    studentId: number
    domainId: number
    progress: number
    _all: number
  }


  export type EnrollAvgAggregateInputType = {
    progress?: true
  }

  export type EnrollSumAggregateInputType = {
    progress?: true
  }

  export type EnrollMinAggregateInputType = {
    studentId?: true
    domainId?: true
    progress?: true
  }

  export type EnrollMaxAggregateInputType = {
    studentId?: true
    domainId?: true
    progress?: true
  }

  export type EnrollCountAggregateInputType = {
    studentId?: true
    domainId?: true
    progress?: true
    _all?: true
  }

  export type EnrollAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which enroll to aggregate.
     */
    where?: enrollWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of enrolls to fetch.
     */
    orderBy?: enrollOrderByWithRelationInput | enrollOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: enrollWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` enrolls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` enrolls.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned enrolls
    **/
    _count?: true | EnrollCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EnrollAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EnrollSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EnrollMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EnrollMaxAggregateInputType
  }

  export type GetEnrollAggregateType<T extends EnrollAggregateArgs> = {
        [P in keyof T & keyof AggregateEnroll]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEnroll[P]>
      : GetScalarType<T[P], AggregateEnroll[P]>
  }




  export type enrollGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: enrollWhereInput
    orderBy?: enrollOrderByWithAggregationInput | enrollOrderByWithAggregationInput[]
    by: EnrollScalarFieldEnum[] | EnrollScalarFieldEnum
    having?: enrollScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EnrollCountAggregateInputType | true
    _avg?: EnrollAvgAggregateInputType
    _sum?: EnrollSumAggregateInputType
    _min?: EnrollMinAggregateInputType
    _max?: EnrollMaxAggregateInputType
  }

  export type EnrollGroupByOutputType = {
    studentId: string
    domainId: string
    progress: number
    _count: EnrollCountAggregateOutputType | null
    _avg: EnrollAvgAggregateOutputType | null
    _sum: EnrollSumAggregateOutputType | null
    _min: EnrollMinAggregateOutputType | null
    _max: EnrollMaxAggregateOutputType | null
  }

  type GetEnrollGroupByPayload<T extends enrollGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EnrollGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EnrollGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EnrollGroupByOutputType[P]>
            : GetScalarType<T[P], EnrollGroupByOutputType[P]>
        }
      >
    >


  export type enrollSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    studentId?: boolean
    domainId?: boolean
    progress?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    domain?: boolean | DomainDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["enroll"]>

  export type enrollSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    studentId?: boolean
    domainId?: boolean
    progress?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    domain?: boolean | DomainDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["enroll"]>

  export type enrollSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    studentId?: boolean
    domainId?: boolean
    progress?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    domain?: boolean | DomainDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["enroll"]>

  export type enrollSelectScalar = {
    studentId?: boolean
    domainId?: boolean
    progress?: boolean
  }

  export type enrollOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"studentId" | "domainId" | "progress", ExtArgs["result"]["enroll"]>
  export type enrollInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    domain?: boolean | DomainDefaultArgs<ExtArgs>
  }
  export type enrollIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    domain?: boolean | DomainDefaultArgs<ExtArgs>
  }
  export type enrollIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    domain?: boolean | DomainDefaultArgs<ExtArgs>
  }

  export type $enrollPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "enroll"
    objects: {
      student: Prisma.$StudentPayload<ExtArgs>
      domain: Prisma.$DomainPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      studentId: string
      domainId: string
      progress: number
    }, ExtArgs["result"]["enroll"]>
    composites: {}
  }

  type enrollGetPayload<S extends boolean | null | undefined | enrollDefaultArgs> = $Result.GetResult<Prisma.$enrollPayload, S>

  type enrollCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<enrollFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EnrollCountAggregateInputType | true
    }

  export interface enrollDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['enroll'], meta: { name: 'enroll' } }
    /**
     * Find zero or one Enroll that matches the filter.
     * @param {enrollFindUniqueArgs} args - Arguments to find a Enroll
     * @example
     * // Get one Enroll
     * const enroll = await prisma.enroll.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends enrollFindUniqueArgs>(args: SelectSubset<T, enrollFindUniqueArgs<ExtArgs>>): Prisma__enrollClient<$Result.GetResult<Prisma.$enrollPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Enroll that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {enrollFindUniqueOrThrowArgs} args - Arguments to find a Enroll
     * @example
     * // Get one Enroll
     * const enroll = await prisma.enroll.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends enrollFindUniqueOrThrowArgs>(args: SelectSubset<T, enrollFindUniqueOrThrowArgs<ExtArgs>>): Prisma__enrollClient<$Result.GetResult<Prisma.$enrollPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Enroll that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {enrollFindFirstArgs} args - Arguments to find a Enroll
     * @example
     * // Get one Enroll
     * const enroll = await prisma.enroll.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends enrollFindFirstArgs>(args?: SelectSubset<T, enrollFindFirstArgs<ExtArgs>>): Prisma__enrollClient<$Result.GetResult<Prisma.$enrollPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Enroll that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {enrollFindFirstOrThrowArgs} args - Arguments to find a Enroll
     * @example
     * // Get one Enroll
     * const enroll = await prisma.enroll.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends enrollFindFirstOrThrowArgs>(args?: SelectSubset<T, enrollFindFirstOrThrowArgs<ExtArgs>>): Prisma__enrollClient<$Result.GetResult<Prisma.$enrollPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Enrolls that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {enrollFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Enrolls
     * const enrolls = await prisma.enroll.findMany()
     * 
     * // Get first 10 Enrolls
     * const enrolls = await prisma.enroll.findMany({ take: 10 })
     * 
     * // Only select the `studentId`
     * const enrollWithStudentIdOnly = await prisma.enroll.findMany({ select: { studentId: true } })
     * 
     */
    findMany<T extends enrollFindManyArgs>(args?: SelectSubset<T, enrollFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$enrollPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Enroll.
     * @param {enrollCreateArgs} args - Arguments to create a Enroll.
     * @example
     * // Create one Enroll
     * const Enroll = await prisma.enroll.create({
     *   data: {
     *     // ... data to create a Enroll
     *   }
     * })
     * 
     */
    create<T extends enrollCreateArgs>(args: SelectSubset<T, enrollCreateArgs<ExtArgs>>): Prisma__enrollClient<$Result.GetResult<Prisma.$enrollPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Enrolls.
     * @param {enrollCreateManyArgs} args - Arguments to create many Enrolls.
     * @example
     * // Create many Enrolls
     * const enroll = await prisma.enroll.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends enrollCreateManyArgs>(args?: SelectSubset<T, enrollCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Enrolls and returns the data saved in the database.
     * @param {enrollCreateManyAndReturnArgs} args - Arguments to create many Enrolls.
     * @example
     * // Create many Enrolls
     * const enroll = await prisma.enroll.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Enrolls and only return the `studentId`
     * const enrollWithStudentIdOnly = await prisma.enroll.createManyAndReturn({
     *   select: { studentId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends enrollCreateManyAndReturnArgs>(args?: SelectSubset<T, enrollCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$enrollPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Enroll.
     * @param {enrollDeleteArgs} args - Arguments to delete one Enroll.
     * @example
     * // Delete one Enroll
     * const Enroll = await prisma.enroll.delete({
     *   where: {
     *     // ... filter to delete one Enroll
     *   }
     * })
     * 
     */
    delete<T extends enrollDeleteArgs>(args: SelectSubset<T, enrollDeleteArgs<ExtArgs>>): Prisma__enrollClient<$Result.GetResult<Prisma.$enrollPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Enroll.
     * @param {enrollUpdateArgs} args - Arguments to update one Enroll.
     * @example
     * // Update one Enroll
     * const enroll = await prisma.enroll.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends enrollUpdateArgs>(args: SelectSubset<T, enrollUpdateArgs<ExtArgs>>): Prisma__enrollClient<$Result.GetResult<Prisma.$enrollPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Enrolls.
     * @param {enrollDeleteManyArgs} args - Arguments to filter Enrolls to delete.
     * @example
     * // Delete a few Enrolls
     * const { count } = await prisma.enroll.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends enrollDeleteManyArgs>(args?: SelectSubset<T, enrollDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Enrolls.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {enrollUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Enrolls
     * const enroll = await prisma.enroll.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends enrollUpdateManyArgs>(args: SelectSubset<T, enrollUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Enrolls and returns the data updated in the database.
     * @param {enrollUpdateManyAndReturnArgs} args - Arguments to update many Enrolls.
     * @example
     * // Update many Enrolls
     * const enroll = await prisma.enroll.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Enrolls and only return the `studentId`
     * const enrollWithStudentIdOnly = await prisma.enroll.updateManyAndReturn({
     *   select: { studentId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends enrollUpdateManyAndReturnArgs>(args: SelectSubset<T, enrollUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$enrollPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Enroll.
     * @param {enrollUpsertArgs} args - Arguments to update or create a Enroll.
     * @example
     * // Update or create a Enroll
     * const enroll = await prisma.enroll.upsert({
     *   create: {
     *     // ... data to create a Enroll
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Enroll we want to update
     *   }
     * })
     */
    upsert<T extends enrollUpsertArgs>(args: SelectSubset<T, enrollUpsertArgs<ExtArgs>>): Prisma__enrollClient<$Result.GetResult<Prisma.$enrollPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Enrolls.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {enrollCountArgs} args - Arguments to filter Enrolls to count.
     * @example
     * // Count the number of Enrolls
     * const count = await prisma.enroll.count({
     *   where: {
     *     // ... the filter for the Enrolls we want to count
     *   }
     * })
    **/
    count<T extends enrollCountArgs>(
      args?: Subset<T, enrollCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EnrollCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Enroll.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EnrollAggregateArgs>(args: Subset<T, EnrollAggregateArgs>): Prisma.PrismaPromise<GetEnrollAggregateType<T>>

    /**
     * Group by Enroll.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {enrollGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends enrollGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: enrollGroupByArgs['orderBy'] }
        : { orderBy?: enrollGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, enrollGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEnrollGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the enroll model
   */
  readonly fields: enrollFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for enroll.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__enrollClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends StudentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentDefaultArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    domain<T extends DomainDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DomainDefaultArgs<ExtArgs>>): Prisma__DomainClient<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the enroll model
   */
  interface enrollFieldRefs {
    readonly studentId: FieldRef<"enroll", 'String'>
    readonly domainId: FieldRef<"enroll", 'String'>
    readonly progress: FieldRef<"enroll", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * enroll findUnique
   */
  export type enrollFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the enroll
     */
    select?: enrollSelect<ExtArgs> | null
    /**
     * Omit specific fields from the enroll
     */
    omit?: enrollOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: enrollInclude<ExtArgs> | null
    /**
     * Filter, which enroll to fetch.
     */
    where: enrollWhereUniqueInput
  }

  /**
   * enroll findUniqueOrThrow
   */
  export type enrollFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the enroll
     */
    select?: enrollSelect<ExtArgs> | null
    /**
     * Omit specific fields from the enroll
     */
    omit?: enrollOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: enrollInclude<ExtArgs> | null
    /**
     * Filter, which enroll to fetch.
     */
    where: enrollWhereUniqueInput
  }

  /**
   * enroll findFirst
   */
  export type enrollFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the enroll
     */
    select?: enrollSelect<ExtArgs> | null
    /**
     * Omit specific fields from the enroll
     */
    omit?: enrollOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: enrollInclude<ExtArgs> | null
    /**
     * Filter, which enroll to fetch.
     */
    where?: enrollWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of enrolls to fetch.
     */
    orderBy?: enrollOrderByWithRelationInput | enrollOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for enrolls.
     */
    cursor?: enrollWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` enrolls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` enrolls.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of enrolls.
     */
    distinct?: EnrollScalarFieldEnum | EnrollScalarFieldEnum[]
  }

  /**
   * enroll findFirstOrThrow
   */
  export type enrollFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the enroll
     */
    select?: enrollSelect<ExtArgs> | null
    /**
     * Omit specific fields from the enroll
     */
    omit?: enrollOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: enrollInclude<ExtArgs> | null
    /**
     * Filter, which enroll to fetch.
     */
    where?: enrollWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of enrolls to fetch.
     */
    orderBy?: enrollOrderByWithRelationInput | enrollOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for enrolls.
     */
    cursor?: enrollWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` enrolls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` enrolls.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of enrolls.
     */
    distinct?: EnrollScalarFieldEnum | EnrollScalarFieldEnum[]
  }

  /**
   * enroll findMany
   */
  export type enrollFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the enroll
     */
    select?: enrollSelect<ExtArgs> | null
    /**
     * Omit specific fields from the enroll
     */
    omit?: enrollOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: enrollInclude<ExtArgs> | null
    /**
     * Filter, which enrolls to fetch.
     */
    where?: enrollWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of enrolls to fetch.
     */
    orderBy?: enrollOrderByWithRelationInput | enrollOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing enrolls.
     */
    cursor?: enrollWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` enrolls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` enrolls.
     */
    skip?: number
    distinct?: EnrollScalarFieldEnum | EnrollScalarFieldEnum[]
  }

  /**
   * enroll create
   */
  export type enrollCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the enroll
     */
    select?: enrollSelect<ExtArgs> | null
    /**
     * Omit specific fields from the enroll
     */
    omit?: enrollOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: enrollInclude<ExtArgs> | null
    /**
     * The data needed to create a enroll.
     */
    data: XOR<enrollCreateInput, enrollUncheckedCreateInput>
  }

  /**
   * enroll createMany
   */
  export type enrollCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many enrolls.
     */
    data: enrollCreateManyInput | enrollCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * enroll createManyAndReturn
   */
  export type enrollCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the enroll
     */
    select?: enrollSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the enroll
     */
    omit?: enrollOmit<ExtArgs> | null
    /**
     * The data used to create many enrolls.
     */
    data: enrollCreateManyInput | enrollCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: enrollIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * enroll update
   */
  export type enrollUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the enroll
     */
    select?: enrollSelect<ExtArgs> | null
    /**
     * Omit specific fields from the enroll
     */
    omit?: enrollOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: enrollInclude<ExtArgs> | null
    /**
     * The data needed to update a enroll.
     */
    data: XOR<enrollUpdateInput, enrollUncheckedUpdateInput>
    /**
     * Choose, which enroll to update.
     */
    where: enrollWhereUniqueInput
  }

  /**
   * enroll updateMany
   */
  export type enrollUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update enrolls.
     */
    data: XOR<enrollUpdateManyMutationInput, enrollUncheckedUpdateManyInput>
    /**
     * Filter which enrolls to update
     */
    where?: enrollWhereInput
    /**
     * Limit how many enrolls to update.
     */
    limit?: number
  }

  /**
   * enroll updateManyAndReturn
   */
  export type enrollUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the enroll
     */
    select?: enrollSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the enroll
     */
    omit?: enrollOmit<ExtArgs> | null
    /**
     * The data used to update enrolls.
     */
    data: XOR<enrollUpdateManyMutationInput, enrollUncheckedUpdateManyInput>
    /**
     * Filter which enrolls to update
     */
    where?: enrollWhereInput
    /**
     * Limit how many enrolls to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: enrollIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * enroll upsert
   */
  export type enrollUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the enroll
     */
    select?: enrollSelect<ExtArgs> | null
    /**
     * Omit specific fields from the enroll
     */
    omit?: enrollOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: enrollInclude<ExtArgs> | null
    /**
     * The filter to search for the enroll to update in case it exists.
     */
    where: enrollWhereUniqueInput
    /**
     * In case the enroll found by the `where` argument doesn't exist, create a new enroll with this data.
     */
    create: XOR<enrollCreateInput, enrollUncheckedCreateInput>
    /**
     * In case the enroll was found with the provided `where` argument, update it with this data.
     */
    update: XOR<enrollUpdateInput, enrollUncheckedUpdateInput>
  }

  /**
   * enroll delete
   */
  export type enrollDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the enroll
     */
    select?: enrollSelect<ExtArgs> | null
    /**
     * Omit specific fields from the enroll
     */
    omit?: enrollOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: enrollInclude<ExtArgs> | null
    /**
     * Filter which enroll to delete.
     */
    where: enrollWhereUniqueInput
  }

  /**
   * enroll deleteMany
   */
  export type enrollDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which enrolls to delete
     */
    where?: enrollWhereInput
    /**
     * Limit how many enrolls to delete.
     */
    limit?: number
  }

  /**
   * enroll without action
   */
  export type enrollDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the enroll
     */
    select?: enrollSelect<ExtArgs> | null
    /**
     * Omit specific fields from the enroll
     */
    omit?: enrollOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: enrollInclude<ExtArgs> | null
  }


  /**
   * Model score
   */

  export type AggregateScore = {
    _count: ScoreCountAggregateOutputType | null
    _avg: ScoreAvgAggregateOutputType | null
    _sum: ScoreSumAggregateOutputType | null
    _min: ScoreMinAggregateOutputType | null
    _max: ScoreMaxAggregateOutputType | null
  }

  export type ScoreAvgAggregateOutputType = {
    score: number | null
    time_taken: number | null
  }

  export type ScoreSumAggregateOutputType = {
    score: number | null
    time_taken: number | null
  }

  export type ScoreMinAggregateOutputType = {
    studentId: string | null
    subdom: string | null
    score: number | null
    time_taken: number | null
  }

  export type ScoreMaxAggregateOutputType = {
    studentId: string | null
    subdom: string | null
    score: number | null
    time_taken: number | null
  }

  export type ScoreCountAggregateOutputType = {
    studentId: number
    subdom: number
    score: number
    time_taken: number
    _all: number
  }


  export type ScoreAvgAggregateInputType = {
    score?: true
    time_taken?: true
  }

  export type ScoreSumAggregateInputType = {
    score?: true
    time_taken?: true
  }

  export type ScoreMinAggregateInputType = {
    studentId?: true
    subdom?: true
    score?: true
    time_taken?: true
  }

  export type ScoreMaxAggregateInputType = {
    studentId?: true
    subdom?: true
    score?: true
    time_taken?: true
  }

  export type ScoreCountAggregateInputType = {
    studentId?: true
    subdom?: true
    score?: true
    time_taken?: true
    _all?: true
  }

  export type ScoreAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which score to aggregate.
     */
    where?: scoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of scores to fetch.
     */
    orderBy?: scoreOrderByWithRelationInput | scoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: scoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` scores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` scores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned scores
    **/
    _count?: true | ScoreCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ScoreAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ScoreSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ScoreMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ScoreMaxAggregateInputType
  }

  export type GetScoreAggregateType<T extends ScoreAggregateArgs> = {
        [P in keyof T & keyof AggregateScore]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateScore[P]>
      : GetScalarType<T[P], AggregateScore[P]>
  }




  export type scoreGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: scoreWhereInput
    orderBy?: scoreOrderByWithAggregationInput | scoreOrderByWithAggregationInput[]
    by: ScoreScalarFieldEnum[] | ScoreScalarFieldEnum
    having?: scoreScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ScoreCountAggregateInputType | true
    _avg?: ScoreAvgAggregateInputType
    _sum?: ScoreSumAggregateInputType
    _min?: ScoreMinAggregateInputType
    _max?: ScoreMaxAggregateInputType
  }

  export type ScoreGroupByOutputType = {
    studentId: string
    subdom: string
    score: number
    time_taken: number
    _count: ScoreCountAggregateOutputType | null
    _avg: ScoreAvgAggregateOutputType | null
    _sum: ScoreSumAggregateOutputType | null
    _min: ScoreMinAggregateOutputType | null
    _max: ScoreMaxAggregateOutputType | null
  }

  type GetScoreGroupByPayload<T extends scoreGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ScoreGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ScoreGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ScoreGroupByOutputType[P]>
            : GetScalarType<T[P], ScoreGroupByOutputType[P]>
        }
      >
    >


  export type scoreSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    studentId?: boolean
    subdom?: boolean
    score?: boolean
    time_taken?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    subdomain?: boolean | subDomainDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["score"]>

  export type scoreSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    studentId?: boolean
    subdom?: boolean
    score?: boolean
    time_taken?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    subdomain?: boolean | subDomainDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["score"]>

  export type scoreSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    studentId?: boolean
    subdom?: boolean
    score?: boolean
    time_taken?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    subdomain?: boolean | subDomainDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["score"]>

  export type scoreSelectScalar = {
    studentId?: boolean
    subdom?: boolean
    score?: boolean
    time_taken?: boolean
  }

  export type scoreOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"studentId" | "subdom" | "score" | "time_taken", ExtArgs["result"]["score"]>
  export type scoreInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    subdomain?: boolean | subDomainDefaultArgs<ExtArgs>
  }
  export type scoreIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    subdomain?: boolean | subDomainDefaultArgs<ExtArgs>
  }
  export type scoreIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    subdomain?: boolean | subDomainDefaultArgs<ExtArgs>
  }

  export type $scorePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "score"
    objects: {
      student: Prisma.$StudentPayload<ExtArgs>
      subdomain: Prisma.$subDomainPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      studentId: string
      subdom: string
      score: number
      time_taken: number
    }, ExtArgs["result"]["score"]>
    composites: {}
  }

  type scoreGetPayload<S extends boolean | null | undefined | scoreDefaultArgs> = $Result.GetResult<Prisma.$scorePayload, S>

  type scoreCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<scoreFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ScoreCountAggregateInputType | true
    }

  export interface scoreDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['score'], meta: { name: 'score' } }
    /**
     * Find zero or one Score that matches the filter.
     * @param {scoreFindUniqueArgs} args - Arguments to find a Score
     * @example
     * // Get one Score
     * const score = await prisma.score.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends scoreFindUniqueArgs>(args: SelectSubset<T, scoreFindUniqueArgs<ExtArgs>>): Prisma__scoreClient<$Result.GetResult<Prisma.$scorePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Score that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {scoreFindUniqueOrThrowArgs} args - Arguments to find a Score
     * @example
     * // Get one Score
     * const score = await prisma.score.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends scoreFindUniqueOrThrowArgs>(args: SelectSubset<T, scoreFindUniqueOrThrowArgs<ExtArgs>>): Prisma__scoreClient<$Result.GetResult<Prisma.$scorePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Score that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {scoreFindFirstArgs} args - Arguments to find a Score
     * @example
     * // Get one Score
     * const score = await prisma.score.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends scoreFindFirstArgs>(args?: SelectSubset<T, scoreFindFirstArgs<ExtArgs>>): Prisma__scoreClient<$Result.GetResult<Prisma.$scorePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Score that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {scoreFindFirstOrThrowArgs} args - Arguments to find a Score
     * @example
     * // Get one Score
     * const score = await prisma.score.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends scoreFindFirstOrThrowArgs>(args?: SelectSubset<T, scoreFindFirstOrThrowArgs<ExtArgs>>): Prisma__scoreClient<$Result.GetResult<Prisma.$scorePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Scores that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {scoreFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Scores
     * const scores = await prisma.score.findMany()
     * 
     * // Get first 10 Scores
     * const scores = await prisma.score.findMany({ take: 10 })
     * 
     * // Only select the `studentId`
     * const scoreWithStudentIdOnly = await prisma.score.findMany({ select: { studentId: true } })
     * 
     */
    findMany<T extends scoreFindManyArgs>(args?: SelectSubset<T, scoreFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$scorePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Score.
     * @param {scoreCreateArgs} args - Arguments to create a Score.
     * @example
     * // Create one Score
     * const Score = await prisma.score.create({
     *   data: {
     *     // ... data to create a Score
     *   }
     * })
     * 
     */
    create<T extends scoreCreateArgs>(args: SelectSubset<T, scoreCreateArgs<ExtArgs>>): Prisma__scoreClient<$Result.GetResult<Prisma.$scorePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Scores.
     * @param {scoreCreateManyArgs} args - Arguments to create many Scores.
     * @example
     * // Create many Scores
     * const score = await prisma.score.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends scoreCreateManyArgs>(args?: SelectSubset<T, scoreCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Scores and returns the data saved in the database.
     * @param {scoreCreateManyAndReturnArgs} args - Arguments to create many Scores.
     * @example
     * // Create many Scores
     * const score = await prisma.score.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Scores and only return the `studentId`
     * const scoreWithStudentIdOnly = await prisma.score.createManyAndReturn({
     *   select: { studentId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends scoreCreateManyAndReturnArgs>(args?: SelectSubset<T, scoreCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$scorePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Score.
     * @param {scoreDeleteArgs} args - Arguments to delete one Score.
     * @example
     * // Delete one Score
     * const Score = await prisma.score.delete({
     *   where: {
     *     // ... filter to delete one Score
     *   }
     * })
     * 
     */
    delete<T extends scoreDeleteArgs>(args: SelectSubset<T, scoreDeleteArgs<ExtArgs>>): Prisma__scoreClient<$Result.GetResult<Prisma.$scorePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Score.
     * @param {scoreUpdateArgs} args - Arguments to update one Score.
     * @example
     * // Update one Score
     * const score = await prisma.score.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends scoreUpdateArgs>(args: SelectSubset<T, scoreUpdateArgs<ExtArgs>>): Prisma__scoreClient<$Result.GetResult<Prisma.$scorePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Scores.
     * @param {scoreDeleteManyArgs} args - Arguments to filter Scores to delete.
     * @example
     * // Delete a few Scores
     * const { count } = await prisma.score.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends scoreDeleteManyArgs>(args?: SelectSubset<T, scoreDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Scores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {scoreUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Scores
     * const score = await prisma.score.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends scoreUpdateManyArgs>(args: SelectSubset<T, scoreUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Scores and returns the data updated in the database.
     * @param {scoreUpdateManyAndReturnArgs} args - Arguments to update many Scores.
     * @example
     * // Update many Scores
     * const score = await prisma.score.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Scores and only return the `studentId`
     * const scoreWithStudentIdOnly = await prisma.score.updateManyAndReturn({
     *   select: { studentId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends scoreUpdateManyAndReturnArgs>(args: SelectSubset<T, scoreUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$scorePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Score.
     * @param {scoreUpsertArgs} args - Arguments to update or create a Score.
     * @example
     * // Update or create a Score
     * const score = await prisma.score.upsert({
     *   create: {
     *     // ... data to create a Score
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Score we want to update
     *   }
     * })
     */
    upsert<T extends scoreUpsertArgs>(args: SelectSubset<T, scoreUpsertArgs<ExtArgs>>): Prisma__scoreClient<$Result.GetResult<Prisma.$scorePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Scores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {scoreCountArgs} args - Arguments to filter Scores to count.
     * @example
     * // Count the number of Scores
     * const count = await prisma.score.count({
     *   where: {
     *     // ... the filter for the Scores we want to count
     *   }
     * })
    **/
    count<T extends scoreCountArgs>(
      args?: Subset<T, scoreCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ScoreCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Score.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScoreAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ScoreAggregateArgs>(args: Subset<T, ScoreAggregateArgs>): Prisma.PrismaPromise<GetScoreAggregateType<T>>

    /**
     * Group by Score.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {scoreGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends scoreGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: scoreGroupByArgs['orderBy'] }
        : { orderBy?: scoreGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, scoreGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetScoreGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the score model
   */
  readonly fields: scoreFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for score.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__scoreClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends StudentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentDefaultArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    subdomain<T extends subDomainDefaultArgs<ExtArgs> = {}>(args?: Subset<T, subDomainDefaultArgs<ExtArgs>>): Prisma__subDomainClient<$Result.GetResult<Prisma.$subDomainPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the score model
   */
  interface scoreFieldRefs {
    readonly studentId: FieldRef<"score", 'String'>
    readonly subdom: FieldRef<"score", 'String'>
    readonly score: FieldRef<"score", 'Float'>
    readonly time_taken: FieldRef<"score", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * score findUnique
   */
  export type scoreFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the score
     */
    select?: scoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the score
     */
    omit?: scoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: scoreInclude<ExtArgs> | null
    /**
     * Filter, which score to fetch.
     */
    where: scoreWhereUniqueInput
  }

  /**
   * score findUniqueOrThrow
   */
  export type scoreFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the score
     */
    select?: scoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the score
     */
    omit?: scoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: scoreInclude<ExtArgs> | null
    /**
     * Filter, which score to fetch.
     */
    where: scoreWhereUniqueInput
  }

  /**
   * score findFirst
   */
  export type scoreFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the score
     */
    select?: scoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the score
     */
    omit?: scoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: scoreInclude<ExtArgs> | null
    /**
     * Filter, which score to fetch.
     */
    where?: scoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of scores to fetch.
     */
    orderBy?: scoreOrderByWithRelationInput | scoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for scores.
     */
    cursor?: scoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` scores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` scores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of scores.
     */
    distinct?: ScoreScalarFieldEnum | ScoreScalarFieldEnum[]
  }

  /**
   * score findFirstOrThrow
   */
  export type scoreFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the score
     */
    select?: scoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the score
     */
    omit?: scoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: scoreInclude<ExtArgs> | null
    /**
     * Filter, which score to fetch.
     */
    where?: scoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of scores to fetch.
     */
    orderBy?: scoreOrderByWithRelationInput | scoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for scores.
     */
    cursor?: scoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` scores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` scores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of scores.
     */
    distinct?: ScoreScalarFieldEnum | ScoreScalarFieldEnum[]
  }

  /**
   * score findMany
   */
  export type scoreFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the score
     */
    select?: scoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the score
     */
    omit?: scoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: scoreInclude<ExtArgs> | null
    /**
     * Filter, which scores to fetch.
     */
    where?: scoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of scores to fetch.
     */
    orderBy?: scoreOrderByWithRelationInput | scoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing scores.
     */
    cursor?: scoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` scores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` scores.
     */
    skip?: number
    distinct?: ScoreScalarFieldEnum | ScoreScalarFieldEnum[]
  }

  /**
   * score create
   */
  export type scoreCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the score
     */
    select?: scoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the score
     */
    omit?: scoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: scoreInclude<ExtArgs> | null
    /**
     * The data needed to create a score.
     */
    data: XOR<scoreCreateInput, scoreUncheckedCreateInput>
  }

  /**
   * score createMany
   */
  export type scoreCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many scores.
     */
    data: scoreCreateManyInput | scoreCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * score createManyAndReturn
   */
  export type scoreCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the score
     */
    select?: scoreSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the score
     */
    omit?: scoreOmit<ExtArgs> | null
    /**
     * The data used to create many scores.
     */
    data: scoreCreateManyInput | scoreCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: scoreIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * score update
   */
  export type scoreUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the score
     */
    select?: scoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the score
     */
    omit?: scoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: scoreInclude<ExtArgs> | null
    /**
     * The data needed to update a score.
     */
    data: XOR<scoreUpdateInput, scoreUncheckedUpdateInput>
    /**
     * Choose, which score to update.
     */
    where: scoreWhereUniqueInput
  }

  /**
   * score updateMany
   */
  export type scoreUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update scores.
     */
    data: XOR<scoreUpdateManyMutationInput, scoreUncheckedUpdateManyInput>
    /**
     * Filter which scores to update
     */
    where?: scoreWhereInput
    /**
     * Limit how many scores to update.
     */
    limit?: number
  }

  /**
   * score updateManyAndReturn
   */
  export type scoreUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the score
     */
    select?: scoreSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the score
     */
    omit?: scoreOmit<ExtArgs> | null
    /**
     * The data used to update scores.
     */
    data: XOR<scoreUpdateManyMutationInput, scoreUncheckedUpdateManyInput>
    /**
     * Filter which scores to update
     */
    where?: scoreWhereInput
    /**
     * Limit how many scores to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: scoreIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * score upsert
   */
  export type scoreUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the score
     */
    select?: scoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the score
     */
    omit?: scoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: scoreInclude<ExtArgs> | null
    /**
     * The filter to search for the score to update in case it exists.
     */
    where: scoreWhereUniqueInput
    /**
     * In case the score found by the `where` argument doesn't exist, create a new score with this data.
     */
    create: XOR<scoreCreateInput, scoreUncheckedCreateInput>
    /**
     * In case the score was found with the provided `where` argument, update it with this data.
     */
    update: XOR<scoreUpdateInput, scoreUncheckedUpdateInput>
  }

  /**
   * score delete
   */
  export type scoreDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the score
     */
    select?: scoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the score
     */
    omit?: scoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: scoreInclude<ExtArgs> | null
    /**
     * Filter which score to delete.
     */
    where: scoreWhereUniqueInput
  }

  /**
   * score deleteMany
   */
  export type scoreDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which scores to delete
     */
    where?: scoreWhereInput
    /**
     * Limit how many scores to delete.
     */
    limit?: number
  }

  /**
   * score without action
   */
  export type scoreDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the score
     */
    select?: scoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the score
     */
    omit?: scoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: scoreInclude<ExtArgs> | null
  }


  /**
   * Model review
   */

  export type AggregateReview = {
    _count: ReviewCountAggregateOutputType | null
    _avg: ReviewAvgAggregateOutputType | null
    _sum: ReviewSumAggregateOutputType | null
    _min: ReviewMinAggregateOutputType | null
    _max: ReviewMaxAggregateOutputType | null
  }

  export type ReviewAvgAggregateOutputType = {
    rating: number | null
  }

  export type ReviewSumAggregateOutputType = {
    rating: number | null
  }

  export type ReviewMinAggregateOutputType = {
    studentId: string | null
    courseId: string | null
    comment: string | null
    rating: number | null
  }

  export type ReviewMaxAggregateOutputType = {
    studentId: string | null
    courseId: string | null
    comment: string | null
    rating: number | null
  }

  export type ReviewCountAggregateOutputType = {
    studentId: number
    courseId: number
    comment: number
    rating: number
    _all: number
  }


  export type ReviewAvgAggregateInputType = {
    rating?: true
  }

  export type ReviewSumAggregateInputType = {
    rating?: true
  }

  export type ReviewMinAggregateInputType = {
    studentId?: true
    courseId?: true
    comment?: true
    rating?: true
  }

  export type ReviewMaxAggregateInputType = {
    studentId?: true
    courseId?: true
    comment?: true
    rating?: true
  }

  export type ReviewCountAggregateInputType = {
    studentId?: true
    courseId?: true
    comment?: true
    rating?: true
    _all?: true
  }

  export type ReviewAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which review to aggregate.
     */
    where?: reviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of reviews to fetch.
     */
    orderBy?: reviewOrderByWithRelationInput | reviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: reviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned reviews
    **/
    _count?: true | ReviewCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReviewAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReviewSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReviewMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReviewMaxAggregateInputType
  }

  export type GetReviewAggregateType<T extends ReviewAggregateArgs> = {
        [P in keyof T & keyof AggregateReview]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReview[P]>
      : GetScalarType<T[P], AggregateReview[P]>
  }




  export type reviewGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: reviewWhereInput
    orderBy?: reviewOrderByWithAggregationInput | reviewOrderByWithAggregationInput[]
    by: ReviewScalarFieldEnum[] | ReviewScalarFieldEnum
    having?: reviewScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReviewCountAggregateInputType | true
    _avg?: ReviewAvgAggregateInputType
    _sum?: ReviewSumAggregateInputType
    _min?: ReviewMinAggregateInputType
    _max?: ReviewMaxAggregateInputType
  }

  export type ReviewGroupByOutputType = {
    studentId: string
    courseId: string
    comment: string
    rating: number
    _count: ReviewCountAggregateOutputType | null
    _avg: ReviewAvgAggregateOutputType | null
    _sum: ReviewSumAggregateOutputType | null
    _min: ReviewMinAggregateOutputType | null
    _max: ReviewMaxAggregateOutputType | null
  }

  type GetReviewGroupByPayload<T extends reviewGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReviewGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReviewGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReviewGroupByOutputType[P]>
            : GetScalarType<T[P], ReviewGroupByOutputType[P]>
        }
      >
    >


  export type reviewSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    studentId?: boolean
    courseId?: boolean
    comment?: boolean
    rating?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["review"]>

  export type reviewSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    studentId?: boolean
    courseId?: boolean
    comment?: boolean
    rating?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["review"]>

  export type reviewSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    studentId?: boolean
    courseId?: boolean
    comment?: boolean
    rating?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["review"]>

  export type reviewSelectScalar = {
    studentId?: boolean
    courseId?: boolean
    comment?: boolean
    rating?: boolean
  }

  export type reviewOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"studentId" | "courseId" | "comment" | "rating", ExtArgs["result"]["review"]>
  export type reviewInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }
  export type reviewIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }
  export type reviewIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }

  export type $reviewPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "review"
    objects: {
      student: Prisma.$StudentPayload<ExtArgs>
      course: Prisma.$CoursePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      studentId: string
      courseId: string
      comment: string
      rating: number
    }, ExtArgs["result"]["review"]>
    composites: {}
  }

  type reviewGetPayload<S extends boolean | null | undefined | reviewDefaultArgs> = $Result.GetResult<Prisma.$reviewPayload, S>

  type reviewCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<reviewFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReviewCountAggregateInputType | true
    }

  export interface reviewDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['review'], meta: { name: 'review' } }
    /**
     * Find zero or one Review that matches the filter.
     * @param {reviewFindUniqueArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends reviewFindUniqueArgs>(args: SelectSubset<T, reviewFindUniqueArgs<ExtArgs>>): Prisma__reviewClient<$Result.GetResult<Prisma.$reviewPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Review that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {reviewFindUniqueOrThrowArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends reviewFindUniqueOrThrowArgs>(args: SelectSubset<T, reviewFindUniqueOrThrowArgs<ExtArgs>>): Prisma__reviewClient<$Result.GetResult<Prisma.$reviewPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Review that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reviewFindFirstArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends reviewFindFirstArgs>(args?: SelectSubset<T, reviewFindFirstArgs<ExtArgs>>): Prisma__reviewClient<$Result.GetResult<Prisma.$reviewPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Review that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reviewFindFirstOrThrowArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends reviewFindFirstOrThrowArgs>(args?: SelectSubset<T, reviewFindFirstOrThrowArgs<ExtArgs>>): Prisma__reviewClient<$Result.GetResult<Prisma.$reviewPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Reviews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reviewFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reviews
     * const reviews = await prisma.review.findMany()
     * 
     * // Get first 10 Reviews
     * const reviews = await prisma.review.findMany({ take: 10 })
     * 
     * // Only select the `studentId`
     * const reviewWithStudentIdOnly = await prisma.review.findMany({ select: { studentId: true } })
     * 
     */
    findMany<T extends reviewFindManyArgs>(args?: SelectSubset<T, reviewFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$reviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Review.
     * @param {reviewCreateArgs} args - Arguments to create a Review.
     * @example
     * // Create one Review
     * const Review = await prisma.review.create({
     *   data: {
     *     // ... data to create a Review
     *   }
     * })
     * 
     */
    create<T extends reviewCreateArgs>(args: SelectSubset<T, reviewCreateArgs<ExtArgs>>): Prisma__reviewClient<$Result.GetResult<Prisma.$reviewPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Reviews.
     * @param {reviewCreateManyArgs} args - Arguments to create many Reviews.
     * @example
     * // Create many Reviews
     * const review = await prisma.review.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends reviewCreateManyArgs>(args?: SelectSubset<T, reviewCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Reviews and returns the data saved in the database.
     * @param {reviewCreateManyAndReturnArgs} args - Arguments to create many Reviews.
     * @example
     * // Create many Reviews
     * const review = await prisma.review.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Reviews and only return the `studentId`
     * const reviewWithStudentIdOnly = await prisma.review.createManyAndReturn({
     *   select: { studentId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends reviewCreateManyAndReturnArgs>(args?: SelectSubset<T, reviewCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$reviewPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Review.
     * @param {reviewDeleteArgs} args - Arguments to delete one Review.
     * @example
     * // Delete one Review
     * const Review = await prisma.review.delete({
     *   where: {
     *     // ... filter to delete one Review
     *   }
     * })
     * 
     */
    delete<T extends reviewDeleteArgs>(args: SelectSubset<T, reviewDeleteArgs<ExtArgs>>): Prisma__reviewClient<$Result.GetResult<Prisma.$reviewPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Review.
     * @param {reviewUpdateArgs} args - Arguments to update one Review.
     * @example
     * // Update one Review
     * const review = await prisma.review.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends reviewUpdateArgs>(args: SelectSubset<T, reviewUpdateArgs<ExtArgs>>): Prisma__reviewClient<$Result.GetResult<Prisma.$reviewPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Reviews.
     * @param {reviewDeleteManyArgs} args - Arguments to filter Reviews to delete.
     * @example
     * // Delete a few Reviews
     * const { count } = await prisma.review.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends reviewDeleteManyArgs>(args?: SelectSubset<T, reviewDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reviewUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reviews
     * const review = await prisma.review.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends reviewUpdateManyArgs>(args: SelectSubset<T, reviewUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reviews and returns the data updated in the database.
     * @param {reviewUpdateManyAndReturnArgs} args - Arguments to update many Reviews.
     * @example
     * // Update many Reviews
     * const review = await prisma.review.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Reviews and only return the `studentId`
     * const reviewWithStudentIdOnly = await prisma.review.updateManyAndReturn({
     *   select: { studentId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends reviewUpdateManyAndReturnArgs>(args: SelectSubset<T, reviewUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$reviewPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Review.
     * @param {reviewUpsertArgs} args - Arguments to update or create a Review.
     * @example
     * // Update or create a Review
     * const review = await prisma.review.upsert({
     *   create: {
     *     // ... data to create a Review
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Review we want to update
     *   }
     * })
     */
    upsert<T extends reviewUpsertArgs>(args: SelectSubset<T, reviewUpsertArgs<ExtArgs>>): Prisma__reviewClient<$Result.GetResult<Prisma.$reviewPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reviewCountArgs} args - Arguments to filter Reviews to count.
     * @example
     * // Count the number of Reviews
     * const count = await prisma.review.count({
     *   where: {
     *     // ... the filter for the Reviews we want to count
     *   }
     * })
    **/
    count<T extends reviewCountArgs>(
      args?: Subset<T, reviewCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReviewCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Review.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReviewAggregateArgs>(args: Subset<T, ReviewAggregateArgs>): Prisma.PrismaPromise<GetReviewAggregateType<T>>

    /**
     * Group by Review.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reviewGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends reviewGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: reviewGroupByArgs['orderBy'] }
        : { orderBy?: reviewGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, reviewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReviewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the review model
   */
  readonly fields: reviewFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for review.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__reviewClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends StudentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentDefaultArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    course<T extends CourseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CourseDefaultArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the review model
   */
  interface reviewFieldRefs {
    readonly studentId: FieldRef<"review", 'String'>
    readonly courseId: FieldRef<"review", 'String'>
    readonly comment: FieldRef<"review", 'String'>
    readonly rating: FieldRef<"review", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * review findUnique
   */
  export type reviewFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the review
     */
    select?: reviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the review
     */
    omit?: reviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewInclude<ExtArgs> | null
    /**
     * Filter, which review to fetch.
     */
    where: reviewWhereUniqueInput
  }

  /**
   * review findUniqueOrThrow
   */
  export type reviewFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the review
     */
    select?: reviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the review
     */
    omit?: reviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewInclude<ExtArgs> | null
    /**
     * Filter, which review to fetch.
     */
    where: reviewWhereUniqueInput
  }

  /**
   * review findFirst
   */
  export type reviewFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the review
     */
    select?: reviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the review
     */
    omit?: reviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewInclude<ExtArgs> | null
    /**
     * Filter, which review to fetch.
     */
    where?: reviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of reviews to fetch.
     */
    orderBy?: reviewOrderByWithRelationInput | reviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for reviews.
     */
    cursor?: reviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of reviews.
     */
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * review findFirstOrThrow
   */
  export type reviewFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the review
     */
    select?: reviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the review
     */
    omit?: reviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewInclude<ExtArgs> | null
    /**
     * Filter, which review to fetch.
     */
    where?: reviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of reviews to fetch.
     */
    orderBy?: reviewOrderByWithRelationInput | reviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for reviews.
     */
    cursor?: reviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of reviews.
     */
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * review findMany
   */
  export type reviewFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the review
     */
    select?: reviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the review
     */
    omit?: reviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewInclude<ExtArgs> | null
    /**
     * Filter, which reviews to fetch.
     */
    where?: reviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of reviews to fetch.
     */
    orderBy?: reviewOrderByWithRelationInput | reviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing reviews.
     */
    cursor?: reviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` reviews.
     */
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * review create
   */
  export type reviewCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the review
     */
    select?: reviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the review
     */
    omit?: reviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewInclude<ExtArgs> | null
    /**
     * The data needed to create a review.
     */
    data: XOR<reviewCreateInput, reviewUncheckedCreateInput>
  }

  /**
   * review createMany
   */
  export type reviewCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many reviews.
     */
    data: reviewCreateManyInput | reviewCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * review createManyAndReturn
   */
  export type reviewCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the review
     */
    select?: reviewSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the review
     */
    omit?: reviewOmit<ExtArgs> | null
    /**
     * The data used to create many reviews.
     */
    data: reviewCreateManyInput | reviewCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * review update
   */
  export type reviewUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the review
     */
    select?: reviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the review
     */
    omit?: reviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewInclude<ExtArgs> | null
    /**
     * The data needed to update a review.
     */
    data: XOR<reviewUpdateInput, reviewUncheckedUpdateInput>
    /**
     * Choose, which review to update.
     */
    where: reviewWhereUniqueInput
  }

  /**
   * review updateMany
   */
  export type reviewUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update reviews.
     */
    data: XOR<reviewUpdateManyMutationInput, reviewUncheckedUpdateManyInput>
    /**
     * Filter which reviews to update
     */
    where?: reviewWhereInput
    /**
     * Limit how many reviews to update.
     */
    limit?: number
  }

  /**
   * review updateManyAndReturn
   */
  export type reviewUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the review
     */
    select?: reviewSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the review
     */
    omit?: reviewOmit<ExtArgs> | null
    /**
     * The data used to update reviews.
     */
    data: XOR<reviewUpdateManyMutationInput, reviewUncheckedUpdateManyInput>
    /**
     * Filter which reviews to update
     */
    where?: reviewWhereInput
    /**
     * Limit how many reviews to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * review upsert
   */
  export type reviewUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the review
     */
    select?: reviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the review
     */
    omit?: reviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewInclude<ExtArgs> | null
    /**
     * The filter to search for the review to update in case it exists.
     */
    where: reviewWhereUniqueInput
    /**
     * In case the review found by the `where` argument doesn't exist, create a new review with this data.
     */
    create: XOR<reviewCreateInput, reviewUncheckedCreateInput>
    /**
     * In case the review was found with the provided `where` argument, update it with this data.
     */
    update: XOR<reviewUpdateInput, reviewUncheckedUpdateInput>
  }

  /**
   * review delete
   */
  export type reviewDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the review
     */
    select?: reviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the review
     */
    omit?: reviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewInclude<ExtArgs> | null
    /**
     * Filter which review to delete.
     */
    where: reviewWhereUniqueInput
  }

  /**
   * review deleteMany
   */
  export type reviewDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which reviews to delete
     */
    where?: reviewWhereInput
    /**
     * Limit how many reviews to delete.
     */
    limit?: number
  }

  /**
   * review without action
   */
  export type reviewDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the review
     */
    select?: reviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the review
     */
    omit?: reviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const StudentScalarFieldEnum: {
    std_id: 'std_id',
    std_name: 'std_name',
    std_lastname: 'std_lastname',
    std_email: 'std_email',
    std_pfp: 'std_pfp',
    supabaseId: 'supabaseId',
    std_streak: 'std_streak',
    std_last_activeDate: 'std_last_activeDate',
    std_level: 'std_level'
  };

  export type StudentScalarFieldEnum = (typeof StudentScalarFieldEnum)[keyof typeof StudentScalarFieldEnum]


  export const TeacherScalarFieldEnum: {
    tchr_id: 'tchr_id',
    tchr_name: 'tchr_name',
    tchr_lastname: 'tchr_lastname',
    tchr_email: 'tchr_email',
    tchr_pfp: 'tchr_pfp',
    tchr_password: 'tchr_password'
  };

  export type TeacherScalarFieldEnum = (typeof TeacherScalarFieldEnum)[keyof typeof TeacherScalarFieldEnum]


  export const DomainScalarFieldEnum: {
    dmn_id: 'dmn_id',
    dmn_title: 'dmn_title',
    dmn_dscrptn: 'dmn_dscrptn',
    dmn_duration: 'dmn_duration'
  };

  export type DomainScalarFieldEnum = (typeof DomainScalarFieldEnum)[keyof typeof DomainScalarFieldEnum]


  export const SubDomainScalarFieldEnum: {
    subdom_id: 'subdom_id',
    subdom_title: 'subdom_title',
    domainId: 'domainId',
    parentId: 'parentId'
  };

  export type SubDomainScalarFieldEnum = (typeof SubDomainScalarFieldEnum)[keyof typeof SubDomainScalarFieldEnum]


  export const CourseScalarFieldEnum: {
    crs_id: 'crs_id',
    crs_title: 'crs_title',
    crs_type: 'crs_type',
    vd_link: 'vd_link',
    pdf_file: 'pdf_file',
    article_content: 'article_content',
    subdom: 'subdom',
    teacherId: 'teacherId'
  };

  export type CourseScalarFieldEnum = (typeof CourseScalarFieldEnum)[keyof typeof CourseScalarFieldEnum]


  export const QuizScalarFieldEnum: {
    qst_id: 'qst_id',
    question: 'question',
    difficulty: 'difficulty',
    courseId: 'courseId'
  };

  export type QuizScalarFieldEnum = (typeof QuizScalarFieldEnum)[keyof typeof QuizScalarFieldEnum]


  export const Q_responseScalarFieldEnum: {
    rspns_id: 'rspns_id',
    response: 'response',
    isCorrect: 'isCorrect',
    quizId: 'quizId'
  };

  export type Q_responseScalarFieldEnum = (typeof Q_responseScalarFieldEnum)[keyof typeof Q_responseScalarFieldEnum]


  export const EnrollScalarFieldEnum: {
    studentId: 'studentId',
    domainId: 'domainId',
    progress: 'progress'
  };

  export type EnrollScalarFieldEnum = (typeof EnrollScalarFieldEnum)[keyof typeof EnrollScalarFieldEnum]


  export const ScoreScalarFieldEnum: {
    studentId: 'studentId',
    subdom: 'subdom',
    score: 'score',
    time_taken: 'time_taken'
  };

  export type ScoreScalarFieldEnum = (typeof ScoreScalarFieldEnum)[keyof typeof ScoreScalarFieldEnum]


  export const ReviewScalarFieldEnum: {
    studentId: 'studentId',
    courseId: 'courseId',
    comment: 'comment',
    rating: 'rating'
  };

  export type ReviewScalarFieldEnum = (typeof ReviewScalarFieldEnum)[keyof typeof ReviewScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'level'
   */
  export type EnumlevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'level'>
    


  /**
   * Reference to a field of type 'level[]'
   */
  export type ListEnumlevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'level[]'>
    


  /**
   * Reference to a field of type 'crs_type'
   */
  export type Enumcrs_typeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'crs_type'>
    


  /**
   * Reference to a field of type 'crs_type[]'
   */
  export type ListEnumcrs_typeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'crs_type[]'>
    


  /**
   * Reference to a field of type 'difficulty'
   */
  export type EnumdifficultyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'difficulty'>
    


  /**
   * Reference to a field of type 'difficulty[]'
   */
  export type ListEnumdifficultyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'difficulty[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type StudentWhereInput = {
    AND?: StudentWhereInput | StudentWhereInput[]
    OR?: StudentWhereInput[]
    NOT?: StudentWhereInput | StudentWhereInput[]
    std_id?: StringFilter<"Student"> | string
    std_name?: StringFilter<"Student"> | string
    std_lastname?: StringFilter<"Student"> | string
    std_email?: StringFilter<"Student"> | string
    std_pfp?: StringNullableFilter<"Student"> | string | null
    supabaseId?: StringFilter<"Student"> | string
    std_streak?: IntFilter<"Student"> | number
    std_last_activeDate?: DateTimeFilter<"Student"> | Date | string
    std_level?: EnumlevelFilter<"Student"> | $Enums.level
    enroll?: EnrollListRelationFilter
    score?: ScoreListRelationFilter
    review?: ReviewListRelationFilter
  }

  export type StudentOrderByWithRelationInput = {
    std_id?: SortOrder
    std_name?: SortOrder
    std_lastname?: SortOrder
    std_email?: SortOrder
    std_pfp?: SortOrderInput | SortOrder
    supabaseId?: SortOrder
    std_streak?: SortOrder
    std_last_activeDate?: SortOrder
    std_level?: SortOrder
    enroll?: enrollOrderByRelationAggregateInput
    score?: scoreOrderByRelationAggregateInput
    review?: reviewOrderByRelationAggregateInput
  }

  export type StudentWhereUniqueInput = Prisma.AtLeast<{
    std_id?: string
    std_email?: string
    supabaseId?: string
    AND?: StudentWhereInput | StudentWhereInput[]
    OR?: StudentWhereInput[]
    NOT?: StudentWhereInput | StudentWhereInput[]
    std_name?: StringFilter<"Student"> | string
    std_lastname?: StringFilter<"Student"> | string
    std_pfp?: StringNullableFilter<"Student"> | string | null
    std_streak?: IntFilter<"Student"> | number
    std_last_activeDate?: DateTimeFilter<"Student"> | Date | string
    std_level?: EnumlevelFilter<"Student"> | $Enums.level
    enroll?: EnrollListRelationFilter
    score?: ScoreListRelationFilter
    review?: ReviewListRelationFilter
  }, "std_id" | "std_email" | "supabaseId">

  export type StudentOrderByWithAggregationInput = {
    std_id?: SortOrder
    std_name?: SortOrder
    std_lastname?: SortOrder
    std_email?: SortOrder
    std_pfp?: SortOrderInput | SortOrder
    supabaseId?: SortOrder
    std_streak?: SortOrder
    std_last_activeDate?: SortOrder
    std_level?: SortOrder
    _count?: StudentCountOrderByAggregateInput
    _avg?: StudentAvgOrderByAggregateInput
    _max?: StudentMaxOrderByAggregateInput
    _min?: StudentMinOrderByAggregateInput
    _sum?: StudentSumOrderByAggregateInput
  }

  export type StudentScalarWhereWithAggregatesInput = {
    AND?: StudentScalarWhereWithAggregatesInput | StudentScalarWhereWithAggregatesInput[]
    OR?: StudentScalarWhereWithAggregatesInput[]
    NOT?: StudentScalarWhereWithAggregatesInput | StudentScalarWhereWithAggregatesInput[]
    std_id?: StringWithAggregatesFilter<"Student"> | string
    std_name?: StringWithAggregatesFilter<"Student"> | string
    std_lastname?: StringWithAggregatesFilter<"Student"> | string
    std_email?: StringWithAggregatesFilter<"Student"> | string
    std_pfp?: StringNullableWithAggregatesFilter<"Student"> | string | null
    supabaseId?: StringWithAggregatesFilter<"Student"> | string
    std_streak?: IntWithAggregatesFilter<"Student"> | number
    std_last_activeDate?: DateTimeWithAggregatesFilter<"Student"> | Date | string
    std_level?: EnumlevelWithAggregatesFilter<"Student"> | $Enums.level
  }

  export type TeacherWhereInput = {
    AND?: TeacherWhereInput | TeacherWhereInput[]
    OR?: TeacherWhereInput[]
    NOT?: TeacherWhereInput | TeacherWhereInput[]
    tchr_id?: StringFilter<"Teacher"> | string
    tchr_name?: StringFilter<"Teacher"> | string
    tchr_lastname?: StringFilter<"Teacher"> | string
    tchr_email?: StringFilter<"Teacher"> | string
    tchr_pfp?: StringNullableFilter<"Teacher"> | string | null
    tchr_password?: StringFilter<"Teacher"> | string
    courses?: CourseListRelationFilter
  }

  export type TeacherOrderByWithRelationInput = {
    tchr_id?: SortOrder
    tchr_name?: SortOrder
    tchr_lastname?: SortOrder
    tchr_email?: SortOrder
    tchr_pfp?: SortOrderInput | SortOrder
    tchr_password?: SortOrder
    courses?: CourseOrderByRelationAggregateInput
  }

  export type TeacherWhereUniqueInput = Prisma.AtLeast<{
    tchr_id?: string
    tchr_email?: string
    AND?: TeacherWhereInput | TeacherWhereInput[]
    OR?: TeacherWhereInput[]
    NOT?: TeacherWhereInput | TeacherWhereInput[]
    tchr_name?: StringFilter<"Teacher"> | string
    tchr_lastname?: StringFilter<"Teacher"> | string
    tchr_pfp?: StringNullableFilter<"Teacher"> | string | null
    tchr_password?: StringFilter<"Teacher"> | string
    courses?: CourseListRelationFilter
  }, "tchr_id" | "tchr_email">

  export type TeacherOrderByWithAggregationInput = {
    tchr_id?: SortOrder
    tchr_name?: SortOrder
    tchr_lastname?: SortOrder
    tchr_email?: SortOrder
    tchr_pfp?: SortOrderInput | SortOrder
    tchr_password?: SortOrder
    _count?: TeacherCountOrderByAggregateInput
    _max?: TeacherMaxOrderByAggregateInput
    _min?: TeacherMinOrderByAggregateInput
  }

  export type TeacherScalarWhereWithAggregatesInput = {
    AND?: TeacherScalarWhereWithAggregatesInput | TeacherScalarWhereWithAggregatesInput[]
    OR?: TeacherScalarWhereWithAggregatesInput[]
    NOT?: TeacherScalarWhereWithAggregatesInput | TeacherScalarWhereWithAggregatesInput[]
    tchr_id?: StringWithAggregatesFilter<"Teacher"> | string
    tchr_name?: StringWithAggregatesFilter<"Teacher"> | string
    tchr_lastname?: StringWithAggregatesFilter<"Teacher"> | string
    tchr_email?: StringWithAggregatesFilter<"Teacher"> | string
    tchr_pfp?: StringNullableWithAggregatesFilter<"Teacher"> | string | null
    tchr_password?: StringWithAggregatesFilter<"Teacher"> | string
  }

  export type DomainWhereInput = {
    AND?: DomainWhereInput | DomainWhereInput[]
    OR?: DomainWhereInput[]
    NOT?: DomainWhereInput | DomainWhereInput[]
    dmn_id?: StringFilter<"Domain"> | string
    dmn_title?: StringFilter<"Domain"> | string
    dmn_dscrptn?: StringFilter<"Domain"> | string
    dmn_duration?: IntFilter<"Domain"> | number
    subdomains?: SubDomainListRelationFilter
    enroll?: EnrollListRelationFilter
  }

  export type DomainOrderByWithRelationInput = {
    dmn_id?: SortOrder
    dmn_title?: SortOrder
    dmn_dscrptn?: SortOrder
    dmn_duration?: SortOrder
    subdomains?: subDomainOrderByRelationAggregateInput
    enroll?: enrollOrderByRelationAggregateInput
  }

  export type DomainWhereUniqueInput = Prisma.AtLeast<{
    dmn_id?: string
    dmn_title?: string
    AND?: DomainWhereInput | DomainWhereInput[]
    OR?: DomainWhereInput[]
    NOT?: DomainWhereInput | DomainWhereInput[]
    dmn_dscrptn?: StringFilter<"Domain"> | string
    dmn_duration?: IntFilter<"Domain"> | number
    subdomains?: SubDomainListRelationFilter
    enroll?: EnrollListRelationFilter
  }, "dmn_id" | "dmn_title">

  export type DomainOrderByWithAggregationInput = {
    dmn_id?: SortOrder
    dmn_title?: SortOrder
    dmn_dscrptn?: SortOrder
    dmn_duration?: SortOrder
    _count?: DomainCountOrderByAggregateInput
    _avg?: DomainAvgOrderByAggregateInput
    _max?: DomainMaxOrderByAggregateInput
    _min?: DomainMinOrderByAggregateInput
    _sum?: DomainSumOrderByAggregateInput
  }

  export type DomainScalarWhereWithAggregatesInput = {
    AND?: DomainScalarWhereWithAggregatesInput | DomainScalarWhereWithAggregatesInput[]
    OR?: DomainScalarWhereWithAggregatesInput[]
    NOT?: DomainScalarWhereWithAggregatesInput | DomainScalarWhereWithAggregatesInput[]
    dmn_id?: StringWithAggregatesFilter<"Domain"> | string
    dmn_title?: StringWithAggregatesFilter<"Domain"> | string
    dmn_dscrptn?: StringWithAggregatesFilter<"Domain"> | string
    dmn_duration?: IntWithAggregatesFilter<"Domain"> | number
  }

  export type subDomainWhereInput = {
    AND?: subDomainWhereInput | subDomainWhereInput[]
    OR?: subDomainWhereInput[]
    NOT?: subDomainWhereInput | subDomainWhereInput[]
    subdom_id?: StringFilter<"subDomain"> | string
    subdom_title?: StringFilter<"subDomain"> | string
    domainId?: StringFilter<"subDomain"> | string
    parentId?: StringNullableFilter<"subDomain"> | string | null
    courses?: CourseListRelationFilter
    domain?: XOR<DomainScalarRelationFilter, DomainWhereInput>
    score?: ScoreListRelationFilter
    parent?: XOR<SubDomainNullableScalarRelationFilter, subDomainWhereInput> | null
    children?: SubDomainListRelationFilter
  }

  export type subDomainOrderByWithRelationInput = {
    subdom_id?: SortOrder
    subdom_title?: SortOrder
    domainId?: SortOrder
    parentId?: SortOrderInput | SortOrder
    courses?: CourseOrderByRelationAggregateInput
    domain?: DomainOrderByWithRelationInput
    score?: scoreOrderByRelationAggregateInput
    parent?: subDomainOrderByWithRelationInput
    children?: subDomainOrderByRelationAggregateInput
  }

  export type subDomainWhereUniqueInput = Prisma.AtLeast<{
    subdom_id?: string
    subdom_title?: string
    AND?: subDomainWhereInput | subDomainWhereInput[]
    OR?: subDomainWhereInput[]
    NOT?: subDomainWhereInput | subDomainWhereInput[]
    domainId?: StringFilter<"subDomain"> | string
    parentId?: StringNullableFilter<"subDomain"> | string | null
    courses?: CourseListRelationFilter
    domain?: XOR<DomainScalarRelationFilter, DomainWhereInput>
    score?: ScoreListRelationFilter
    parent?: XOR<SubDomainNullableScalarRelationFilter, subDomainWhereInput> | null
    children?: SubDomainListRelationFilter
  }, "subdom_id" | "subdom_title">

  export type subDomainOrderByWithAggregationInput = {
    subdom_id?: SortOrder
    subdom_title?: SortOrder
    domainId?: SortOrder
    parentId?: SortOrderInput | SortOrder
    _count?: subDomainCountOrderByAggregateInput
    _max?: subDomainMaxOrderByAggregateInput
    _min?: subDomainMinOrderByAggregateInput
  }

  export type subDomainScalarWhereWithAggregatesInput = {
    AND?: subDomainScalarWhereWithAggregatesInput | subDomainScalarWhereWithAggregatesInput[]
    OR?: subDomainScalarWhereWithAggregatesInput[]
    NOT?: subDomainScalarWhereWithAggregatesInput | subDomainScalarWhereWithAggregatesInput[]
    subdom_id?: StringWithAggregatesFilter<"subDomain"> | string
    subdom_title?: StringWithAggregatesFilter<"subDomain"> | string
    domainId?: StringWithAggregatesFilter<"subDomain"> | string
    parentId?: StringNullableWithAggregatesFilter<"subDomain"> | string | null
  }

  export type CourseWhereInput = {
    AND?: CourseWhereInput | CourseWhereInput[]
    OR?: CourseWhereInput[]
    NOT?: CourseWhereInput | CourseWhereInput[]
    crs_id?: StringFilter<"Course"> | string
    crs_title?: StringFilter<"Course"> | string
    crs_type?: Enumcrs_typeFilter<"Course"> | $Enums.crs_type
    vd_link?: StringNullableFilter<"Course"> | string | null
    pdf_file?: StringNullableFilter<"Course"> | string | null
    article_content?: StringNullableFilter<"Course"> | string | null
    subdom?: StringFilter<"Course"> | string
    teacherId?: StringFilter<"Course"> | string
    quizzes?: QuizListRelationFilter
    subdomain?: XOR<SubDomainScalarRelationFilter, subDomainWhereInput>
    teacher?: XOR<TeacherScalarRelationFilter, TeacherWhereInput>
    review?: ReviewListRelationFilter
  }

  export type CourseOrderByWithRelationInput = {
    crs_id?: SortOrder
    crs_title?: SortOrder
    crs_type?: SortOrder
    vd_link?: SortOrderInput | SortOrder
    pdf_file?: SortOrderInput | SortOrder
    article_content?: SortOrderInput | SortOrder
    subdom?: SortOrder
    teacherId?: SortOrder
    quizzes?: quizOrderByRelationAggregateInput
    subdomain?: subDomainOrderByWithRelationInput
    teacher?: TeacherOrderByWithRelationInput
    review?: reviewOrderByRelationAggregateInput
  }

  export type CourseWhereUniqueInput = Prisma.AtLeast<{
    crs_id?: string
    crs_title?: string
    AND?: CourseWhereInput | CourseWhereInput[]
    OR?: CourseWhereInput[]
    NOT?: CourseWhereInput | CourseWhereInput[]
    crs_type?: Enumcrs_typeFilter<"Course"> | $Enums.crs_type
    vd_link?: StringNullableFilter<"Course"> | string | null
    pdf_file?: StringNullableFilter<"Course"> | string | null
    article_content?: StringNullableFilter<"Course"> | string | null
    subdom?: StringFilter<"Course"> | string
    teacherId?: StringFilter<"Course"> | string
    quizzes?: QuizListRelationFilter
    subdomain?: XOR<SubDomainScalarRelationFilter, subDomainWhereInput>
    teacher?: XOR<TeacherScalarRelationFilter, TeacherWhereInput>
    review?: ReviewListRelationFilter
  }, "crs_id" | "crs_title">

  export type CourseOrderByWithAggregationInput = {
    crs_id?: SortOrder
    crs_title?: SortOrder
    crs_type?: SortOrder
    vd_link?: SortOrderInput | SortOrder
    pdf_file?: SortOrderInput | SortOrder
    article_content?: SortOrderInput | SortOrder
    subdom?: SortOrder
    teacherId?: SortOrder
    _count?: CourseCountOrderByAggregateInput
    _max?: CourseMaxOrderByAggregateInput
    _min?: CourseMinOrderByAggregateInput
  }

  export type CourseScalarWhereWithAggregatesInput = {
    AND?: CourseScalarWhereWithAggregatesInput | CourseScalarWhereWithAggregatesInput[]
    OR?: CourseScalarWhereWithAggregatesInput[]
    NOT?: CourseScalarWhereWithAggregatesInput | CourseScalarWhereWithAggregatesInput[]
    crs_id?: StringWithAggregatesFilter<"Course"> | string
    crs_title?: StringWithAggregatesFilter<"Course"> | string
    crs_type?: Enumcrs_typeWithAggregatesFilter<"Course"> | $Enums.crs_type
    vd_link?: StringNullableWithAggregatesFilter<"Course"> | string | null
    pdf_file?: StringNullableWithAggregatesFilter<"Course"> | string | null
    article_content?: StringNullableWithAggregatesFilter<"Course"> | string | null
    subdom?: StringWithAggregatesFilter<"Course"> | string
    teacherId?: StringWithAggregatesFilter<"Course"> | string
  }

  export type quizWhereInput = {
    AND?: quizWhereInput | quizWhereInput[]
    OR?: quizWhereInput[]
    NOT?: quizWhereInput | quizWhereInput[]
    qst_id?: StringFilter<"quiz"> | string
    question?: StringFilter<"quiz"> | string
    difficulty?: EnumdifficultyFilter<"quiz"> | $Enums.difficulty
    courseId?: StringFilter<"quiz"> | string
    responses?: Q_responseListRelationFilter
    course?: XOR<CourseScalarRelationFilter, CourseWhereInput>
  }

  export type quizOrderByWithRelationInput = {
    qst_id?: SortOrder
    question?: SortOrder
    difficulty?: SortOrder
    courseId?: SortOrder
    responses?: q_responseOrderByRelationAggregateInput
    course?: CourseOrderByWithRelationInput
  }

  export type quizWhereUniqueInput = Prisma.AtLeast<{
    qst_id?: string
    AND?: quizWhereInput | quizWhereInput[]
    OR?: quizWhereInput[]
    NOT?: quizWhereInput | quizWhereInput[]
    question?: StringFilter<"quiz"> | string
    difficulty?: EnumdifficultyFilter<"quiz"> | $Enums.difficulty
    courseId?: StringFilter<"quiz"> | string
    responses?: Q_responseListRelationFilter
    course?: XOR<CourseScalarRelationFilter, CourseWhereInput>
  }, "qst_id">

  export type quizOrderByWithAggregationInput = {
    qst_id?: SortOrder
    question?: SortOrder
    difficulty?: SortOrder
    courseId?: SortOrder
    _count?: quizCountOrderByAggregateInput
    _max?: quizMaxOrderByAggregateInput
    _min?: quizMinOrderByAggregateInput
  }

  export type quizScalarWhereWithAggregatesInput = {
    AND?: quizScalarWhereWithAggregatesInput | quizScalarWhereWithAggregatesInput[]
    OR?: quizScalarWhereWithAggregatesInput[]
    NOT?: quizScalarWhereWithAggregatesInput | quizScalarWhereWithAggregatesInput[]
    qst_id?: StringWithAggregatesFilter<"quiz"> | string
    question?: StringWithAggregatesFilter<"quiz"> | string
    difficulty?: EnumdifficultyWithAggregatesFilter<"quiz"> | $Enums.difficulty
    courseId?: StringWithAggregatesFilter<"quiz"> | string
  }

  export type q_responseWhereInput = {
    AND?: q_responseWhereInput | q_responseWhereInput[]
    OR?: q_responseWhereInput[]
    NOT?: q_responseWhereInput | q_responseWhereInput[]
    rspns_id?: StringFilter<"q_response"> | string
    response?: StringFilter<"q_response"> | string
    isCorrect?: BoolFilter<"q_response"> | boolean
    quizId?: StringFilter<"q_response"> | string
    quiz?: XOR<QuizScalarRelationFilter, quizWhereInput>
  }

  export type q_responseOrderByWithRelationInput = {
    rspns_id?: SortOrder
    response?: SortOrder
    isCorrect?: SortOrder
    quizId?: SortOrder
    quiz?: quizOrderByWithRelationInput
  }

  export type q_responseWhereUniqueInput = Prisma.AtLeast<{
    rspns_id?: string
    AND?: q_responseWhereInput | q_responseWhereInput[]
    OR?: q_responseWhereInput[]
    NOT?: q_responseWhereInput | q_responseWhereInput[]
    response?: StringFilter<"q_response"> | string
    isCorrect?: BoolFilter<"q_response"> | boolean
    quizId?: StringFilter<"q_response"> | string
    quiz?: XOR<QuizScalarRelationFilter, quizWhereInput>
  }, "rspns_id">

  export type q_responseOrderByWithAggregationInput = {
    rspns_id?: SortOrder
    response?: SortOrder
    isCorrect?: SortOrder
    quizId?: SortOrder
    _count?: q_responseCountOrderByAggregateInput
    _max?: q_responseMaxOrderByAggregateInput
    _min?: q_responseMinOrderByAggregateInput
  }

  export type q_responseScalarWhereWithAggregatesInput = {
    AND?: q_responseScalarWhereWithAggregatesInput | q_responseScalarWhereWithAggregatesInput[]
    OR?: q_responseScalarWhereWithAggregatesInput[]
    NOT?: q_responseScalarWhereWithAggregatesInput | q_responseScalarWhereWithAggregatesInput[]
    rspns_id?: StringWithAggregatesFilter<"q_response"> | string
    response?: StringWithAggregatesFilter<"q_response"> | string
    isCorrect?: BoolWithAggregatesFilter<"q_response"> | boolean
    quizId?: StringWithAggregatesFilter<"q_response"> | string
  }

  export type enrollWhereInput = {
    AND?: enrollWhereInput | enrollWhereInput[]
    OR?: enrollWhereInput[]
    NOT?: enrollWhereInput | enrollWhereInput[]
    studentId?: StringFilter<"enroll"> | string
    domainId?: StringFilter<"enroll"> | string
    progress?: IntFilter<"enroll"> | number
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
    domain?: XOR<DomainScalarRelationFilter, DomainWhereInput>
  }

  export type enrollOrderByWithRelationInput = {
    studentId?: SortOrder
    domainId?: SortOrder
    progress?: SortOrder
    student?: StudentOrderByWithRelationInput
    domain?: DomainOrderByWithRelationInput
  }

  export type enrollWhereUniqueInput = Prisma.AtLeast<{
    studentId_domainId?: enrollStudentIdDomainIdCompoundUniqueInput
    AND?: enrollWhereInput | enrollWhereInput[]
    OR?: enrollWhereInput[]
    NOT?: enrollWhereInput | enrollWhereInput[]
    studentId?: StringFilter<"enroll"> | string
    domainId?: StringFilter<"enroll"> | string
    progress?: IntFilter<"enroll"> | number
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
    domain?: XOR<DomainScalarRelationFilter, DomainWhereInput>
  }, "studentId_domainId">

  export type enrollOrderByWithAggregationInput = {
    studentId?: SortOrder
    domainId?: SortOrder
    progress?: SortOrder
    _count?: enrollCountOrderByAggregateInput
    _avg?: enrollAvgOrderByAggregateInput
    _max?: enrollMaxOrderByAggregateInput
    _min?: enrollMinOrderByAggregateInput
    _sum?: enrollSumOrderByAggregateInput
  }

  export type enrollScalarWhereWithAggregatesInput = {
    AND?: enrollScalarWhereWithAggregatesInput | enrollScalarWhereWithAggregatesInput[]
    OR?: enrollScalarWhereWithAggregatesInput[]
    NOT?: enrollScalarWhereWithAggregatesInput | enrollScalarWhereWithAggregatesInput[]
    studentId?: StringWithAggregatesFilter<"enroll"> | string
    domainId?: StringWithAggregatesFilter<"enroll"> | string
    progress?: IntWithAggregatesFilter<"enroll"> | number
  }

  export type scoreWhereInput = {
    AND?: scoreWhereInput | scoreWhereInput[]
    OR?: scoreWhereInput[]
    NOT?: scoreWhereInput | scoreWhereInput[]
    studentId?: StringFilter<"score"> | string
    subdom?: StringFilter<"score"> | string
    score?: FloatFilter<"score"> | number
    time_taken?: IntFilter<"score"> | number
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
    subdomain?: XOR<SubDomainScalarRelationFilter, subDomainWhereInput>
  }

  export type scoreOrderByWithRelationInput = {
    studentId?: SortOrder
    subdom?: SortOrder
    score?: SortOrder
    time_taken?: SortOrder
    student?: StudentOrderByWithRelationInput
    subdomain?: subDomainOrderByWithRelationInput
  }

  export type scoreWhereUniqueInput = Prisma.AtLeast<{
    studentId_subdom?: scoreStudentIdSubdomCompoundUniqueInput
    AND?: scoreWhereInput | scoreWhereInput[]
    OR?: scoreWhereInput[]
    NOT?: scoreWhereInput | scoreWhereInput[]
    studentId?: StringFilter<"score"> | string
    subdom?: StringFilter<"score"> | string
    score?: FloatFilter<"score"> | number
    time_taken?: IntFilter<"score"> | number
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
    subdomain?: XOR<SubDomainScalarRelationFilter, subDomainWhereInput>
  }, "studentId_subdom">

  export type scoreOrderByWithAggregationInput = {
    studentId?: SortOrder
    subdom?: SortOrder
    score?: SortOrder
    time_taken?: SortOrder
    _count?: scoreCountOrderByAggregateInput
    _avg?: scoreAvgOrderByAggregateInput
    _max?: scoreMaxOrderByAggregateInput
    _min?: scoreMinOrderByAggregateInput
    _sum?: scoreSumOrderByAggregateInput
  }

  export type scoreScalarWhereWithAggregatesInput = {
    AND?: scoreScalarWhereWithAggregatesInput | scoreScalarWhereWithAggregatesInput[]
    OR?: scoreScalarWhereWithAggregatesInput[]
    NOT?: scoreScalarWhereWithAggregatesInput | scoreScalarWhereWithAggregatesInput[]
    studentId?: StringWithAggregatesFilter<"score"> | string
    subdom?: StringWithAggregatesFilter<"score"> | string
    score?: FloatWithAggregatesFilter<"score"> | number
    time_taken?: IntWithAggregatesFilter<"score"> | number
  }

  export type reviewWhereInput = {
    AND?: reviewWhereInput | reviewWhereInput[]
    OR?: reviewWhereInput[]
    NOT?: reviewWhereInput | reviewWhereInput[]
    studentId?: StringFilter<"review"> | string
    courseId?: StringFilter<"review"> | string
    comment?: StringFilter<"review"> | string
    rating?: IntFilter<"review"> | number
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
    course?: XOR<CourseScalarRelationFilter, CourseWhereInput>
  }

  export type reviewOrderByWithRelationInput = {
    studentId?: SortOrder
    courseId?: SortOrder
    comment?: SortOrder
    rating?: SortOrder
    student?: StudentOrderByWithRelationInput
    course?: CourseOrderByWithRelationInput
  }

  export type reviewWhereUniqueInput = Prisma.AtLeast<{
    studentId_courseId?: reviewStudentIdCourseIdCompoundUniqueInput
    AND?: reviewWhereInput | reviewWhereInput[]
    OR?: reviewWhereInput[]
    NOT?: reviewWhereInput | reviewWhereInput[]
    studentId?: StringFilter<"review"> | string
    courseId?: StringFilter<"review"> | string
    comment?: StringFilter<"review"> | string
    rating?: IntFilter<"review"> | number
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
    course?: XOR<CourseScalarRelationFilter, CourseWhereInput>
  }, "studentId_courseId">

  export type reviewOrderByWithAggregationInput = {
    studentId?: SortOrder
    courseId?: SortOrder
    comment?: SortOrder
    rating?: SortOrder
    _count?: reviewCountOrderByAggregateInput
    _avg?: reviewAvgOrderByAggregateInput
    _max?: reviewMaxOrderByAggregateInput
    _min?: reviewMinOrderByAggregateInput
    _sum?: reviewSumOrderByAggregateInput
  }

  export type reviewScalarWhereWithAggregatesInput = {
    AND?: reviewScalarWhereWithAggregatesInput | reviewScalarWhereWithAggregatesInput[]
    OR?: reviewScalarWhereWithAggregatesInput[]
    NOT?: reviewScalarWhereWithAggregatesInput | reviewScalarWhereWithAggregatesInput[]
    studentId?: StringWithAggregatesFilter<"review"> | string
    courseId?: StringWithAggregatesFilter<"review"> | string
    comment?: StringWithAggregatesFilter<"review"> | string
    rating?: IntWithAggregatesFilter<"review"> | number
  }

  export type StudentCreateInput = {
    std_id?: string
    std_name: string
    std_lastname: string
    std_email: string
    std_pfp?: string | null
    supabaseId: string
    std_streak?: number
    std_last_activeDate?: Date | string
    std_level?: $Enums.level
    enroll?: enrollCreateNestedManyWithoutStudentInput
    score?: scoreCreateNestedManyWithoutStudentInput
    review?: reviewCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateInput = {
    std_id?: string
    std_name: string
    std_lastname: string
    std_email: string
    std_pfp?: string | null
    supabaseId: string
    std_streak?: number
    std_last_activeDate?: Date | string
    std_level?: $Enums.level
    enroll?: enrollUncheckedCreateNestedManyWithoutStudentInput
    score?: scoreUncheckedCreateNestedManyWithoutStudentInput
    review?: reviewUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentUpdateInput = {
    std_id?: StringFieldUpdateOperationsInput | string
    std_name?: StringFieldUpdateOperationsInput | string
    std_lastname?: StringFieldUpdateOperationsInput | string
    std_email?: StringFieldUpdateOperationsInput | string
    std_pfp?: NullableStringFieldUpdateOperationsInput | string | null
    supabaseId?: StringFieldUpdateOperationsInput | string
    std_streak?: IntFieldUpdateOperationsInput | number
    std_last_activeDate?: DateTimeFieldUpdateOperationsInput | Date | string
    std_level?: EnumlevelFieldUpdateOperationsInput | $Enums.level
    enroll?: enrollUpdateManyWithoutStudentNestedInput
    score?: scoreUpdateManyWithoutStudentNestedInput
    review?: reviewUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateInput = {
    std_id?: StringFieldUpdateOperationsInput | string
    std_name?: StringFieldUpdateOperationsInput | string
    std_lastname?: StringFieldUpdateOperationsInput | string
    std_email?: StringFieldUpdateOperationsInput | string
    std_pfp?: NullableStringFieldUpdateOperationsInput | string | null
    supabaseId?: StringFieldUpdateOperationsInput | string
    std_streak?: IntFieldUpdateOperationsInput | number
    std_last_activeDate?: DateTimeFieldUpdateOperationsInput | Date | string
    std_level?: EnumlevelFieldUpdateOperationsInput | $Enums.level
    enroll?: enrollUncheckedUpdateManyWithoutStudentNestedInput
    score?: scoreUncheckedUpdateManyWithoutStudentNestedInput
    review?: reviewUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type StudentCreateManyInput = {
    std_id?: string
    std_name: string
    std_lastname: string
    std_email: string
    std_pfp?: string | null
    supabaseId: string
    std_streak?: number
    std_last_activeDate?: Date | string
    std_level?: $Enums.level
  }

  export type StudentUpdateManyMutationInput = {
    std_id?: StringFieldUpdateOperationsInput | string
    std_name?: StringFieldUpdateOperationsInput | string
    std_lastname?: StringFieldUpdateOperationsInput | string
    std_email?: StringFieldUpdateOperationsInput | string
    std_pfp?: NullableStringFieldUpdateOperationsInput | string | null
    supabaseId?: StringFieldUpdateOperationsInput | string
    std_streak?: IntFieldUpdateOperationsInput | number
    std_last_activeDate?: DateTimeFieldUpdateOperationsInput | Date | string
    std_level?: EnumlevelFieldUpdateOperationsInput | $Enums.level
  }

  export type StudentUncheckedUpdateManyInput = {
    std_id?: StringFieldUpdateOperationsInput | string
    std_name?: StringFieldUpdateOperationsInput | string
    std_lastname?: StringFieldUpdateOperationsInput | string
    std_email?: StringFieldUpdateOperationsInput | string
    std_pfp?: NullableStringFieldUpdateOperationsInput | string | null
    supabaseId?: StringFieldUpdateOperationsInput | string
    std_streak?: IntFieldUpdateOperationsInput | number
    std_last_activeDate?: DateTimeFieldUpdateOperationsInput | Date | string
    std_level?: EnumlevelFieldUpdateOperationsInput | $Enums.level
  }

  export type TeacherCreateInput = {
    tchr_id?: string
    tchr_name: string
    tchr_lastname: string
    tchr_email: string
    tchr_pfp?: string | null
    tchr_password: string
    courses?: CourseCreateNestedManyWithoutTeacherInput
  }

  export type TeacherUncheckedCreateInput = {
    tchr_id?: string
    tchr_name: string
    tchr_lastname: string
    tchr_email: string
    tchr_pfp?: string | null
    tchr_password: string
    courses?: CourseUncheckedCreateNestedManyWithoutTeacherInput
  }

  export type TeacherUpdateInput = {
    tchr_id?: StringFieldUpdateOperationsInput | string
    tchr_name?: StringFieldUpdateOperationsInput | string
    tchr_lastname?: StringFieldUpdateOperationsInput | string
    tchr_email?: StringFieldUpdateOperationsInput | string
    tchr_pfp?: NullableStringFieldUpdateOperationsInput | string | null
    tchr_password?: StringFieldUpdateOperationsInput | string
    courses?: CourseUpdateManyWithoutTeacherNestedInput
  }

  export type TeacherUncheckedUpdateInput = {
    tchr_id?: StringFieldUpdateOperationsInput | string
    tchr_name?: StringFieldUpdateOperationsInput | string
    tchr_lastname?: StringFieldUpdateOperationsInput | string
    tchr_email?: StringFieldUpdateOperationsInput | string
    tchr_pfp?: NullableStringFieldUpdateOperationsInput | string | null
    tchr_password?: StringFieldUpdateOperationsInput | string
    courses?: CourseUncheckedUpdateManyWithoutTeacherNestedInput
  }

  export type TeacherCreateManyInput = {
    tchr_id?: string
    tchr_name: string
    tchr_lastname: string
    tchr_email: string
    tchr_pfp?: string | null
    tchr_password: string
  }

  export type TeacherUpdateManyMutationInput = {
    tchr_id?: StringFieldUpdateOperationsInput | string
    tchr_name?: StringFieldUpdateOperationsInput | string
    tchr_lastname?: StringFieldUpdateOperationsInput | string
    tchr_email?: StringFieldUpdateOperationsInput | string
    tchr_pfp?: NullableStringFieldUpdateOperationsInput | string | null
    tchr_password?: StringFieldUpdateOperationsInput | string
  }

  export type TeacherUncheckedUpdateManyInput = {
    tchr_id?: StringFieldUpdateOperationsInput | string
    tchr_name?: StringFieldUpdateOperationsInput | string
    tchr_lastname?: StringFieldUpdateOperationsInput | string
    tchr_email?: StringFieldUpdateOperationsInput | string
    tchr_pfp?: NullableStringFieldUpdateOperationsInput | string | null
    tchr_password?: StringFieldUpdateOperationsInput | string
  }

  export type DomainCreateInput = {
    dmn_id?: string
    dmn_title: string
    dmn_dscrptn: string
    dmn_duration: number
    subdomains?: subDomainCreateNestedManyWithoutDomainInput
    enroll?: enrollCreateNestedManyWithoutDomainInput
  }

  export type DomainUncheckedCreateInput = {
    dmn_id?: string
    dmn_title: string
    dmn_dscrptn: string
    dmn_duration: number
    subdomains?: subDomainUncheckedCreateNestedManyWithoutDomainInput
    enroll?: enrollUncheckedCreateNestedManyWithoutDomainInput
  }

  export type DomainUpdateInput = {
    dmn_id?: StringFieldUpdateOperationsInput | string
    dmn_title?: StringFieldUpdateOperationsInput | string
    dmn_dscrptn?: StringFieldUpdateOperationsInput | string
    dmn_duration?: IntFieldUpdateOperationsInput | number
    subdomains?: subDomainUpdateManyWithoutDomainNestedInput
    enroll?: enrollUpdateManyWithoutDomainNestedInput
  }

  export type DomainUncheckedUpdateInput = {
    dmn_id?: StringFieldUpdateOperationsInput | string
    dmn_title?: StringFieldUpdateOperationsInput | string
    dmn_dscrptn?: StringFieldUpdateOperationsInput | string
    dmn_duration?: IntFieldUpdateOperationsInput | number
    subdomains?: subDomainUncheckedUpdateManyWithoutDomainNestedInput
    enroll?: enrollUncheckedUpdateManyWithoutDomainNestedInput
  }

  export type DomainCreateManyInput = {
    dmn_id?: string
    dmn_title: string
    dmn_dscrptn: string
    dmn_duration: number
  }

  export type DomainUpdateManyMutationInput = {
    dmn_id?: StringFieldUpdateOperationsInput | string
    dmn_title?: StringFieldUpdateOperationsInput | string
    dmn_dscrptn?: StringFieldUpdateOperationsInput | string
    dmn_duration?: IntFieldUpdateOperationsInput | number
  }

  export type DomainUncheckedUpdateManyInput = {
    dmn_id?: StringFieldUpdateOperationsInput | string
    dmn_title?: StringFieldUpdateOperationsInput | string
    dmn_dscrptn?: StringFieldUpdateOperationsInput | string
    dmn_duration?: IntFieldUpdateOperationsInput | number
  }

  export type subDomainCreateInput = {
    subdom_id?: string
    subdom_title: string
    courses?: CourseCreateNestedManyWithoutSubdomainInput
    domain: DomainCreateNestedOneWithoutSubdomainsInput
    score?: scoreCreateNestedManyWithoutSubdomainInput
    parent?: subDomainCreateNestedOneWithoutChildrenInput
    children?: subDomainCreateNestedManyWithoutParentInput
  }

  export type subDomainUncheckedCreateInput = {
    subdom_id?: string
    subdom_title: string
    domainId: string
    parentId?: string | null
    courses?: CourseUncheckedCreateNestedManyWithoutSubdomainInput
    score?: scoreUncheckedCreateNestedManyWithoutSubdomainInput
    children?: subDomainUncheckedCreateNestedManyWithoutParentInput
  }

  export type subDomainUpdateInput = {
    subdom_id?: StringFieldUpdateOperationsInput | string
    subdom_title?: StringFieldUpdateOperationsInput | string
    courses?: CourseUpdateManyWithoutSubdomainNestedInput
    domain?: DomainUpdateOneRequiredWithoutSubdomainsNestedInput
    score?: scoreUpdateManyWithoutSubdomainNestedInput
    parent?: subDomainUpdateOneWithoutChildrenNestedInput
    children?: subDomainUpdateManyWithoutParentNestedInput
  }

  export type subDomainUncheckedUpdateInput = {
    subdom_id?: StringFieldUpdateOperationsInput | string
    subdom_title?: StringFieldUpdateOperationsInput | string
    domainId?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    courses?: CourseUncheckedUpdateManyWithoutSubdomainNestedInput
    score?: scoreUncheckedUpdateManyWithoutSubdomainNestedInput
    children?: subDomainUncheckedUpdateManyWithoutParentNestedInput
  }

  export type subDomainCreateManyInput = {
    subdom_id?: string
    subdom_title: string
    domainId: string
    parentId?: string | null
  }

  export type subDomainUpdateManyMutationInput = {
    subdom_id?: StringFieldUpdateOperationsInput | string
    subdom_title?: StringFieldUpdateOperationsInput | string
  }

  export type subDomainUncheckedUpdateManyInput = {
    subdom_id?: StringFieldUpdateOperationsInput | string
    subdom_title?: StringFieldUpdateOperationsInput | string
    domainId?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CourseCreateInput = {
    crs_id?: string
    crs_title: string
    crs_type: $Enums.crs_type
    vd_link?: string | null
    pdf_file?: string | null
    article_content?: string | null
    quizzes?: quizCreateNestedManyWithoutCourseInput
    subdomain: subDomainCreateNestedOneWithoutCoursesInput
    teacher: TeacherCreateNestedOneWithoutCoursesInput
    review?: reviewCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateInput = {
    crs_id?: string
    crs_title: string
    crs_type: $Enums.crs_type
    vd_link?: string | null
    pdf_file?: string | null
    article_content?: string | null
    subdom: string
    teacherId: string
    quizzes?: quizUncheckedCreateNestedManyWithoutCourseInput
    review?: reviewUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseUpdateInput = {
    crs_id?: StringFieldUpdateOperationsInput | string
    crs_title?: StringFieldUpdateOperationsInput | string
    crs_type?: Enumcrs_typeFieldUpdateOperationsInput | $Enums.crs_type
    vd_link?: NullableStringFieldUpdateOperationsInput | string | null
    pdf_file?: NullableStringFieldUpdateOperationsInput | string | null
    article_content?: NullableStringFieldUpdateOperationsInput | string | null
    quizzes?: quizUpdateManyWithoutCourseNestedInput
    subdomain?: subDomainUpdateOneRequiredWithoutCoursesNestedInput
    teacher?: TeacherUpdateOneRequiredWithoutCoursesNestedInput
    review?: reviewUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateInput = {
    crs_id?: StringFieldUpdateOperationsInput | string
    crs_title?: StringFieldUpdateOperationsInput | string
    crs_type?: Enumcrs_typeFieldUpdateOperationsInput | $Enums.crs_type
    vd_link?: NullableStringFieldUpdateOperationsInput | string | null
    pdf_file?: NullableStringFieldUpdateOperationsInput | string | null
    article_content?: NullableStringFieldUpdateOperationsInput | string | null
    subdom?: StringFieldUpdateOperationsInput | string
    teacherId?: StringFieldUpdateOperationsInput | string
    quizzes?: quizUncheckedUpdateManyWithoutCourseNestedInput
    review?: reviewUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type CourseCreateManyInput = {
    crs_id?: string
    crs_title: string
    crs_type: $Enums.crs_type
    vd_link?: string | null
    pdf_file?: string | null
    article_content?: string | null
    subdom: string
    teacherId: string
  }

  export type CourseUpdateManyMutationInput = {
    crs_id?: StringFieldUpdateOperationsInput | string
    crs_title?: StringFieldUpdateOperationsInput | string
    crs_type?: Enumcrs_typeFieldUpdateOperationsInput | $Enums.crs_type
    vd_link?: NullableStringFieldUpdateOperationsInput | string | null
    pdf_file?: NullableStringFieldUpdateOperationsInput | string | null
    article_content?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CourseUncheckedUpdateManyInput = {
    crs_id?: StringFieldUpdateOperationsInput | string
    crs_title?: StringFieldUpdateOperationsInput | string
    crs_type?: Enumcrs_typeFieldUpdateOperationsInput | $Enums.crs_type
    vd_link?: NullableStringFieldUpdateOperationsInput | string | null
    pdf_file?: NullableStringFieldUpdateOperationsInput | string | null
    article_content?: NullableStringFieldUpdateOperationsInput | string | null
    subdom?: StringFieldUpdateOperationsInput | string
    teacherId?: StringFieldUpdateOperationsInput | string
  }

  export type quizCreateInput = {
    qst_id?: string
    question: string
    difficulty: $Enums.difficulty
    responses?: q_responseCreateNestedManyWithoutQuizInput
    course: CourseCreateNestedOneWithoutQuizzesInput
  }

  export type quizUncheckedCreateInput = {
    qst_id?: string
    question: string
    difficulty: $Enums.difficulty
    courseId: string
    responses?: q_responseUncheckedCreateNestedManyWithoutQuizInput
  }

  export type quizUpdateInput = {
    qst_id?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    difficulty?: EnumdifficultyFieldUpdateOperationsInput | $Enums.difficulty
    responses?: q_responseUpdateManyWithoutQuizNestedInput
    course?: CourseUpdateOneRequiredWithoutQuizzesNestedInput
  }

  export type quizUncheckedUpdateInput = {
    qst_id?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    difficulty?: EnumdifficultyFieldUpdateOperationsInput | $Enums.difficulty
    courseId?: StringFieldUpdateOperationsInput | string
    responses?: q_responseUncheckedUpdateManyWithoutQuizNestedInput
  }

  export type quizCreateManyInput = {
    qst_id?: string
    question: string
    difficulty: $Enums.difficulty
    courseId: string
  }

  export type quizUpdateManyMutationInput = {
    qst_id?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    difficulty?: EnumdifficultyFieldUpdateOperationsInput | $Enums.difficulty
  }

  export type quizUncheckedUpdateManyInput = {
    qst_id?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    difficulty?: EnumdifficultyFieldUpdateOperationsInput | $Enums.difficulty
    courseId?: StringFieldUpdateOperationsInput | string
  }

  export type q_responseCreateInput = {
    rspns_id?: string
    response: string
    isCorrect: boolean
    quiz: quizCreateNestedOneWithoutResponsesInput
  }

  export type q_responseUncheckedCreateInput = {
    rspns_id?: string
    response: string
    isCorrect: boolean
    quizId: string
  }

  export type q_responseUpdateInput = {
    rspns_id?: StringFieldUpdateOperationsInput | string
    response?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    quiz?: quizUpdateOneRequiredWithoutResponsesNestedInput
  }

  export type q_responseUncheckedUpdateInput = {
    rspns_id?: StringFieldUpdateOperationsInput | string
    response?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    quizId?: StringFieldUpdateOperationsInput | string
  }

  export type q_responseCreateManyInput = {
    rspns_id?: string
    response: string
    isCorrect: boolean
    quizId: string
  }

  export type q_responseUpdateManyMutationInput = {
    rspns_id?: StringFieldUpdateOperationsInput | string
    response?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
  }

  export type q_responseUncheckedUpdateManyInput = {
    rspns_id?: StringFieldUpdateOperationsInput | string
    response?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    quizId?: StringFieldUpdateOperationsInput | string
  }

  export type enrollCreateInput = {
    progress: number
    student: StudentCreateNestedOneWithoutEnrollInput
    domain: DomainCreateNestedOneWithoutEnrollInput
  }

  export type enrollUncheckedCreateInput = {
    studentId: string
    domainId: string
    progress: number
  }

  export type enrollUpdateInput = {
    progress?: IntFieldUpdateOperationsInput | number
    student?: StudentUpdateOneRequiredWithoutEnrollNestedInput
    domain?: DomainUpdateOneRequiredWithoutEnrollNestedInput
  }

  export type enrollUncheckedUpdateInput = {
    studentId?: StringFieldUpdateOperationsInput | string
    domainId?: StringFieldUpdateOperationsInput | string
    progress?: IntFieldUpdateOperationsInput | number
  }

  export type enrollCreateManyInput = {
    studentId: string
    domainId: string
    progress: number
  }

  export type enrollUpdateManyMutationInput = {
    progress?: IntFieldUpdateOperationsInput | number
  }

  export type enrollUncheckedUpdateManyInput = {
    studentId?: StringFieldUpdateOperationsInput | string
    domainId?: StringFieldUpdateOperationsInput | string
    progress?: IntFieldUpdateOperationsInput | number
  }

  export type scoreCreateInput = {
    score: number
    time_taken: number
    student: StudentCreateNestedOneWithoutScoreInput
    subdomain: subDomainCreateNestedOneWithoutScoreInput
  }

  export type scoreUncheckedCreateInput = {
    studentId: string
    subdom: string
    score: number
    time_taken: number
  }

  export type scoreUpdateInput = {
    score?: FloatFieldUpdateOperationsInput | number
    time_taken?: IntFieldUpdateOperationsInput | number
    student?: StudentUpdateOneRequiredWithoutScoreNestedInput
    subdomain?: subDomainUpdateOneRequiredWithoutScoreNestedInput
  }

  export type scoreUncheckedUpdateInput = {
    studentId?: StringFieldUpdateOperationsInput | string
    subdom?: StringFieldUpdateOperationsInput | string
    score?: FloatFieldUpdateOperationsInput | number
    time_taken?: IntFieldUpdateOperationsInput | number
  }

  export type scoreCreateManyInput = {
    studentId: string
    subdom: string
    score: number
    time_taken: number
  }

  export type scoreUpdateManyMutationInput = {
    score?: FloatFieldUpdateOperationsInput | number
    time_taken?: IntFieldUpdateOperationsInput | number
  }

  export type scoreUncheckedUpdateManyInput = {
    studentId?: StringFieldUpdateOperationsInput | string
    subdom?: StringFieldUpdateOperationsInput | string
    score?: FloatFieldUpdateOperationsInput | number
    time_taken?: IntFieldUpdateOperationsInput | number
  }

  export type reviewCreateInput = {
    comment: string
    rating: number
    student: StudentCreateNestedOneWithoutReviewInput
    course: CourseCreateNestedOneWithoutReviewInput
  }

  export type reviewUncheckedCreateInput = {
    studentId: string
    courseId: string
    comment: string
    rating: number
  }

  export type reviewUpdateInput = {
    comment?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    student?: StudentUpdateOneRequiredWithoutReviewNestedInput
    course?: CourseUpdateOneRequiredWithoutReviewNestedInput
  }

  export type reviewUncheckedUpdateInput = {
    studentId?: StringFieldUpdateOperationsInput | string
    courseId?: StringFieldUpdateOperationsInput | string
    comment?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
  }

  export type reviewCreateManyInput = {
    studentId: string
    courseId: string
    comment: string
    rating: number
  }

  export type reviewUpdateManyMutationInput = {
    comment?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
  }

  export type reviewUncheckedUpdateManyInput = {
    studentId?: StringFieldUpdateOperationsInput | string
    courseId?: StringFieldUpdateOperationsInput | string
    comment?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type EnumlevelFilter<$PrismaModel = never> = {
    equals?: $Enums.level | EnumlevelFieldRefInput<$PrismaModel>
    in?: $Enums.level[] | ListEnumlevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.level[] | ListEnumlevelFieldRefInput<$PrismaModel>
    not?: NestedEnumlevelFilter<$PrismaModel> | $Enums.level
  }

  export type EnrollListRelationFilter = {
    every?: enrollWhereInput
    some?: enrollWhereInput
    none?: enrollWhereInput
  }

  export type ScoreListRelationFilter = {
    every?: scoreWhereInput
    some?: scoreWhereInput
    none?: scoreWhereInput
  }

  export type ReviewListRelationFilter = {
    every?: reviewWhereInput
    some?: reviewWhereInput
    none?: reviewWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type enrollOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type scoreOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type reviewOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StudentCountOrderByAggregateInput = {
    std_id?: SortOrder
    std_name?: SortOrder
    std_lastname?: SortOrder
    std_email?: SortOrder
    std_pfp?: SortOrder
    supabaseId?: SortOrder
    std_streak?: SortOrder
    std_last_activeDate?: SortOrder
    std_level?: SortOrder
  }

  export type StudentAvgOrderByAggregateInput = {
    std_streak?: SortOrder
  }

  export type StudentMaxOrderByAggregateInput = {
    std_id?: SortOrder
    std_name?: SortOrder
    std_lastname?: SortOrder
    std_email?: SortOrder
    std_pfp?: SortOrder
    supabaseId?: SortOrder
    std_streak?: SortOrder
    std_last_activeDate?: SortOrder
    std_level?: SortOrder
  }

  export type StudentMinOrderByAggregateInput = {
    std_id?: SortOrder
    std_name?: SortOrder
    std_lastname?: SortOrder
    std_email?: SortOrder
    std_pfp?: SortOrder
    supabaseId?: SortOrder
    std_streak?: SortOrder
    std_last_activeDate?: SortOrder
    std_level?: SortOrder
  }

  export type StudentSumOrderByAggregateInput = {
    std_streak?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumlevelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.level | EnumlevelFieldRefInput<$PrismaModel>
    in?: $Enums.level[] | ListEnumlevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.level[] | ListEnumlevelFieldRefInput<$PrismaModel>
    not?: NestedEnumlevelWithAggregatesFilter<$PrismaModel> | $Enums.level
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumlevelFilter<$PrismaModel>
    _max?: NestedEnumlevelFilter<$PrismaModel>
  }

  export type CourseListRelationFilter = {
    every?: CourseWhereInput
    some?: CourseWhereInput
    none?: CourseWhereInput
  }

  export type CourseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TeacherCountOrderByAggregateInput = {
    tchr_id?: SortOrder
    tchr_name?: SortOrder
    tchr_lastname?: SortOrder
    tchr_email?: SortOrder
    tchr_pfp?: SortOrder
    tchr_password?: SortOrder
  }

  export type TeacherMaxOrderByAggregateInput = {
    tchr_id?: SortOrder
    tchr_name?: SortOrder
    tchr_lastname?: SortOrder
    tchr_email?: SortOrder
    tchr_pfp?: SortOrder
    tchr_password?: SortOrder
  }

  export type TeacherMinOrderByAggregateInput = {
    tchr_id?: SortOrder
    tchr_name?: SortOrder
    tchr_lastname?: SortOrder
    tchr_email?: SortOrder
    tchr_pfp?: SortOrder
    tchr_password?: SortOrder
  }

  export type SubDomainListRelationFilter = {
    every?: subDomainWhereInput
    some?: subDomainWhereInput
    none?: subDomainWhereInput
  }

  export type subDomainOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DomainCountOrderByAggregateInput = {
    dmn_id?: SortOrder
    dmn_title?: SortOrder
    dmn_dscrptn?: SortOrder
    dmn_duration?: SortOrder
  }

  export type DomainAvgOrderByAggregateInput = {
    dmn_duration?: SortOrder
  }

  export type DomainMaxOrderByAggregateInput = {
    dmn_id?: SortOrder
    dmn_title?: SortOrder
    dmn_dscrptn?: SortOrder
    dmn_duration?: SortOrder
  }

  export type DomainMinOrderByAggregateInput = {
    dmn_id?: SortOrder
    dmn_title?: SortOrder
    dmn_dscrptn?: SortOrder
    dmn_duration?: SortOrder
  }

  export type DomainSumOrderByAggregateInput = {
    dmn_duration?: SortOrder
  }

  export type DomainScalarRelationFilter = {
    is?: DomainWhereInput
    isNot?: DomainWhereInput
  }

  export type SubDomainNullableScalarRelationFilter = {
    is?: subDomainWhereInput | null
    isNot?: subDomainWhereInput | null
  }

  export type subDomainCountOrderByAggregateInput = {
    subdom_id?: SortOrder
    subdom_title?: SortOrder
    domainId?: SortOrder
    parentId?: SortOrder
  }

  export type subDomainMaxOrderByAggregateInput = {
    subdom_id?: SortOrder
    subdom_title?: SortOrder
    domainId?: SortOrder
    parentId?: SortOrder
  }

  export type subDomainMinOrderByAggregateInput = {
    subdom_id?: SortOrder
    subdom_title?: SortOrder
    domainId?: SortOrder
    parentId?: SortOrder
  }

  export type Enumcrs_typeFilter<$PrismaModel = never> = {
    equals?: $Enums.crs_type | Enumcrs_typeFieldRefInput<$PrismaModel>
    in?: $Enums.crs_type[] | ListEnumcrs_typeFieldRefInput<$PrismaModel>
    notIn?: $Enums.crs_type[] | ListEnumcrs_typeFieldRefInput<$PrismaModel>
    not?: NestedEnumcrs_typeFilter<$PrismaModel> | $Enums.crs_type
  }

  export type QuizListRelationFilter = {
    every?: quizWhereInput
    some?: quizWhereInput
    none?: quizWhereInput
  }

  export type SubDomainScalarRelationFilter = {
    is?: subDomainWhereInput
    isNot?: subDomainWhereInput
  }

  export type TeacherScalarRelationFilter = {
    is?: TeacherWhereInput
    isNot?: TeacherWhereInput
  }

  export type quizOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CourseCountOrderByAggregateInput = {
    crs_id?: SortOrder
    crs_title?: SortOrder
    crs_type?: SortOrder
    vd_link?: SortOrder
    pdf_file?: SortOrder
    article_content?: SortOrder
    subdom?: SortOrder
    teacherId?: SortOrder
  }

  export type CourseMaxOrderByAggregateInput = {
    crs_id?: SortOrder
    crs_title?: SortOrder
    crs_type?: SortOrder
    vd_link?: SortOrder
    pdf_file?: SortOrder
    article_content?: SortOrder
    subdom?: SortOrder
    teacherId?: SortOrder
  }

  export type CourseMinOrderByAggregateInput = {
    crs_id?: SortOrder
    crs_title?: SortOrder
    crs_type?: SortOrder
    vd_link?: SortOrder
    pdf_file?: SortOrder
    article_content?: SortOrder
    subdom?: SortOrder
    teacherId?: SortOrder
  }

  export type Enumcrs_typeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.crs_type | Enumcrs_typeFieldRefInput<$PrismaModel>
    in?: $Enums.crs_type[] | ListEnumcrs_typeFieldRefInput<$PrismaModel>
    notIn?: $Enums.crs_type[] | ListEnumcrs_typeFieldRefInput<$PrismaModel>
    not?: NestedEnumcrs_typeWithAggregatesFilter<$PrismaModel> | $Enums.crs_type
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumcrs_typeFilter<$PrismaModel>
    _max?: NestedEnumcrs_typeFilter<$PrismaModel>
  }

  export type EnumdifficultyFilter<$PrismaModel = never> = {
    equals?: $Enums.difficulty | EnumdifficultyFieldRefInput<$PrismaModel>
    in?: $Enums.difficulty[] | ListEnumdifficultyFieldRefInput<$PrismaModel>
    notIn?: $Enums.difficulty[] | ListEnumdifficultyFieldRefInput<$PrismaModel>
    not?: NestedEnumdifficultyFilter<$PrismaModel> | $Enums.difficulty
  }

  export type Q_responseListRelationFilter = {
    every?: q_responseWhereInput
    some?: q_responseWhereInput
    none?: q_responseWhereInput
  }

  export type CourseScalarRelationFilter = {
    is?: CourseWhereInput
    isNot?: CourseWhereInput
  }

  export type q_responseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type quizCountOrderByAggregateInput = {
    qst_id?: SortOrder
    question?: SortOrder
    difficulty?: SortOrder
    courseId?: SortOrder
  }

  export type quizMaxOrderByAggregateInput = {
    qst_id?: SortOrder
    question?: SortOrder
    difficulty?: SortOrder
    courseId?: SortOrder
  }

  export type quizMinOrderByAggregateInput = {
    qst_id?: SortOrder
    question?: SortOrder
    difficulty?: SortOrder
    courseId?: SortOrder
  }

  export type EnumdifficultyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.difficulty | EnumdifficultyFieldRefInput<$PrismaModel>
    in?: $Enums.difficulty[] | ListEnumdifficultyFieldRefInput<$PrismaModel>
    notIn?: $Enums.difficulty[] | ListEnumdifficultyFieldRefInput<$PrismaModel>
    not?: NestedEnumdifficultyWithAggregatesFilter<$PrismaModel> | $Enums.difficulty
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumdifficultyFilter<$PrismaModel>
    _max?: NestedEnumdifficultyFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type QuizScalarRelationFilter = {
    is?: quizWhereInput
    isNot?: quizWhereInput
  }

  export type q_responseCountOrderByAggregateInput = {
    rspns_id?: SortOrder
    response?: SortOrder
    isCorrect?: SortOrder
    quizId?: SortOrder
  }

  export type q_responseMaxOrderByAggregateInput = {
    rspns_id?: SortOrder
    response?: SortOrder
    isCorrect?: SortOrder
    quizId?: SortOrder
  }

  export type q_responseMinOrderByAggregateInput = {
    rspns_id?: SortOrder
    response?: SortOrder
    isCorrect?: SortOrder
    quizId?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StudentScalarRelationFilter = {
    is?: StudentWhereInput
    isNot?: StudentWhereInput
  }

  export type enrollStudentIdDomainIdCompoundUniqueInput = {
    studentId: string
    domainId: string
  }

  export type enrollCountOrderByAggregateInput = {
    studentId?: SortOrder
    domainId?: SortOrder
    progress?: SortOrder
  }

  export type enrollAvgOrderByAggregateInput = {
    progress?: SortOrder
  }

  export type enrollMaxOrderByAggregateInput = {
    studentId?: SortOrder
    domainId?: SortOrder
    progress?: SortOrder
  }

  export type enrollMinOrderByAggregateInput = {
    studentId?: SortOrder
    domainId?: SortOrder
    progress?: SortOrder
  }

  export type enrollSumOrderByAggregateInput = {
    progress?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type scoreStudentIdSubdomCompoundUniqueInput = {
    studentId: string
    subdom: string
  }

  export type scoreCountOrderByAggregateInput = {
    studentId?: SortOrder
    subdom?: SortOrder
    score?: SortOrder
    time_taken?: SortOrder
  }

  export type scoreAvgOrderByAggregateInput = {
    score?: SortOrder
    time_taken?: SortOrder
  }

  export type scoreMaxOrderByAggregateInput = {
    studentId?: SortOrder
    subdom?: SortOrder
    score?: SortOrder
    time_taken?: SortOrder
  }

  export type scoreMinOrderByAggregateInput = {
    studentId?: SortOrder
    subdom?: SortOrder
    score?: SortOrder
    time_taken?: SortOrder
  }

  export type scoreSumOrderByAggregateInput = {
    score?: SortOrder
    time_taken?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type reviewStudentIdCourseIdCompoundUniqueInput = {
    studentId: string
    courseId: string
  }

  export type reviewCountOrderByAggregateInput = {
    studentId?: SortOrder
    courseId?: SortOrder
    comment?: SortOrder
    rating?: SortOrder
  }

  export type reviewAvgOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type reviewMaxOrderByAggregateInput = {
    studentId?: SortOrder
    courseId?: SortOrder
    comment?: SortOrder
    rating?: SortOrder
  }

  export type reviewMinOrderByAggregateInput = {
    studentId?: SortOrder
    courseId?: SortOrder
    comment?: SortOrder
    rating?: SortOrder
  }

  export type reviewSumOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type enrollCreateNestedManyWithoutStudentInput = {
    create?: XOR<enrollCreateWithoutStudentInput, enrollUncheckedCreateWithoutStudentInput> | enrollCreateWithoutStudentInput[] | enrollUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: enrollCreateOrConnectWithoutStudentInput | enrollCreateOrConnectWithoutStudentInput[]
    createMany?: enrollCreateManyStudentInputEnvelope
    connect?: enrollWhereUniqueInput | enrollWhereUniqueInput[]
  }

  export type scoreCreateNestedManyWithoutStudentInput = {
    create?: XOR<scoreCreateWithoutStudentInput, scoreUncheckedCreateWithoutStudentInput> | scoreCreateWithoutStudentInput[] | scoreUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: scoreCreateOrConnectWithoutStudentInput | scoreCreateOrConnectWithoutStudentInput[]
    createMany?: scoreCreateManyStudentInputEnvelope
    connect?: scoreWhereUniqueInput | scoreWhereUniqueInput[]
  }

  export type reviewCreateNestedManyWithoutStudentInput = {
    create?: XOR<reviewCreateWithoutStudentInput, reviewUncheckedCreateWithoutStudentInput> | reviewCreateWithoutStudentInput[] | reviewUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: reviewCreateOrConnectWithoutStudentInput | reviewCreateOrConnectWithoutStudentInput[]
    createMany?: reviewCreateManyStudentInputEnvelope
    connect?: reviewWhereUniqueInput | reviewWhereUniqueInput[]
  }

  export type enrollUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<enrollCreateWithoutStudentInput, enrollUncheckedCreateWithoutStudentInput> | enrollCreateWithoutStudentInput[] | enrollUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: enrollCreateOrConnectWithoutStudentInput | enrollCreateOrConnectWithoutStudentInput[]
    createMany?: enrollCreateManyStudentInputEnvelope
    connect?: enrollWhereUniqueInput | enrollWhereUniqueInput[]
  }

  export type scoreUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<scoreCreateWithoutStudentInput, scoreUncheckedCreateWithoutStudentInput> | scoreCreateWithoutStudentInput[] | scoreUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: scoreCreateOrConnectWithoutStudentInput | scoreCreateOrConnectWithoutStudentInput[]
    createMany?: scoreCreateManyStudentInputEnvelope
    connect?: scoreWhereUniqueInput | scoreWhereUniqueInput[]
  }

  export type reviewUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<reviewCreateWithoutStudentInput, reviewUncheckedCreateWithoutStudentInput> | reviewCreateWithoutStudentInput[] | reviewUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: reviewCreateOrConnectWithoutStudentInput | reviewCreateOrConnectWithoutStudentInput[]
    createMany?: reviewCreateManyStudentInputEnvelope
    connect?: reviewWhereUniqueInput | reviewWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type EnumlevelFieldUpdateOperationsInput = {
    set?: $Enums.level
  }

  export type enrollUpdateManyWithoutStudentNestedInput = {
    create?: XOR<enrollCreateWithoutStudentInput, enrollUncheckedCreateWithoutStudentInput> | enrollCreateWithoutStudentInput[] | enrollUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: enrollCreateOrConnectWithoutStudentInput | enrollCreateOrConnectWithoutStudentInput[]
    upsert?: enrollUpsertWithWhereUniqueWithoutStudentInput | enrollUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: enrollCreateManyStudentInputEnvelope
    set?: enrollWhereUniqueInput | enrollWhereUniqueInput[]
    disconnect?: enrollWhereUniqueInput | enrollWhereUniqueInput[]
    delete?: enrollWhereUniqueInput | enrollWhereUniqueInput[]
    connect?: enrollWhereUniqueInput | enrollWhereUniqueInput[]
    update?: enrollUpdateWithWhereUniqueWithoutStudentInput | enrollUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: enrollUpdateManyWithWhereWithoutStudentInput | enrollUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: enrollScalarWhereInput | enrollScalarWhereInput[]
  }

  export type scoreUpdateManyWithoutStudentNestedInput = {
    create?: XOR<scoreCreateWithoutStudentInput, scoreUncheckedCreateWithoutStudentInput> | scoreCreateWithoutStudentInput[] | scoreUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: scoreCreateOrConnectWithoutStudentInput | scoreCreateOrConnectWithoutStudentInput[]
    upsert?: scoreUpsertWithWhereUniqueWithoutStudentInput | scoreUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: scoreCreateManyStudentInputEnvelope
    set?: scoreWhereUniqueInput | scoreWhereUniqueInput[]
    disconnect?: scoreWhereUniqueInput | scoreWhereUniqueInput[]
    delete?: scoreWhereUniqueInput | scoreWhereUniqueInput[]
    connect?: scoreWhereUniqueInput | scoreWhereUniqueInput[]
    update?: scoreUpdateWithWhereUniqueWithoutStudentInput | scoreUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: scoreUpdateManyWithWhereWithoutStudentInput | scoreUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: scoreScalarWhereInput | scoreScalarWhereInput[]
  }

  export type reviewUpdateManyWithoutStudentNestedInput = {
    create?: XOR<reviewCreateWithoutStudentInput, reviewUncheckedCreateWithoutStudentInput> | reviewCreateWithoutStudentInput[] | reviewUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: reviewCreateOrConnectWithoutStudentInput | reviewCreateOrConnectWithoutStudentInput[]
    upsert?: reviewUpsertWithWhereUniqueWithoutStudentInput | reviewUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: reviewCreateManyStudentInputEnvelope
    set?: reviewWhereUniqueInput | reviewWhereUniqueInput[]
    disconnect?: reviewWhereUniqueInput | reviewWhereUniqueInput[]
    delete?: reviewWhereUniqueInput | reviewWhereUniqueInput[]
    connect?: reviewWhereUniqueInput | reviewWhereUniqueInput[]
    update?: reviewUpdateWithWhereUniqueWithoutStudentInput | reviewUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: reviewUpdateManyWithWhereWithoutStudentInput | reviewUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: reviewScalarWhereInput | reviewScalarWhereInput[]
  }

  export type enrollUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<enrollCreateWithoutStudentInput, enrollUncheckedCreateWithoutStudentInput> | enrollCreateWithoutStudentInput[] | enrollUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: enrollCreateOrConnectWithoutStudentInput | enrollCreateOrConnectWithoutStudentInput[]
    upsert?: enrollUpsertWithWhereUniqueWithoutStudentInput | enrollUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: enrollCreateManyStudentInputEnvelope
    set?: enrollWhereUniqueInput | enrollWhereUniqueInput[]
    disconnect?: enrollWhereUniqueInput | enrollWhereUniqueInput[]
    delete?: enrollWhereUniqueInput | enrollWhereUniqueInput[]
    connect?: enrollWhereUniqueInput | enrollWhereUniqueInput[]
    update?: enrollUpdateWithWhereUniqueWithoutStudentInput | enrollUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: enrollUpdateManyWithWhereWithoutStudentInput | enrollUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: enrollScalarWhereInput | enrollScalarWhereInput[]
  }

  export type scoreUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<scoreCreateWithoutStudentInput, scoreUncheckedCreateWithoutStudentInput> | scoreCreateWithoutStudentInput[] | scoreUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: scoreCreateOrConnectWithoutStudentInput | scoreCreateOrConnectWithoutStudentInput[]
    upsert?: scoreUpsertWithWhereUniqueWithoutStudentInput | scoreUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: scoreCreateManyStudentInputEnvelope
    set?: scoreWhereUniqueInput | scoreWhereUniqueInput[]
    disconnect?: scoreWhereUniqueInput | scoreWhereUniqueInput[]
    delete?: scoreWhereUniqueInput | scoreWhereUniqueInput[]
    connect?: scoreWhereUniqueInput | scoreWhereUniqueInput[]
    update?: scoreUpdateWithWhereUniqueWithoutStudentInput | scoreUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: scoreUpdateManyWithWhereWithoutStudentInput | scoreUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: scoreScalarWhereInput | scoreScalarWhereInput[]
  }

  export type reviewUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<reviewCreateWithoutStudentInput, reviewUncheckedCreateWithoutStudentInput> | reviewCreateWithoutStudentInput[] | reviewUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: reviewCreateOrConnectWithoutStudentInput | reviewCreateOrConnectWithoutStudentInput[]
    upsert?: reviewUpsertWithWhereUniqueWithoutStudentInput | reviewUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: reviewCreateManyStudentInputEnvelope
    set?: reviewWhereUniqueInput | reviewWhereUniqueInput[]
    disconnect?: reviewWhereUniqueInput | reviewWhereUniqueInput[]
    delete?: reviewWhereUniqueInput | reviewWhereUniqueInput[]
    connect?: reviewWhereUniqueInput | reviewWhereUniqueInput[]
    update?: reviewUpdateWithWhereUniqueWithoutStudentInput | reviewUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: reviewUpdateManyWithWhereWithoutStudentInput | reviewUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: reviewScalarWhereInput | reviewScalarWhereInput[]
  }

  export type CourseCreateNestedManyWithoutTeacherInput = {
    create?: XOR<CourseCreateWithoutTeacherInput, CourseUncheckedCreateWithoutTeacherInput> | CourseCreateWithoutTeacherInput[] | CourseUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutTeacherInput | CourseCreateOrConnectWithoutTeacherInput[]
    createMany?: CourseCreateManyTeacherInputEnvelope
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
  }

  export type CourseUncheckedCreateNestedManyWithoutTeacherInput = {
    create?: XOR<CourseCreateWithoutTeacherInput, CourseUncheckedCreateWithoutTeacherInput> | CourseCreateWithoutTeacherInput[] | CourseUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutTeacherInput | CourseCreateOrConnectWithoutTeacherInput[]
    createMany?: CourseCreateManyTeacherInputEnvelope
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
  }

  export type CourseUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<CourseCreateWithoutTeacherInput, CourseUncheckedCreateWithoutTeacherInput> | CourseCreateWithoutTeacherInput[] | CourseUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutTeacherInput | CourseCreateOrConnectWithoutTeacherInput[]
    upsert?: CourseUpsertWithWhereUniqueWithoutTeacherInput | CourseUpsertWithWhereUniqueWithoutTeacherInput[]
    createMany?: CourseCreateManyTeacherInputEnvelope
    set?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    disconnect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    delete?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    update?: CourseUpdateWithWhereUniqueWithoutTeacherInput | CourseUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: CourseUpdateManyWithWhereWithoutTeacherInput | CourseUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: CourseScalarWhereInput | CourseScalarWhereInput[]
  }

  export type CourseUncheckedUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<CourseCreateWithoutTeacherInput, CourseUncheckedCreateWithoutTeacherInput> | CourseCreateWithoutTeacherInput[] | CourseUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutTeacherInput | CourseCreateOrConnectWithoutTeacherInput[]
    upsert?: CourseUpsertWithWhereUniqueWithoutTeacherInput | CourseUpsertWithWhereUniqueWithoutTeacherInput[]
    createMany?: CourseCreateManyTeacherInputEnvelope
    set?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    disconnect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    delete?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    update?: CourseUpdateWithWhereUniqueWithoutTeacherInput | CourseUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: CourseUpdateManyWithWhereWithoutTeacherInput | CourseUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: CourseScalarWhereInput | CourseScalarWhereInput[]
  }

  export type subDomainCreateNestedManyWithoutDomainInput = {
    create?: XOR<subDomainCreateWithoutDomainInput, subDomainUncheckedCreateWithoutDomainInput> | subDomainCreateWithoutDomainInput[] | subDomainUncheckedCreateWithoutDomainInput[]
    connectOrCreate?: subDomainCreateOrConnectWithoutDomainInput | subDomainCreateOrConnectWithoutDomainInput[]
    createMany?: subDomainCreateManyDomainInputEnvelope
    connect?: subDomainWhereUniqueInput | subDomainWhereUniqueInput[]
  }

  export type enrollCreateNestedManyWithoutDomainInput = {
    create?: XOR<enrollCreateWithoutDomainInput, enrollUncheckedCreateWithoutDomainInput> | enrollCreateWithoutDomainInput[] | enrollUncheckedCreateWithoutDomainInput[]
    connectOrCreate?: enrollCreateOrConnectWithoutDomainInput | enrollCreateOrConnectWithoutDomainInput[]
    createMany?: enrollCreateManyDomainInputEnvelope
    connect?: enrollWhereUniqueInput | enrollWhereUniqueInput[]
  }

  export type subDomainUncheckedCreateNestedManyWithoutDomainInput = {
    create?: XOR<subDomainCreateWithoutDomainInput, subDomainUncheckedCreateWithoutDomainInput> | subDomainCreateWithoutDomainInput[] | subDomainUncheckedCreateWithoutDomainInput[]
    connectOrCreate?: subDomainCreateOrConnectWithoutDomainInput | subDomainCreateOrConnectWithoutDomainInput[]
    createMany?: subDomainCreateManyDomainInputEnvelope
    connect?: subDomainWhereUniqueInput | subDomainWhereUniqueInput[]
  }

  export type enrollUncheckedCreateNestedManyWithoutDomainInput = {
    create?: XOR<enrollCreateWithoutDomainInput, enrollUncheckedCreateWithoutDomainInput> | enrollCreateWithoutDomainInput[] | enrollUncheckedCreateWithoutDomainInput[]
    connectOrCreate?: enrollCreateOrConnectWithoutDomainInput | enrollCreateOrConnectWithoutDomainInput[]
    createMany?: enrollCreateManyDomainInputEnvelope
    connect?: enrollWhereUniqueInput | enrollWhereUniqueInput[]
  }

  export type subDomainUpdateManyWithoutDomainNestedInput = {
    create?: XOR<subDomainCreateWithoutDomainInput, subDomainUncheckedCreateWithoutDomainInput> | subDomainCreateWithoutDomainInput[] | subDomainUncheckedCreateWithoutDomainInput[]
    connectOrCreate?: subDomainCreateOrConnectWithoutDomainInput | subDomainCreateOrConnectWithoutDomainInput[]
    upsert?: subDomainUpsertWithWhereUniqueWithoutDomainInput | subDomainUpsertWithWhereUniqueWithoutDomainInput[]
    createMany?: subDomainCreateManyDomainInputEnvelope
    set?: subDomainWhereUniqueInput | subDomainWhereUniqueInput[]
    disconnect?: subDomainWhereUniqueInput | subDomainWhereUniqueInput[]
    delete?: subDomainWhereUniqueInput | subDomainWhereUniqueInput[]
    connect?: subDomainWhereUniqueInput | subDomainWhereUniqueInput[]
    update?: subDomainUpdateWithWhereUniqueWithoutDomainInput | subDomainUpdateWithWhereUniqueWithoutDomainInput[]
    updateMany?: subDomainUpdateManyWithWhereWithoutDomainInput | subDomainUpdateManyWithWhereWithoutDomainInput[]
    deleteMany?: subDomainScalarWhereInput | subDomainScalarWhereInput[]
  }

  export type enrollUpdateManyWithoutDomainNestedInput = {
    create?: XOR<enrollCreateWithoutDomainInput, enrollUncheckedCreateWithoutDomainInput> | enrollCreateWithoutDomainInput[] | enrollUncheckedCreateWithoutDomainInput[]
    connectOrCreate?: enrollCreateOrConnectWithoutDomainInput | enrollCreateOrConnectWithoutDomainInput[]
    upsert?: enrollUpsertWithWhereUniqueWithoutDomainInput | enrollUpsertWithWhereUniqueWithoutDomainInput[]
    createMany?: enrollCreateManyDomainInputEnvelope
    set?: enrollWhereUniqueInput | enrollWhereUniqueInput[]
    disconnect?: enrollWhereUniqueInput | enrollWhereUniqueInput[]
    delete?: enrollWhereUniqueInput | enrollWhereUniqueInput[]
    connect?: enrollWhereUniqueInput | enrollWhereUniqueInput[]
    update?: enrollUpdateWithWhereUniqueWithoutDomainInput | enrollUpdateWithWhereUniqueWithoutDomainInput[]
    updateMany?: enrollUpdateManyWithWhereWithoutDomainInput | enrollUpdateManyWithWhereWithoutDomainInput[]
    deleteMany?: enrollScalarWhereInput | enrollScalarWhereInput[]
  }

  export type subDomainUncheckedUpdateManyWithoutDomainNestedInput = {
    create?: XOR<subDomainCreateWithoutDomainInput, subDomainUncheckedCreateWithoutDomainInput> | subDomainCreateWithoutDomainInput[] | subDomainUncheckedCreateWithoutDomainInput[]
    connectOrCreate?: subDomainCreateOrConnectWithoutDomainInput | subDomainCreateOrConnectWithoutDomainInput[]
    upsert?: subDomainUpsertWithWhereUniqueWithoutDomainInput | subDomainUpsertWithWhereUniqueWithoutDomainInput[]
    createMany?: subDomainCreateManyDomainInputEnvelope
    set?: subDomainWhereUniqueInput | subDomainWhereUniqueInput[]
    disconnect?: subDomainWhereUniqueInput | subDomainWhereUniqueInput[]
    delete?: subDomainWhereUniqueInput | subDomainWhereUniqueInput[]
    connect?: subDomainWhereUniqueInput | subDomainWhereUniqueInput[]
    update?: subDomainUpdateWithWhereUniqueWithoutDomainInput | subDomainUpdateWithWhereUniqueWithoutDomainInput[]
    updateMany?: subDomainUpdateManyWithWhereWithoutDomainInput | subDomainUpdateManyWithWhereWithoutDomainInput[]
    deleteMany?: subDomainScalarWhereInput | subDomainScalarWhereInput[]
  }

  export type enrollUncheckedUpdateManyWithoutDomainNestedInput = {
    create?: XOR<enrollCreateWithoutDomainInput, enrollUncheckedCreateWithoutDomainInput> | enrollCreateWithoutDomainInput[] | enrollUncheckedCreateWithoutDomainInput[]
    connectOrCreate?: enrollCreateOrConnectWithoutDomainInput | enrollCreateOrConnectWithoutDomainInput[]
    upsert?: enrollUpsertWithWhereUniqueWithoutDomainInput | enrollUpsertWithWhereUniqueWithoutDomainInput[]
    createMany?: enrollCreateManyDomainInputEnvelope
    set?: enrollWhereUniqueInput | enrollWhereUniqueInput[]
    disconnect?: enrollWhereUniqueInput | enrollWhereUniqueInput[]
    delete?: enrollWhereUniqueInput | enrollWhereUniqueInput[]
    connect?: enrollWhereUniqueInput | enrollWhereUniqueInput[]
    update?: enrollUpdateWithWhereUniqueWithoutDomainInput | enrollUpdateWithWhereUniqueWithoutDomainInput[]
    updateMany?: enrollUpdateManyWithWhereWithoutDomainInput | enrollUpdateManyWithWhereWithoutDomainInput[]
    deleteMany?: enrollScalarWhereInput | enrollScalarWhereInput[]
  }

  export type CourseCreateNestedManyWithoutSubdomainInput = {
    create?: XOR<CourseCreateWithoutSubdomainInput, CourseUncheckedCreateWithoutSubdomainInput> | CourseCreateWithoutSubdomainInput[] | CourseUncheckedCreateWithoutSubdomainInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutSubdomainInput | CourseCreateOrConnectWithoutSubdomainInput[]
    createMany?: CourseCreateManySubdomainInputEnvelope
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
  }

  export type DomainCreateNestedOneWithoutSubdomainsInput = {
    create?: XOR<DomainCreateWithoutSubdomainsInput, DomainUncheckedCreateWithoutSubdomainsInput>
    connectOrCreate?: DomainCreateOrConnectWithoutSubdomainsInput
    connect?: DomainWhereUniqueInput
  }

  export type scoreCreateNestedManyWithoutSubdomainInput = {
    create?: XOR<scoreCreateWithoutSubdomainInput, scoreUncheckedCreateWithoutSubdomainInput> | scoreCreateWithoutSubdomainInput[] | scoreUncheckedCreateWithoutSubdomainInput[]
    connectOrCreate?: scoreCreateOrConnectWithoutSubdomainInput | scoreCreateOrConnectWithoutSubdomainInput[]
    createMany?: scoreCreateManySubdomainInputEnvelope
    connect?: scoreWhereUniqueInput | scoreWhereUniqueInput[]
  }

  export type subDomainCreateNestedOneWithoutChildrenInput = {
    create?: XOR<subDomainCreateWithoutChildrenInput, subDomainUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: subDomainCreateOrConnectWithoutChildrenInput
    connect?: subDomainWhereUniqueInput
  }

  export type subDomainCreateNestedManyWithoutParentInput = {
    create?: XOR<subDomainCreateWithoutParentInput, subDomainUncheckedCreateWithoutParentInput> | subDomainCreateWithoutParentInput[] | subDomainUncheckedCreateWithoutParentInput[]
    connectOrCreate?: subDomainCreateOrConnectWithoutParentInput | subDomainCreateOrConnectWithoutParentInput[]
    createMany?: subDomainCreateManyParentInputEnvelope
    connect?: subDomainWhereUniqueInput | subDomainWhereUniqueInput[]
  }

  export type CourseUncheckedCreateNestedManyWithoutSubdomainInput = {
    create?: XOR<CourseCreateWithoutSubdomainInput, CourseUncheckedCreateWithoutSubdomainInput> | CourseCreateWithoutSubdomainInput[] | CourseUncheckedCreateWithoutSubdomainInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutSubdomainInput | CourseCreateOrConnectWithoutSubdomainInput[]
    createMany?: CourseCreateManySubdomainInputEnvelope
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
  }

  export type scoreUncheckedCreateNestedManyWithoutSubdomainInput = {
    create?: XOR<scoreCreateWithoutSubdomainInput, scoreUncheckedCreateWithoutSubdomainInput> | scoreCreateWithoutSubdomainInput[] | scoreUncheckedCreateWithoutSubdomainInput[]
    connectOrCreate?: scoreCreateOrConnectWithoutSubdomainInput | scoreCreateOrConnectWithoutSubdomainInput[]
    createMany?: scoreCreateManySubdomainInputEnvelope
    connect?: scoreWhereUniqueInput | scoreWhereUniqueInput[]
  }

  export type subDomainUncheckedCreateNestedManyWithoutParentInput = {
    create?: XOR<subDomainCreateWithoutParentInput, subDomainUncheckedCreateWithoutParentInput> | subDomainCreateWithoutParentInput[] | subDomainUncheckedCreateWithoutParentInput[]
    connectOrCreate?: subDomainCreateOrConnectWithoutParentInput | subDomainCreateOrConnectWithoutParentInput[]
    createMany?: subDomainCreateManyParentInputEnvelope
    connect?: subDomainWhereUniqueInput | subDomainWhereUniqueInput[]
  }

  export type CourseUpdateManyWithoutSubdomainNestedInput = {
    create?: XOR<CourseCreateWithoutSubdomainInput, CourseUncheckedCreateWithoutSubdomainInput> | CourseCreateWithoutSubdomainInput[] | CourseUncheckedCreateWithoutSubdomainInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutSubdomainInput | CourseCreateOrConnectWithoutSubdomainInput[]
    upsert?: CourseUpsertWithWhereUniqueWithoutSubdomainInput | CourseUpsertWithWhereUniqueWithoutSubdomainInput[]
    createMany?: CourseCreateManySubdomainInputEnvelope
    set?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    disconnect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    delete?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    update?: CourseUpdateWithWhereUniqueWithoutSubdomainInput | CourseUpdateWithWhereUniqueWithoutSubdomainInput[]
    updateMany?: CourseUpdateManyWithWhereWithoutSubdomainInput | CourseUpdateManyWithWhereWithoutSubdomainInput[]
    deleteMany?: CourseScalarWhereInput | CourseScalarWhereInput[]
  }

  export type DomainUpdateOneRequiredWithoutSubdomainsNestedInput = {
    create?: XOR<DomainCreateWithoutSubdomainsInput, DomainUncheckedCreateWithoutSubdomainsInput>
    connectOrCreate?: DomainCreateOrConnectWithoutSubdomainsInput
    upsert?: DomainUpsertWithoutSubdomainsInput
    connect?: DomainWhereUniqueInput
    update?: XOR<XOR<DomainUpdateToOneWithWhereWithoutSubdomainsInput, DomainUpdateWithoutSubdomainsInput>, DomainUncheckedUpdateWithoutSubdomainsInput>
  }

  export type scoreUpdateManyWithoutSubdomainNestedInput = {
    create?: XOR<scoreCreateWithoutSubdomainInput, scoreUncheckedCreateWithoutSubdomainInput> | scoreCreateWithoutSubdomainInput[] | scoreUncheckedCreateWithoutSubdomainInput[]
    connectOrCreate?: scoreCreateOrConnectWithoutSubdomainInput | scoreCreateOrConnectWithoutSubdomainInput[]
    upsert?: scoreUpsertWithWhereUniqueWithoutSubdomainInput | scoreUpsertWithWhereUniqueWithoutSubdomainInput[]
    createMany?: scoreCreateManySubdomainInputEnvelope
    set?: scoreWhereUniqueInput | scoreWhereUniqueInput[]
    disconnect?: scoreWhereUniqueInput | scoreWhereUniqueInput[]
    delete?: scoreWhereUniqueInput | scoreWhereUniqueInput[]
    connect?: scoreWhereUniqueInput | scoreWhereUniqueInput[]
    update?: scoreUpdateWithWhereUniqueWithoutSubdomainInput | scoreUpdateWithWhereUniqueWithoutSubdomainInput[]
    updateMany?: scoreUpdateManyWithWhereWithoutSubdomainInput | scoreUpdateManyWithWhereWithoutSubdomainInput[]
    deleteMany?: scoreScalarWhereInput | scoreScalarWhereInput[]
  }

  export type subDomainUpdateOneWithoutChildrenNestedInput = {
    create?: XOR<subDomainCreateWithoutChildrenInput, subDomainUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: subDomainCreateOrConnectWithoutChildrenInput
    upsert?: subDomainUpsertWithoutChildrenInput
    disconnect?: subDomainWhereInput | boolean
    delete?: subDomainWhereInput | boolean
    connect?: subDomainWhereUniqueInput
    update?: XOR<XOR<subDomainUpdateToOneWithWhereWithoutChildrenInput, subDomainUpdateWithoutChildrenInput>, subDomainUncheckedUpdateWithoutChildrenInput>
  }

  export type subDomainUpdateManyWithoutParentNestedInput = {
    create?: XOR<subDomainCreateWithoutParentInput, subDomainUncheckedCreateWithoutParentInput> | subDomainCreateWithoutParentInput[] | subDomainUncheckedCreateWithoutParentInput[]
    connectOrCreate?: subDomainCreateOrConnectWithoutParentInput | subDomainCreateOrConnectWithoutParentInput[]
    upsert?: subDomainUpsertWithWhereUniqueWithoutParentInput | subDomainUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: subDomainCreateManyParentInputEnvelope
    set?: subDomainWhereUniqueInput | subDomainWhereUniqueInput[]
    disconnect?: subDomainWhereUniqueInput | subDomainWhereUniqueInput[]
    delete?: subDomainWhereUniqueInput | subDomainWhereUniqueInput[]
    connect?: subDomainWhereUniqueInput | subDomainWhereUniqueInput[]
    update?: subDomainUpdateWithWhereUniqueWithoutParentInput | subDomainUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: subDomainUpdateManyWithWhereWithoutParentInput | subDomainUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: subDomainScalarWhereInput | subDomainScalarWhereInput[]
  }

  export type CourseUncheckedUpdateManyWithoutSubdomainNestedInput = {
    create?: XOR<CourseCreateWithoutSubdomainInput, CourseUncheckedCreateWithoutSubdomainInput> | CourseCreateWithoutSubdomainInput[] | CourseUncheckedCreateWithoutSubdomainInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutSubdomainInput | CourseCreateOrConnectWithoutSubdomainInput[]
    upsert?: CourseUpsertWithWhereUniqueWithoutSubdomainInput | CourseUpsertWithWhereUniqueWithoutSubdomainInput[]
    createMany?: CourseCreateManySubdomainInputEnvelope
    set?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    disconnect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    delete?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    update?: CourseUpdateWithWhereUniqueWithoutSubdomainInput | CourseUpdateWithWhereUniqueWithoutSubdomainInput[]
    updateMany?: CourseUpdateManyWithWhereWithoutSubdomainInput | CourseUpdateManyWithWhereWithoutSubdomainInput[]
    deleteMany?: CourseScalarWhereInput | CourseScalarWhereInput[]
  }

  export type scoreUncheckedUpdateManyWithoutSubdomainNestedInput = {
    create?: XOR<scoreCreateWithoutSubdomainInput, scoreUncheckedCreateWithoutSubdomainInput> | scoreCreateWithoutSubdomainInput[] | scoreUncheckedCreateWithoutSubdomainInput[]
    connectOrCreate?: scoreCreateOrConnectWithoutSubdomainInput | scoreCreateOrConnectWithoutSubdomainInput[]
    upsert?: scoreUpsertWithWhereUniqueWithoutSubdomainInput | scoreUpsertWithWhereUniqueWithoutSubdomainInput[]
    createMany?: scoreCreateManySubdomainInputEnvelope
    set?: scoreWhereUniqueInput | scoreWhereUniqueInput[]
    disconnect?: scoreWhereUniqueInput | scoreWhereUniqueInput[]
    delete?: scoreWhereUniqueInput | scoreWhereUniqueInput[]
    connect?: scoreWhereUniqueInput | scoreWhereUniqueInput[]
    update?: scoreUpdateWithWhereUniqueWithoutSubdomainInput | scoreUpdateWithWhereUniqueWithoutSubdomainInput[]
    updateMany?: scoreUpdateManyWithWhereWithoutSubdomainInput | scoreUpdateManyWithWhereWithoutSubdomainInput[]
    deleteMany?: scoreScalarWhereInput | scoreScalarWhereInput[]
  }

  export type subDomainUncheckedUpdateManyWithoutParentNestedInput = {
    create?: XOR<subDomainCreateWithoutParentInput, subDomainUncheckedCreateWithoutParentInput> | subDomainCreateWithoutParentInput[] | subDomainUncheckedCreateWithoutParentInput[]
    connectOrCreate?: subDomainCreateOrConnectWithoutParentInput | subDomainCreateOrConnectWithoutParentInput[]
    upsert?: subDomainUpsertWithWhereUniqueWithoutParentInput | subDomainUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: subDomainCreateManyParentInputEnvelope
    set?: subDomainWhereUniqueInput | subDomainWhereUniqueInput[]
    disconnect?: subDomainWhereUniqueInput | subDomainWhereUniqueInput[]
    delete?: subDomainWhereUniqueInput | subDomainWhereUniqueInput[]
    connect?: subDomainWhereUniqueInput | subDomainWhereUniqueInput[]
    update?: subDomainUpdateWithWhereUniqueWithoutParentInput | subDomainUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: subDomainUpdateManyWithWhereWithoutParentInput | subDomainUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: subDomainScalarWhereInput | subDomainScalarWhereInput[]
  }

  export type quizCreateNestedManyWithoutCourseInput = {
    create?: XOR<quizCreateWithoutCourseInput, quizUncheckedCreateWithoutCourseInput> | quizCreateWithoutCourseInput[] | quizUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: quizCreateOrConnectWithoutCourseInput | quizCreateOrConnectWithoutCourseInput[]
    createMany?: quizCreateManyCourseInputEnvelope
    connect?: quizWhereUniqueInput | quizWhereUniqueInput[]
  }

  export type subDomainCreateNestedOneWithoutCoursesInput = {
    create?: XOR<subDomainCreateWithoutCoursesInput, subDomainUncheckedCreateWithoutCoursesInput>
    connectOrCreate?: subDomainCreateOrConnectWithoutCoursesInput
    connect?: subDomainWhereUniqueInput
  }

  export type TeacherCreateNestedOneWithoutCoursesInput = {
    create?: XOR<TeacherCreateWithoutCoursesInput, TeacherUncheckedCreateWithoutCoursesInput>
    connectOrCreate?: TeacherCreateOrConnectWithoutCoursesInput
    connect?: TeacherWhereUniqueInput
  }

  export type reviewCreateNestedManyWithoutCourseInput = {
    create?: XOR<reviewCreateWithoutCourseInput, reviewUncheckedCreateWithoutCourseInput> | reviewCreateWithoutCourseInput[] | reviewUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: reviewCreateOrConnectWithoutCourseInput | reviewCreateOrConnectWithoutCourseInput[]
    createMany?: reviewCreateManyCourseInputEnvelope
    connect?: reviewWhereUniqueInput | reviewWhereUniqueInput[]
  }

  export type quizUncheckedCreateNestedManyWithoutCourseInput = {
    create?: XOR<quizCreateWithoutCourseInput, quizUncheckedCreateWithoutCourseInput> | quizCreateWithoutCourseInput[] | quizUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: quizCreateOrConnectWithoutCourseInput | quizCreateOrConnectWithoutCourseInput[]
    createMany?: quizCreateManyCourseInputEnvelope
    connect?: quizWhereUniqueInput | quizWhereUniqueInput[]
  }

  export type reviewUncheckedCreateNestedManyWithoutCourseInput = {
    create?: XOR<reviewCreateWithoutCourseInput, reviewUncheckedCreateWithoutCourseInput> | reviewCreateWithoutCourseInput[] | reviewUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: reviewCreateOrConnectWithoutCourseInput | reviewCreateOrConnectWithoutCourseInput[]
    createMany?: reviewCreateManyCourseInputEnvelope
    connect?: reviewWhereUniqueInput | reviewWhereUniqueInput[]
  }

  export type Enumcrs_typeFieldUpdateOperationsInput = {
    set?: $Enums.crs_type
  }

  export type quizUpdateManyWithoutCourseNestedInput = {
    create?: XOR<quizCreateWithoutCourseInput, quizUncheckedCreateWithoutCourseInput> | quizCreateWithoutCourseInput[] | quizUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: quizCreateOrConnectWithoutCourseInput | quizCreateOrConnectWithoutCourseInput[]
    upsert?: quizUpsertWithWhereUniqueWithoutCourseInput | quizUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: quizCreateManyCourseInputEnvelope
    set?: quizWhereUniqueInput | quizWhereUniqueInput[]
    disconnect?: quizWhereUniqueInput | quizWhereUniqueInput[]
    delete?: quizWhereUniqueInput | quizWhereUniqueInput[]
    connect?: quizWhereUniqueInput | quizWhereUniqueInput[]
    update?: quizUpdateWithWhereUniqueWithoutCourseInput | quizUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: quizUpdateManyWithWhereWithoutCourseInput | quizUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: quizScalarWhereInput | quizScalarWhereInput[]
  }

  export type subDomainUpdateOneRequiredWithoutCoursesNestedInput = {
    create?: XOR<subDomainCreateWithoutCoursesInput, subDomainUncheckedCreateWithoutCoursesInput>
    connectOrCreate?: subDomainCreateOrConnectWithoutCoursesInput
    upsert?: subDomainUpsertWithoutCoursesInput
    connect?: subDomainWhereUniqueInput
    update?: XOR<XOR<subDomainUpdateToOneWithWhereWithoutCoursesInput, subDomainUpdateWithoutCoursesInput>, subDomainUncheckedUpdateWithoutCoursesInput>
  }

  export type TeacherUpdateOneRequiredWithoutCoursesNestedInput = {
    create?: XOR<TeacherCreateWithoutCoursesInput, TeacherUncheckedCreateWithoutCoursesInput>
    connectOrCreate?: TeacherCreateOrConnectWithoutCoursesInput
    upsert?: TeacherUpsertWithoutCoursesInput
    connect?: TeacherWhereUniqueInput
    update?: XOR<XOR<TeacherUpdateToOneWithWhereWithoutCoursesInput, TeacherUpdateWithoutCoursesInput>, TeacherUncheckedUpdateWithoutCoursesInput>
  }

  export type reviewUpdateManyWithoutCourseNestedInput = {
    create?: XOR<reviewCreateWithoutCourseInput, reviewUncheckedCreateWithoutCourseInput> | reviewCreateWithoutCourseInput[] | reviewUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: reviewCreateOrConnectWithoutCourseInput | reviewCreateOrConnectWithoutCourseInput[]
    upsert?: reviewUpsertWithWhereUniqueWithoutCourseInput | reviewUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: reviewCreateManyCourseInputEnvelope
    set?: reviewWhereUniqueInput | reviewWhereUniqueInput[]
    disconnect?: reviewWhereUniqueInput | reviewWhereUniqueInput[]
    delete?: reviewWhereUniqueInput | reviewWhereUniqueInput[]
    connect?: reviewWhereUniqueInput | reviewWhereUniqueInput[]
    update?: reviewUpdateWithWhereUniqueWithoutCourseInput | reviewUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: reviewUpdateManyWithWhereWithoutCourseInput | reviewUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: reviewScalarWhereInput | reviewScalarWhereInput[]
  }

  export type quizUncheckedUpdateManyWithoutCourseNestedInput = {
    create?: XOR<quizCreateWithoutCourseInput, quizUncheckedCreateWithoutCourseInput> | quizCreateWithoutCourseInput[] | quizUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: quizCreateOrConnectWithoutCourseInput | quizCreateOrConnectWithoutCourseInput[]
    upsert?: quizUpsertWithWhereUniqueWithoutCourseInput | quizUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: quizCreateManyCourseInputEnvelope
    set?: quizWhereUniqueInput | quizWhereUniqueInput[]
    disconnect?: quizWhereUniqueInput | quizWhereUniqueInput[]
    delete?: quizWhereUniqueInput | quizWhereUniqueInput[]
    connect?: quizWhereUniqueInput | quizWhereUniqueInput[]
    update?: quizUpdateWithWhereUniqueWithoutCourseInput | quizUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: quizUpdateManyWithWhereWithoutCourseInput | quizUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: quizScalarWhereInput | quizScalarWhereInput[]
  }

  export type reviewUncheckedUpdateManyWithoutCourseNestedInput = {
    create?: XOR<reviewCreateWithoutCourseInput, reviewUncheckedCreateWithoutCourseInput> | reviewCreateWithoutCourseInput[] | reviewUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: reviewCreateOrConnectWithoutCourseInput | reviewCreateOrConnectWithoutCourseInput[]
    upsert?: reviewUpsertWithWhereUniqueWithoutCourseInput | reviewUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: reviewCreateManyCourseInputEnvelope
    set?: reviewWhereUniqueInput | reviewWhereUniqueInput[]
    disconnect?: reviewWhereUniqueInput | reviewWhereUniqueInput[]
    delete?: reviewWhereUniqueInput | reviewWhereUniqueInput[]
    connect?: reviewWhereUniqueInput | reviewWhereUniqueInput[]
    update?: reviewUpdateWithWhereUniqueWithoutCourseInput | reviewUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: reviewUpdateManyWithWhereWithoutCourseInput | reviewUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: reviewScalarWhereInput | reviewScalarWhereInput[]
  }

  export type q_responseCreateNestedManyWithoutQuizInput = {
    create?: XOR<q_responseCreateWithoutQuizInput, q_responseUncheckedCreateWithoutQuizInput> | q_responseCreateWithoutQuizInput[] | q_responseUncheckedCreateWithoutQuizInput[]
    connectOrCreate?: q_responseCreateOrConnectWithoutQuizInput | q_responseCreateOrConnectWithoutQuizInput[]
    createMany?: q_responseCreateManyQuizInputEnvelope
    connect?: q_responseWhereUniqueInput | q_responseWhereUniqueInput[]
  }

  export type CourseCreateNestedOneWithoutQuizzesInput = {
    create?: XOR<CourseCreateWithoutQuizzesInput, CourseUncheckedCreateWithoutQuizzesInput>
    connectOrCreate?: CourseCreateOrConnectWithoutQuizzesInput
    connect?: CourseWhereUniqueInput
  }

  export type q_responseUncheckedCreateNestedManyWithoutQuizInput = {
    create?: XOR<q_responseCreateWithoutQuizInput, q_responseUncheckedCreateWithoutQuizInput> | q_responseCreateWithoutQuizInput[] | q_responseUncheckedCreateWithoutQuizInput[]
    connectOrCreate?: q_responseCreateOrConnectWithoutQuizInput | q_responseCreateOrConnectWithoutQuizInput[]
    createMany?: q_responseCreateManyQuizInputEnvelope
    connect?: q_responseWhereUniqueInput | q_responseWhereUniqueInput[]
  }

  export type EnumdifficultyFieldUpdateOperationsInput = {
    set?: $Enums.difficulty
  }

  export type q_responseUpdateManyWithoutQuizNestedInput = {
    create?: XOR<q_responseCreateWithoutQuizInput, q_responseUncheckedCreateWithoutQuizInput> | q_responseCreateWithoutQuizInput[] | q_responseUncheckedCreateWithoutQuizInput[]
    connectOrCreate?: q_responseCreateOrConnectWithoutQuizInput | q_responseCreateOrConnectWithoutQuizInput[]
    upsert?: q_responseUpsertWithWhereUniqueWithoutQuizInput | q_responseUpsertWithWhereUniqueWithoutQuizInput[]
    createMany?: q_responseCreateManyQuizInputEnvelope
    set?: q_responseWhereUniqueInput | q_responseWhereUniqueInput[]
    disconnect?: q_responseWhereUniqueInput | q_responseWhereUniqueInput[]
    delete?: q_responseWhereUniqueInput | q_responseWhereUniqueInput[]
    connect?: q_responseWhereUniqueInput | q_responseWhereUniqueInput[]
    update?: q_responseUpdateWithWhereUniqueWithoutQuizInput | q_responseUpdateWithWhereUniqueWithoutQuizInput[]
    updateMany?: q_responseUpdateManyWithWhereWithoutQuizInput | q_responseUpdateManyWithWhereWithoutQuizInput[]
    deleteMany?: q_responseScalarWhereInput | q_responseScalarWhereInput[]
  }

  export type CourseUpdateOneRequiredWithoutQuizzesNestedInput = {
    create?: XOR<CourseCreateWithoutQuizzesInput, CourseUncheckedCreateWithoutQuizzesInput>
    connectOrCreate?: CourseCreateOrConnectWithoutQuizzesInput
    upsert?: CourseUpsertWithoutQuizzesInput
    connect?: CourseWhereUniqueInput
    update?: XOR<XOR<CourseUpdateToOneWithWhereWithoutQuizzesInput, CourseUpdateWithoutQuizzesInput>, CourseUncheckedUpdateWithoutQuizzesInput>
  }

  export type q_responseUncheckedUpdateManyWithoutQuizNestedInput = {
    create?: XOR<q_responseCreateWithoutQuizInput, q_responseUncheckedCreateWithoutQuizInput> | q_responseCreateWithoutQuizInput[] | q_responseUncheckedCreateWithoutQuizInput[]
    connectOrCreate?: q_responseCreateOrConnectWithoutQuizInput | q_responseCreateOrConnectWithoutQuizInput[]
    upsert?: q_responseUpsertWithWhereUniqueWithoutQuizInput | q_responseUpsertWithWhereUniqueWithoutQuizInput[]
    createMany?: q_responseCreateManyQuizInputEnvelope
    set?: q_responseWhereUniqueInput | q_responseWhereUniqueInput[]
    disconnect?: q_responseWhereUniqueInput | q_responseWhereUniqueInput[]
    delete?: q_responseWhereUniqueInput | q_responseWhereUniqueInput[]
    connect?: q_responseWhereUniqueInput | q_responseWhereUniqueInput[]
    update?: q_responseUpdateWithWhereUniqueWithoutQuizInput | q_responseUpdateWithWhereUniqueWithoutQuizInput[]
    updateMany?: q_responseUpdateManyWithWhereWithoutQuizInput | q_responseUpdateManyWithWhereWithoutQuizInput[]
    deleteMany?: q_responseScalarWhereInput | q_responseScalarWhereInput[]
  }

  export type quizCreateNestedOneWithoutResponsesInput = {
    create?: XOR<quizCreateWithoutResponsesInput, quizUncheckedCreateWithoutResponsesInput>
    connectOrCreate?: quizCreateOrConnectWithoutResponsesInput
    connect?: quizWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type quizUpdateOneRequiredWithoutResponsesNestedInput = {
    create?: XOR<quizCreateWithoutResponsesInput, quizUncheckedCreateWithoutResponsesInput>
    connectOrCreate?: quizCreateOrConnectWithoutResponsesInput
    upsert?: quizUpsertWithoutResponsesInput
    connect?: quizWhereUniqueInput
    update?: XOR<XOR<quizUpdateToOneWithWhereWithoutResponsesInput, quizUpdateWithoutResponsesInput>, quizUncheckedUpdateWithoutResponsesInput>
  }

  export type StudentCreateNestedOneWithoutEnrollInput = {
    create?: XOR<StudentCreateWithoutEnrollInput, StudentUncheckedCreateWithoutEnrollInput>
    connectOrCreate?: StudentCreateOrConnectWithoutEnrollInput
    connect?: StudentWhereUniqueInput
  }

  export type DomainCreateNestedOneWithoutEnrollInput = {
    create?: XOR<DomainCreateWithoutEnrollInput, DomainUncheckedCreateWithoutEnrollInput>
    connectOrCreate?: DomainCreateOrConnectWithoutEnrollInput
    connect?: DomainWhereUniqueInput
  }

  export type StudentUpdateOneRequiredWithoutEnrollNestedInput = {
    create?: XOR<StudentCreateWithoutEnrollInput, StudentUncheckedCreateWithoutEnrollInput>
    connectOrCreate?: StudentCreateOrConnectWithoutEnrollInput
    upsert?: StudentUpsertWithoutEnrollInput
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutEnrollInput, StudentUpdateWithoutEnrollInput>, StudentUncheckedUpdateWithoutEnrollInput>
  }

  export type DomainUpdateOneRequiredWithoutEnrollNestedInput = {
    create?: XOR<DomainCreateWithoutEnrollInput, DomainUncheckedCreateWithoutEnrollInput>
    connectOrCreate?: DomainCreateOrConnectWithoutEnrollInput
    upsert?: DomainUpsertWithoutEnrollInput
    connect?: DomainWhereUniqueInput
    update?: XOR<XOR<DomainUpdateToOneWithWhereWithoutEnrollInput, DomainUpdateWithoutEnrollInput>, DomainUncheckedUpdateWithoutEnrollInput>
  }

  export type StudentCreateNestedOneWithoutScoreInput = {
    create?: XOR<StudentCreateWithoutScoreInput, StudentUncheckedCreateWithoutScoreInput>
    connectOrCreate?: StudentCreateOrConnectWithoutScoreInput
    connect?: StudentWhereUniqueInput
  }

  export type subDomainCreateNestedOneWithoutScoreInput = {
    create?: XOR<subDomainCreateWithoutScoreInput, subDomainUncheckedCreateWithoutScoreInput>
    connectOrCreate?: subDomainCreateOrConnectWithoutScoreInput
    connect?: subDomainWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type StudentUpdateOneRequiredWithoutScoreNestedInput = {
    create?: XOR<StudentCreateWithoutScoreInput, StudentUncheckedCreateWithoutScoreInput>
    connectOrCreate?: StudentCreateOrConnectWithoutScoreInput
    upsert?: StudentUpsertWithoutScoreInput
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutScoreInput, StudentUpdateWithoutScoreInput>, StudentUncheckedUpdateWithoutScoreInput>
  }

  export type subDomainUpdateOneRequiredWithoutScoreNestedInput = {
    create?: XOR<subDomainCreateWithoutScoreInput, subDomainUncheckedCreateWithoutScoreInput>
    connectOrCreate?: subDomainCreateOrConnectWithoutScoreInput
    upsert?: subDomainUpsertWithoutScoreInput
    connect?: subDomainWhereUniqueInput
    update?: XOR<XOR<subDomainUpdateToOneWithWhereWithoutScoreInput, subDomainUpdateWithoutScoreInput>, subDomainUncheckedUpdateWithoutScoreInput>
  }

  export type StudentCreateNestedOneWithoutReviewInput = {
    create?: XOR<StudentCreateWithoutReviewInput, StudentUncheckedCreateWithoutReviewInput>
    connectOrCreate?: StudentCreateOrConnectWithoutReviewInput
    connect?: StudentWhereUniqueInput
  }

  export type CourseCreateNestedOneWithoutReviewInput = {
    create?: XOR<CourseCreateWithoutReviewInput, CourseUncheckedCreateWithoutReviewInput>
    connectOrCreate?: CourseCreateOrConnectWithoutReviewInput
    connect?: CourseWhereUniqueInput
  }

  export type StudentUpdateOneRequiredWithoutReviewNestedInput = {
    create?: XOR<StudentCreateWithoutReviewInput, StudentUncheckedCreateWithoutReviewInput>
    connectOrCreate?: StudentCreateOrConnectWithoutReviewInput
    upsert?: StudentUpsertWithoutReviewInput
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutReviewInput, StudentUpdateWithoutReviewInput>, StudentUncheckedUpdateWithoutReviewInput>
  }

  export type CourseUpdateOneRequiredWithoutReviewNestedInput = {
    create?: XOR<CourseCreateWithoutReviewInput, CourseUncheckedCreateWithoutReviewInput>
    connectOrCreate?: CourseCreateOrConnectWithoutReviewInput
    upsert?: CourseUpsertWithoutReviewInput
    connect?: CourseWhereUniqueInput
    update?: XOR<XOR<CourseUpdateToOneWithWhereWithoutReviewInput, CourseUpdateWithoutReviewInput>, CourseUncheckedUpdateWithoutReviewInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedEnumlevelFilter<$PrismaModel = never> = {
    equals?: $Enums.level | EnumlevelFieldRefInput<$PrismaModel>
    in?: $Enums.level[] | ListEnumlevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.level[] | ListEnumlevelFieldRefInput<$PrismaModel>
    not?: NestedEnumlevelFilter<$PrismaModel> | $Enums.level
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumlevelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.level | EnumlevelFieldRefInput<$PrismaModel>
    in?: $Enums.level[] | ListEnumlevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.level[] | ListEnumlevelFieldRefInput<$PrismaModel>
    not?: NestedEnumlevelWithAggregatesFilter<$PrismaModel> | $Enums.level
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumlevelFilter<$PrismaModel>
    _max?: NestedEnumlevelFilter<$PrismaModel>
  }

  export type NestedEnumcrs_typeFilter<$PrismaModel = never> = {
    equals?: $Enums.crs_type | Enumcrs_typeFieldRefInput<$PrismaModel>
    in?: $Enums.crs_type[] | ListEnumcrs_typeFieldRefInput<$PrismaModel>
    notIn?: $Enums.crs_type[] | ListEnumcrs_typeFieldRefInput<$PrismaModel>
    not?: NestedEnumcrs_typeFilter<$PrismaModel> | $Enums.crs_type
  }

  export type NestedEnumcrs_typeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.crs_type | Enumcrs_typeFieldRefInput<$PrismaModel>
    in?: $Enums.crs_type[] | ListEnumcrs_typeFieldRefInput<$PrismaModel>
    notIn?: $Enums.crs_type[] | ListEnumcrs_typeFieldRefInput<$PrismaModel>
    not?: NestedEnumcrs_typeWithAggregatesFilter<$PrismaModel> | $Enums.crs_type
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumcrs_typeFilter<$PrismaModel>
    _max?: NestedEnumcrs_typeFilter<$PrismaModel>
  }

  export type NestedEnumdifficultyFilter<$PrismaModel = never> = {
    equals?: $Enums.difficulty | EnumdifficultyFieldRefInput<$PrismaModel>
    in?: $Enums.difficulty[] | ListEnumdifficultyFieldRefInput<$PrismaModel>
    notIn?: $Enums.difficulty[] | ListEnumdifficultyFieldRefInput<$PrismaModel>
    not?: NestedEnumdifficultyFilter<$PrismaModel> | $Enums.difficulty
  }

  export type NestedEnumdifficultyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.difficulty | EnumdifficultyFieldRefInput<$PrismaModel>
    in?: $Enums.difficulty[] | ListEnumdifficultyFieldRefInput<$PrismaModel>
    notIn?: $Enums.difficulty[] | ListEnumdifficultyFieldRefInput<$PrismaModel>
    not?: NestedEnumdifficultyWithAggregatesFilter<$PrismaModel> | $Enums.difficulty
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumdifficultyFilter<$PrismaModel>
    _max?: NestedEnumdifficultyFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type enrollCreateWithoutStudentInput = {
    progress: number
    domain: DomainCreateNestedOneWithoutEnrollInput
  }

  export type enrollUncheckedCreateWithoutStudentInput = {
    domainId: string
    progress: number
  }

  export type enrollCreateOrConnectWithoutStudentInput = {
    where: enrollWhereUniqueInput
    create: XOR<enrollCreateWithoutStudentInput, enrollUncheckedCreateWithoutStudentInput>
  }

  export type enrollCreateManyStudentInputEnvelope = {
    data: enrollCreateManyStudentInput | enrollCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type scoreCreateWithoutStudentInput = {
    score: number
    time_taken: number
    subdomain: subDomainCreateNestedOneWithoutScoreInput
  }

  export type scoreUncheckedCreateWithoutStudentInput = {
    subdom: string
    score: number
    time_taken: number
  }

  export type scoreCreateOrConnectWithoutStudentInput = {
    where: scoreWhereUniqueInput
    create: XOR<scoreCreateWithoutStudentInput, scoreUncheckedCreateWithoutStudentInput>
  }

  export type scoreCreateManyStudentInputEnvelope = {
    data: scoreCreateManyStudentInput | scoreCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type reviewCreateWithoutStudentInput = {
    comment: string
    rating: number
    course: CourseCreateNestedOneWithoutReviewInput
  }

  export type reviewUncheckedCreateWithoutStudentInput = {
    courseId: string
    comment: string
    rating: number
  }

  export type reviewCreateOrConnectWithoutStudentInput = {
    where: reviewWhereUniqueInput
    create: XOR<reviewCreateWithoutStudentInput, reviewUncheckedCreateWithoutStudentInput>
  }

  export type reviewCreateManyStudentInputEnvelope = {
    data: reviewCreateManyStudentInput | reviewCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type enrollUpsertWithWhereUniqueWithoutStudentInput = {
    where: enrollWhereUniqueInput
    update: XOR<enrollUpdateWithoutStudentInput, enrollUncheckedUpdateWithoutStudentInput>
    create: XOR<enrollCreateWithoutStudentInput, enrollUncheckedCreateWithoutStudentInput>
  }

  export type enrollUpdateWithWhereUniqueWithoutStudentInput = {
    where: enrollWhereUniqueInput
    data: XOR<enrollUpdateWithoutStudentInput, enrollUncheckedUpdateWithoutStudentInput>
  }

  export type enrollUpdateManyWithWhereWithoutStudentInput = {
    where: enrollScalarWhereInput
    data: XOR<enrollUpdateManyMutationInput, enrollUncheckedUpdateManyWithoutStudentInput>
  }

  export type enrollScalarWhereInput = {
    AND?: enrollScalarWhereInput | enrollScalarWhereInput[]
    OR?: enrollScalarWhereInput[]
    NOT?: enrollScalarWhereInput | enrollScalarWhereInput[]
    studentId?: StringFilter<"enroll"> | string
    domainId?: StringFilter<"enroll"> | string
    progress?: IntFilter<"enroll"> | number
  }

  export type scoreUpsertWithWhereUniqueWithoutStudentInput = {
    where: scoreWhereUniqueInput
    update: XOR<scoreUpdateWithoutStudentInput, scoreUncheckedUpdateWithoutStudentInput>
    create: XOR<scoreCreateWithoutStudentInput, scoreUncheckedCreateWithoutStudentInput>
  }

  export type scoreUpdateWithWhereUniqueWithoutStudentInput = {
    where: scoreWhereUniqueInput
    data: XOR<scoreUpdateWithoutStudentInput, scoreUncheckedUpdateWithoutStudentInput>
  }

  export type scoreUpdateManyWithWhereWithoutStudentInput = {
    where: scoreScalarWhereInput
    data: XOR<scoreUpdateManyMutationInput, scoreUncheckedUpdateManyWithoutStudentInput>
  }

  export type scoreScalarWhereInput = {
    AND?: scoreScalarWhereInput | scoreScalarWhereInput[]
    OR?: scoreScalarWhereInput[]
    NOT?: scoreScalarWhereInput | scoreScalarWhereInput[]
    studentId?: StringFilter<"score"> | string
    subdom?: StringFilter<"score"> | string
    score?: FloatFilter<"score"> | number
    time_taken?: IntFilter<"score"> | number
  }

  export type reviewUpsertWithWhereUniqueWithoutStudentInput = {
    where: reviewWhereUniqueInput
    update: XOR<reviewUpdateWithoutStudentInput, reviewUncheckedUpdateWithoutStudentInput>
    create: XOR<reviewCreateWithoutStudentInput, reviewUncheckedCreateWithoutStudentInput>
  }

  export type reviewUpdateWithWhereUniqueWithoutStudentInput = {
    where: reviewWhereUniqueInput
    data: XOR<reviewUpdateWithoutStudentInput, reviewUncheckedUpdateWithoutStudentInput>
  }

  export type reviewUpdateManyWithWhereWithoutStudentInput = {
    where: reviewScalarWhereInput
    data: XOR<reviewUpdateManyMutationInput, reviewUncheckedUpdateManyWithoutStudentInput>
  }

  export type reviewScalarWhereInput = {
    AND?: reviewScalarWhereInput | reviewScalarWhereInput[]
    OR?: reviewScalarWhereInput[]
    NOT?: reviewScalarWhereInput | reviewScalarWhereInput[]
    studentId?: StringFilter<"review"> | string
    courseId?: StringFilter<"review"> | string
    comment?: StringFilter<"review"> | string
    rating?: IntFilter<"review"> | number
  }

  export type CourseCreateWithoutTeacherInput = {
    crs_id?: string
    crs_title: string
    crs_type: $Enums.crs_type
    vd_link?: string | null
    pdf_file?: string | null
    article_content?: string | null
    quizzes?: quizCreateNestedManyWithoutCourseInput
    subdomain: subDomainCreateNestedOneWithoutCoursesInput
    review?: reviewCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateWithoutTeacherInput = {
    crs_id?: string
    crs_title: string
    crs_type: $Enums.crs_type
    vd_link?: string | null
    pdf_file?: string | null
    article_content?: string | null
    subdom: string
    quizzes?: quizUncheckedCreateNestedManyWithoutCourseInput
    review?: reviewUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseCreateOrConnectWithoutTeacherInput = {
    where: CourseWhereUniqueInput
    create: XOR<CourseCreateWithoutTeacherInput, CourseUncheckedCreateWithoutTeacherInput>
  }

  export type CourseCreateManyTeacherInputEnvelope = {
    data: CourseCreateManyTeacherInput | CourseCreateManyTeacherInput[]
    skipDuplicates?: boolean
  }

  export type CourseUpsertWithWhereUniqueWithoutTeacherInput = {
    where: CourseWhereUniqueInput
    update: XOR<CourseUpdateWithoutTeacherInput, CourseUncheckedUpdateWithoutTeacherInput>
    create: XOR<CourseCreateWithoutTeacherInput, CourseUncheckedCreateWithoutTeacherInput>
  }

  export type CourseUpdateWithWhereUniqueWithoutTeacherInput = {
    where: CourseWhereUniqueInput
    data: XOR<CourseUpdateWithoutTeacherInput, CourseUncheckedUpdateWithoutTeacherInput>
  }

  export type CourseUpdateManyWithWhereWithoutTeacherInput = {
    where: CourseScalarWhereInput
    data: XOR<CourseUpdateManyMutationInput, CourseUncheckedUpdateManyWithoutTeacherInput>
  }

  export type CourseScalarWhereInput = {
    AND?: CourseScalarWhereInput | CourseScalarWhereInput[]
    OR?: CourseScalarWhereInput[]
    NOT?: CourseScalarWhereInput | CourseScalarWhereInput[]
    crs_id?: StringFilter<"Course"> | string
    crs_title?: StringFilter<"Course"> | string
    crs_type?: Enumcrs_typeFilter<"Course"> | $Enums.crs_type
    vd_link?: StringNullableFilter<"Course"> | string | null
    pdf_file?: StringNullableFilter<"Course"> | string | null
    article_content?: StringNullableFilter<"Course"> | string | null
    subdom?: StringFilter<"Course"> | string
    teacherId?: StringFilter<"Course"> | string
  }

  export type subDomainCreateWithoutDomainInput = {
    subdom_id?: string
    subdom_title: string
    courses?: CourseCreateNestedManyWithoutSubdomainInput
    score?: scoreCreateNestedManyWithoutSubdomainInput
    parent?: subDomainCreateNestedOneWithoutChildrenInput
    children?: subDomainCreateNestedManyWithoutParentInput
  }

  export type subDomainUncheckedCreateWithoutDomainInput = {
    subdom_id?: string
    subdom_title: string
    parentId?: string | null
    courses?: CourseUncheckedCreateNestedManyWithoutSubdomainInput
    score?: scoreUncheckedCreateNestedManyWithoutSubdomainInput
    children?: subDomainUncheckedCreateNestedManyWithoutParentInput
  }

  export type subDomainCreateOrConnectWithoutDomainInput = {
    where: subDomainWhereUniqueInput
    create: XOR<subDomainCreateWithoutDomainInput, subDomainUncheckedCreateWithoutDomainInput>
  }

  export type subDomainCreateManyDomainInputEnvelope = {
    data: subDomainCreateManyDomainInput | subDomainCreateManyDomainInput[]
    skipDuplicates?: boolean
  }

  export type enrollCreateWithoutDomainInput = {
    progress: number
    student: StudentCreateNestedOneWithoutEnrollInput
  }

  export type enrollUncheckedCreateWithoutDomainInput = {
    studentId: string
    progress: number
  }

  export type enrollCreateOrConnectWithoutDomainInput = {
    where: enrollWhereUniqueInput
    create: XOR<enrollCreateWithoutDomainInput, enrollUncheckedCreateWithoutDomainInput>
  }

  export type enrollCreateManyDomainInputEnvelope = {
    data: enrollCreateManyDomainInput | enrollCreateManyDomainInput[]
    skipDuplicates?: boolean
  }

  export type subDomainUpsertWithWhereUniqueWithoutDomainInput = {
    where: subDomainWhereUniqueInput
    update: XOR<subDomainUpdateWithoutDomainInput, subDomainUncheckedUpdateWithoutDomainInput>
    create: XOR<subDomainCreateWithoutDomainInput, subDomainUncheckedCreateWithoutDomainInput>
  }

  export type subDomainUpdateWithWhereUniqueWithoutDomainInput = {
    where: subDomainWhereUniqueInput
    data: XOR<subDomainUpdateWithoutDomainInput, subDomainUncheckedUpdateWithoutDomainInput>
  }

  export type subDomainUpdateManyWithWhereWithoutDomainInput = {
    where: subDomainScalarWhereInput
    data: XOR<subDomainUpdateManyMutationInput, subDomainUncheckedUpdateManyWithoutDomainInput>
  }

  export type subDomainScalarWhereInput = {
    AND?: subDomainScalarWhereInput | subDomainScalarWhereInput[]
    OR?: subDomainScalarWhereInput[]
    NOT?: subDomainScalarWhereInput | subDomainScalarWhereInput[]
    subdom_id?: StringFilter<"subDomain"> | string
    subdom_title?: StringFilter<"subDomain"> | string
    domainId?: StringFilter<"subDomain"> | string
    parentId?: StringNullableFilter<"subDomain"> | string | null
  }

  export type enrollUpsertWithWhereUniqueWithoutDomainInput = {
    where: enrollWhereUniqueInput
    update: XOR<enrollUpdateWithoutDomainInput, enrollUncheckedUpdateWithoutDomainInput>
    create: XOR<enrollCreateWithoutDomainInput, enrollUncheckedCreateWithoutDomainInput>
  }

  export type enrollUpdateWithWhereUniqueWithoutDomainInput = {
    where: enrollWhereUniqueInput
    data: XOR<enrollUpdateWithoutDomainInput, enrollUncheckedUpdateWithoutDomainInput>
  }

  export type enrollUpdateManyWithWhereWithoutDomainInput = {
    where: enrollScalarWhereInput
    data: XOR<enrollUpdateManyMutationInput, enrollUncheckedUpdateManyWithoutDomainInput>
  }

  export type CourseCreateWithoutSubdomainInput = {
    crs_id?: string
    crs_title: string
    crs_type: $Enums.crs_type
    vd_link?: string | null
    pdf_file?: string | null
    article_content?: string | null
    quizzes?: quizCreateNestedManyWithoutCourseInput
    teacher: TeacherCreateNestedOneWithoutCoursesInput
    review?: reviewCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateWithoutSubdomainInput = {
    crs_id?: string
    crs_title: string
    crs_type: $Enums.crs_type
    vd_link?: string | null
    pdf_file?: string | null
    article_content?: string | null
    teacherId: string
    quizzes?: quizUncheckedCreateNestedManyWithoutCourseInput
    review?: reviewUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseCreateOrConnectWithoutSubdomainInput = {
    where: CourseWhereUniqueInput
    create: XOR<CourseCreateWithoutSubdomainInput, CourseUncheckedCreateWithoutSubdomainInput>
  }

  export type CourseCreateManySubdomainInputEnvelope = {
    data: CourseCreateManySubdomainInput | CourseCreateManySubdomainInput[]
    skipDuplicates?: boolean
  }

  export type DomainCreateWithoutSubdomainsInput = {
    dmn_id?: string
    dmn_title: string
    dmn_dscrptn: string
    dmn_duration: number
    enroll?: enrollCreateNestedManyWithoutDomainInput
  }

  export type DomainUncheckedCreateWithoutSubdomainsInput = {
    dmn_id?: string
    dmn_title: string
    dmn_dscrptn: string
    dmn_duration: number
    enroll?: enrollUncheckedCreateNestedManyWithoutDomainInput
  }

  export type DomainCreateOrConnectWithoutSubdomainsInput = {
    where: DomainWhereUniqueInput
    create: XOR<DomainCreateWithoutSubdomainsInput, DomainUncheckedCreateWithoutSubdomainsInput>
  }

  export type scoreCreateWithoutSubdomainInput = {
    score: number
    time_taken: number
    student: StudentCreateNestedOneWithoutScoreInput
  }

  export type scoreUncheckedCreateWithoutSubdomainInput = {
    studentId: string
    score: number
    time_taken: number
  }

  export type scoreCreateOrConnectWithoutSubdomainInput = {
    where: scoreWhereUniqueInput
    create: XOR<scoreCreateWithoutSubdomainInput, scoreUncheckedCreateWithoutSubdomainInput>
  }

  export type scoreCreateManySubdomainInputEnvelope = {
    data: scoreCreateManySubdomainInput | scoreCreateManySubdomainInput[]
    skipDuplicates?: boolean
  }

  export type subDomainCreateWithoutChildrenInput = {
    subdom_id?: string
    subdom_title: string
    courses?: CourseCreateNestedManyWithoutSubdomainInput
    domain: DomainCreateNestedOneWithoutSubdomainsInput
    score?: scoreCreateNestedManyWithoutSubdomainInput
    parent?: subDomainCreateNestedOneWithoutChildrenInput
  }

  export type subDomainUncheckedCreateWithoutChildrenInput = {
    subdom_id?: string
    subdom_title: string
    domainId: string
    parentId?: string | null
    courses?: CourseUncheckedCreateNestedManyWithoutSubdomainInput
    score?: scoreUncheckedCreateNestedManyWithoutSubdomainInput
  }

  export type subDomainCreateOrConnectWithoutChildrenInput = {
    where: subDomainWhereUniqueInput
    create: XOR<subDomainCreateWithoutChildrenInput, subDomainUncheckedCreateWithoutChildrenInput>
  }

  export type subDomainCreateWithoutParentInput = {
    subdom_id?: string
    subdom_title: string
    courses?: CourseCreateNestedManyWithoutSubdomainInput
    domain: DomainCreateNestedOneWithoutSubdomainsInput
    score?: scoreCreateNestedManyWithoutSubdomainInput
    children?: subDomainCreateNestedManyWithoutParentInput
  }

  export type subDomainUncheckedCreateWithoutParentInput = {
    subdom_id?: string
    subdom_title: string
    domainId: string
    courses?: CourseUncheckedCreateNestedManyWithoutSubdomainInput
    score?: scoreUncheckedCreateNestedManyWithoutSubdomainInput
    children?: subDomainUncheckedCreateNestedManyWithoutParentInput
  }

  export type subDomainCreateOrConnectWithoutParentInput = {
    where: subDomainWhereUniqueInput
    create: XOR<subDomainCreateWithoutParentInput, subDomainUncheckedCreateWithoutParentInput>
  }

  export type subDomainCreateManyParentInputEnvelope = {
    data: subDomainCreateManyParentInput | subDomainCreateManyParentInput[]
    skipDuplicates?: boolean
  }

  export type CourseUpsertWithWhereUniqueWithoutSubdomainInput = {
    where: CourseWhereUniqueInput
    update: XOR<CourseUpdateWithoutSubdomainInput, CourseUncheckedUpdateWithoutSubdomainInput>
    create: XOR<CourseCreateWithoutSubdomainInput, CourseUncheckedCreateWithoutSubdomainInput>
  }

  export type CourseUpdateWithWhereUniqueWithoutSubdomainInput = {
    where: CourseWhereUniqueInput
    data: XOR<CourseUpdateWithoutSubdomainInput, CourseUncheckedUpdateWithoutSubdomainInput>
  }

  export type CourseUpdateManyWithWhereWithoutSubdomainInput = {
    where: CourseScalarWhereInput
    data: XOR<CourseUpdateManyMutationInput, CourseUncheckedUpdateManyWithoutSubdomainInput>
  }

  export type DomainUpsertWithoutSubdomainsInput = {
    update: XOR<DomainUpdateWithoutSubdomainsInput, DomainUncheckedUpdateWithoutSubdomainsInput>
    create: XOR<DomainCreateWithoutSubdomainsInput, DomainUncheckedCreateWithoutSubdomainsInput>
    where?: DomainWhereInput
  }

  export type DomainUpdateToOneWithWhereWithoutSubdomainsInput = {
    where?: DomainWhereInput
    data: XOR<DomainUpdateWithoutSubdomainsInput, DomainUncheckedUpdateWithoutSubdomainsInput>
  }

  export type DomainUpdateWithoutSubdomainsInput = {
    dmn_id?: StringFieldUpdateOperationsInput | string
    dmn_title?: StringFieldUpdateOperationsInput | string
    dmn_dscrptn?: StringFieldUpdateOperationsInput | string
    dmn_duration?: IntFieldUpdateOperationsInput | number
    enroll?: enrollUpdateManyWithoutDomainNestedInput
  }

  export type DomainUncheckedUpdateWithoutSubdomainsInput = {
    dmn_id?: StringFieldUpdateOperationsInput | string
    dmn_title?: StringFieldUpdateOperationsInput | string
    dmn_dscrptn?: StringFieldUpdateOperationsInput | string
    dmn_duration?: IntFieldUpdateOperationsInput | number
    enroll?: enrollUncheckedUpdateManyWithoutDomainNestedInput
  }

  export type scoreUpsertWithWhereUniqueWithoutSubdomainInput = {
    where: scoreWhereUniqueInput
    update: XOR<scoreUpdateWithoutSubdomainInput, scoreUncheckedUpdateWithoutSubdomainInput>
    create: XOR<scoreCreateWithoutSubdomainInput, scoreUncheckedCreateWithoutSubdomainInput>
  }

  export type scoreUpdateWithWhereUniqueWithoutSubdomainInput = {
    where: scoreWhereUniqueInput
    data: XOR<scoreUpdateWithoutSubdomainInput, scoreUncheckedUpdateWithoutSubdomainInput>
  }

  export type scoreUpdateManyWithWhereWithoutSubdomainInput = {
    where: scoreScalarWhereInput
    data: XOR<scoreUpdateManyMutationInput, scoreUncheckedUpdateManyWithoutSubdomainInput>
  }

  export type subDomainUpsertWithoutChildrenInput = {
    update: XOR<subDomainUpdateWithoutChildrenInput, subDomainUncheckedUpdateWithoutChildrenInput>
    create: XOR<subDomainCreateWithoutChildrenInput, subDomainUncheckedCreateWithoutChildrenInput>
    where?: subDomainWhereInput
  }

  export type subDomainUpdateToOneWithWhereWithoutChildrenInput = {
    where?: subDomainWhereInput
    data: XOR<subDomainUpdateWithoutChildrenInput, subDomainUncheckedUpdateWithoutChildrenInput>
  }

  export type subDomainUpdateWithoutChildrenInput = {
    subdom_id?: StringFieldUpdateOperationsInput | string
    subdom_title?: StringFieldUpdateOperationsInput | string
    courses?: CourseUpdateManyWithoutSubdomainNestedInput
    domain?: DomainUpdateOneRequiredWithoutSubdomainsNestedInput
    score?: scoreUpdateManyWithoutSubdomainNestedInput
    parent?: subDomainUpdateOneWithoutChildrenNestedInput
  }

  export type subDomainUncheckedUpdateWithoutChildrenInput = {
    subdom_id?: StringFieldUpdateOperationsInput | string
    subdom_title?: StringFieldUpdateOperationsInput | string
    domainId?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    courses?: CourseUncheckedUpdateManyWithoutSubdomainNestedInput
    score?: scoreUncheckedUpdateManyWithoutSubdomainNestedInput
  }

  export type subDomainUpsertWithWhereUniqueWithoutParentInput = {
    where: subDomainWhereUniqueInput
    update: XOR<subDomainUpdateWithoutParentInput, subDomainUncheckedUpdateWithoutParentInput>
    create: XOR<subDomainCreateWithoutParentInput, subDomainUncheckedCreateWithoutParentInput>
  }

  export type subDomainUpdateWithWhereUniqueWithoutParentInput = {
    where: subDomainWhereUniqueInput
    data: XOR<subDomainUpdateWithoutParentInput, subDomainUncheckedUpdateWithoutParentInput>
  }

  export type subDomainUpdateManyWithWhereWithoutParentInput = {
    where: subDomainScalarWhereInput
    data: XOR<subDomainUpdateManyMutationInput, subDomainUncheckedUpdateManyWithoutParentInput>
  }

  export type quizCreateWithoutCourseInput = {
    qst_id?: string
    question: string
    difficulty: $Enums.difficulty
    responses?: q_responseCreateNestedManyWithoutQuizInput
  }

  export type quizUncheckedCreateWithoutCourseInput = {
    qst_id?: string
    question: string
    difficulty: $Enums.difficulty
    responses?: q_responseUncheckedCreateNestedManyWithoutQuizInput
  }

  export type quizCreateOrConnectWithoutCourseInput = {
    where: quizWhereUniqueInput
    create: XOR<quizCreateWithoutCourseInput, quizUncheckedCreateWithoutCourseInput>
  }

  export type quizCreateManyCourseInputEnvelope = {
    data: quizCreateManyCourseInput | quizCreateManyCourseInput[]
    skipDuplicates?: boolean
  }

  export type subDomainCreateWithoutCoursesInput = {
    subdom_id?: string
    subdom_title: string
    domain: DomainCreateNestedOneWithoutSubdomainsInput
    score?: scoreCreateNestedManyWithoutSubdomainInput
    parent?: subDomainCreateNestedOneWithoutChildrenInput
    children?: subDomainCreateNestedManyWithoutParentInput
  }

  export type subDomainUncheckedCreateWithoutCoursesInput = {
    subdom_id?: string
    subdom_title: string
    domainId: string
    parentId?: string | null
    score?: scoreUncheckedCreateNestedManyWithoutSubdomainInput
    children?: subDomainUncheckedCreateNestedManyWithoutParentInput
  }

  export type subDomainCreateOrConnectWithoutCoursesInput = {
    where: subDomainWhereUniqueInput
    create: XOR<subDomainCreateWithoutCoursesInput, subDomainUncheckedCreateWithoutCoursesInput>
  }

  export type TeacherCreateWithoutCoursesInput = {
    tchr_id?: string
    tchr_name: string
    tchr_lastname: string
    tchr_email: string
    tchr_pfp?: string | null
    tchr_password: string
  }

  export type TeacherUncheckedCreateWithoutCoursesInput = {
    tchr_id?: string
    tchr_name: string
    tchr_lastname: string
    tchr_email: string
    tchr_pfp?: string | null
    tchr_password: string
  }

  export type TeacherCreateOrConnectWithoutCoursesInput = {
    where: TeacherWhereUniqueInput
    create: XOR<TeacherCreateWithoutCoursesInput, TeacherUncheckedCreateWithoutCoursesInput>
  }

  export type reviewCreateWithoutCourseInput = {
    comment: string
    rating: number
    student: StudentCreateNestedOneWithoutReviewInput
  }

  export type reviewUncheckedCreateWithoutCourseInput = {
    studentId: string
    comment: string
    rating: number
  }

  export type reviewCreateOrConnectWithoutCourseInput = {
    where: reviewWhereUniqueInput
    create: XOR<reviewCreateWithoutCourseInput, reviewUncheckedCreateWithoutCourseInput>
  }

  export type reviewCreateManyCourseInputEnvelope = {
    data: reviewCreateManyCourseInput | reviewCreateManyCourseInput[]
    skipDuplicates?: boolean
  }

  export type quizUpsertWithWhereUniqueWithoutCourseInput = {
    where: quizWhereUniqueInput
    update: XOR<quizUpdateWithoutCourseInput, quizUncheckedUpdateWithoutCourseInput>
    create: XOR<quizCreateWithoutCourseInput, quizUncheckedCreateWithoutCourseInput>
  }

  export type quizUpdateWithWhereUniqueWithoutCourseInput = {
    where: quizWhereUniqueInput
    data: XOR<quizUpdateWithoutCourseInput, quizUncheckedUpdateWithoutCourseInput>
  }

  export type quizUpdateManyWithWhereWithoutCourseInput = {
    where: quizScalarWhereInput
    data: XOR<quizUpdateManyMutationInput, quizUncheckedUpdateManyWithoutCourseInput>
  }

  export type quizScalarWhereInput = {
    AND?: quizScalarWhereInput | quizScalarWhereInput[]
    OR?: quizScalarWhereInput[]
    NOT?: quizScalarWhereInput | quizScalarWhereInput[]
    qst_id?: StringFilter<"quiz"> | string
    question?: StringFilter<"quiz"> | string
    difficulty?: EnumdifficultyFilter<"quiz"> | $Enums.difficulty
    courseId?: StringFilter<"quiz"> | string
  }

  export type subDomainUpsertWithoutCoursesInput = {
    update: XOR<subDomainUpdateWithoutCoursesInput, subDomainUncheckedUpdateWithoutCoursesInput>
    create: XOR<subDomainCreateWithoutCoursesInput, subDomainUncheckedCreateWithoutCoursesInput>
    where?: subDomainWhereInput
  }

  export type subDomainUpdateToOneWithWhereWithoutCoursesInput = {
    where?: subDomainWhereInput
    data: XOR<subDomainUpdateWithoutCoursesInput, subDomainUncheckedUpdateWithoutCoursesInput>
  }

  export type subDomainUpdateWithoutCoursesInput = {
    subdom_id?: StringFieldUpdateOperationsInput | string
    subdom_title?: StringFieldUpdateOperationsInput | string
    domain?: DomainUpdateOneRequiredWithoutSubdomainsNestedInput
    score?: scoreUpdateManyWithoutSubdomainNestedInput
    parent?: subDomainUpdateOneWithoutChildrenNestedInput
    children?: subDomainUpdateManyWithoutParentNestedInput
  }

  export type subDomainUncheckedUpdateWithoutCoursesInput = {
    subdom_id?: StringFieldUpdateOperationsInput | string
    subdom_title?: StringFieldUpdateOperationsInput | string
    domainId?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    score?: scoreUncheckedUpdateManyWithoutSubdomainNestedInput
    children?: subDomainUncheckedUpdateManyWithoutParentNestedInput
  }

  export type TeacherUpsertWithoutCoursesInput = {
    update: XOR<TeacherUpdateWithoutCoursesInput, TeacherUncheckedUpdateWithoutCoursesInput>
    create: XOR<TeacherCreateWithoutCoursesInput, TeacherUncheckedCreateWithoutCoursesInput>
    where?: TeacherWhereInput
  }

  export type TeacherUpdateToOneWithWhereWithoutCoursesInput = {
    where?: TeacherWhereInput
    data: XOR<TeacherUpdateWithoutCoursesInput, TeacherUncheckedUpdateWithoutCoursesInput>
  }

  export type TeacherUpdateWithoutCoursesInput = {
    tchr_id?: StringFieldUpdateOperationsInput | string
    tchr_name?: StringFieldUpdateOperationsInput | string
    tchr_lastname?: StringFieldUpdateOperationsInput | string
    tchr_email?: StringFieldUpdateOperationsInput | string
    tchr_pfp?: NullableStringFieldUpdateOperationsInput | string | null
    tchr_password?: StringFieldUpdateOperationsInput | string
  }

  export type TeacherUncheckedUpdateWithoutCoursesInput = {
    tchr_id?: StringFieldUpdateOperationsInput | string
    tchr_name?: StringFieldUpdateOperationsInput | string
    tchr_lastname?: StringFieldUpdateOperationsInput | string
    tchr_email?: StringFieldUpdateOperationsInput | string
    tchr_pfp?: NullableStringFieldUpdateOperationsInput | string | null
    tchr_password?: StringFieldUpdateOperationsInput | string
  }

  export type reviewUpsertWithWhereUniqueWithoutCourseInput = {
    where: reviewWhereUniqueInput
    update: XOR<reviewUpdateWithoutCourseInput, reviewUncheckedUpdateWithoutCourseInput>
    create: XOR<reviewCreateWithoutCourseInput, reviewUncheckedCreateWithoutCourseInput>
  }

  export type reviewUpdateWithWhereUniqueWithoutCourseInput = {
    where: reviewWhereUniqueInput
    data: XOR<reviewUpdateWithoutCourseInput, reviewUncheckedUpdateWithoutCourseInput>
  }

  export type reviewUpdateManyWithWhereWithoutCourseInput = {
    where: reviewScalarWhereInput
    data: XOR<reviewUpdateManyMutationInput, reviewUncheckedUpdateManyWithoutCourseInput>
  }

  export type q_responseCreateWithoutQuizInput = {
    rspns_id?: string
    response: string
    isCorrect: boolean
  }

  export type q_responseUncheckedCreateWithoutQuizInput = {
    rspns_id?: string
    response: string
    isCorrect: boolean
  }

  export type q_responseCreateOrConnectWithoutQuizInput = {
    where: q_responseWhereUniqueInput
    create: XOR<q_responseCreateWithoutQuizInput, q_responseUncheckedCreateWithoutQuizInput>
  }

  export type q_responseCreateManyQuizInputEnvelope = {
    data: q_responseCreateManyQuizInput | q_responseCreateManyQuizInput[]
    skipDuplicates?: boolean
  }

  export type CourseCreateWithoutQuizzesInput = {
    crs_id?: string
    crs_title: string
    crs_type: $Enums.crs_type
    vd_link?: string | null
    pdf_file?: string | null
    article_content?: string | null
    subdomain: subDomainCreateNestedOneWithoutCoursesInput
    teacher: TeacherCreateNestedOneWithoutCoursesInput
    review?: reviewCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateWithoutQuizzesInput = {
    crs_id?: string
    crs_title: string
    crs_type: $Enums.crs_type
    vd_link?: string | null
    pdf_file?: string | null
    article_content?: string | null
    subdom: string
    teacherId: string
    review?: reviewUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseCreateOrConnectWithoutQuizzesInput = {
    where: CourseWhereUniqueInput
    create: XOR<CourseCreateWithoutQuizzesInput, CourseUncheckedCreateWithoutQuizzesInput>
  }

  export type q_responseUpsertWithWhereUniqueWithoutQuizInput = {
    where: q_responseWhereUniqueInput
    update: XOR<q_responseUpdateWithoutQuizInput, q_responseUncheckedUpdateWithoutQuizInput>
    create: XOR<q_responseCreateWithoutQuizInput, q_responseUncheckedCreateWithoutQuizInput>
  }

  export type q_responseUpdateWithWhereUniqueWithoutQuizInput = {
    where: q_responseWhereUniqueInput
    data: XOR<q_responseUpdateWithoutQuizInput, q_responseUncheckedUpdateWithoutQuizInput>
  }

  export type q_responseUpdateManyWithWhereWithoutQuizInput = {
    where: q_responseScalarWhereInput
    data: XOR<q_responseUpdateManyMutationInput, q_responseUncheckedUpdateManyWithoutQuizInput>
  }

  export type q_responseScalarWhereInput = {
    AND?: q_responseScalarWhereInput | q_responseScalarWhereInput[]
    OR?: q_responseScalarWhereInput[]
    NOT?: q_responseScalarWhereInput | q_responseScalarWhereInput[]
    rspns_id?: StringFilter<"q_response"> | string
    response?: StringFilter<"q_response"> | string
    isCorrect?: BoolFilter<"q_response"> | boolean
    quizId?: StringFilter<"q_response"> | string
  }

  export type CourseUpsertWithoutQuizzesInput = {
    update: XOR<CourseUpdateWithoutQuizzesInput, CourseUncheckedUpdateWithoutQuizzesInput>
    create: XOR<CourseCreateWithoutQuizzesInput, CourseUncheckedCreateWithoutQuizzesInput>
    where?: CourseWhereInput
  }

  export type CourseUpdateToOneWithWhereWithoutQuizzesInput = {
    where?: CourseWhereInput
    data: XOR<CourseUpdateWithoutQuizzesInput, CourseUncheckedUpdateWithoutQuizzesInput>
  }

  export type CourseUpdateWithoutQuizzesInput = {
    crs_id?: StringFieldUpdateOperationsInput | string
    crs_title?: StringFieldUpdateOperationsInput | string
    crs_type?: Enumcrs_typeFieldUpdateOperationsInput | $Enums.crs_type
    vd_link?: NullableStringFieldUpdateOperationsInput | string | null
    pdf_file?: NullableStringFieldUpdateOperationsInput | string | null
    article_content?: NullableStringFieldUpdateOperationsInput | string | null
    subdomain?: subDomainUpdateOneRequiredWithoutCoursesNestedInput
    teacher?: TeacherUpdateOneRequiredWithoutCoursesNestedInput
    review?: reviewUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateWithoutQuizzesInput = {
    crs_id?: StringFieldUpdateOperationsInput | string
    crs_title?: StringFieldUpdateOperationsInput | string
    crs_type?: Enumcrs_typeFieldUpdateOperationsInput | $Enums.crs_type
    vd_link?: NullableStringFieldUpdateOperationsInput | string | null
    pdf_file?: NullableStringFieldUpdateOperationsInput | string | null
    article_content?: NullableStringFieldUpdateOperationsInput | string | null
    subdom?: StringFieldUpdateOperationsInput | string
    teacherId?: StringFieldUpdateOperationsInput | string
    review?: reviewUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type quizCreateWithoutResponsesInput = {
    qst_id?: string
    question: string
    difficulty: $Enums.difficulty
    course: CourseCreateNestedOneWithoutQuizzesInput
  }

  export type quizUncheckedCreateWithoutResponsesInput = {
    qst_id?: string
    question: string
    difficulty: $Enums.difficulty
    courseId: string
  }

  export type quizCreateOrConnectWithoutResponsesInput = {
    where: quizWhereUniqueInput
    create: XOR<quizCreateWithoutResponsesInput, quizUncheckedCreateWithoutResponsesInput>
  }

  export type quizUpsertWithoutResponsesInput = {
    update: XOR<quizUpdateWithoutResponsesInput, quizUncheckedUpdateWithoutResponsesInput>
    create: XOR<quizCreateWithoutResponsesInput, quizUncheckedCreateWithoutResponsesInput>
    where?: quizWhereInput
  }

  export type quizUpdateToOneWithWhereWithoutResponsesInput = {
    where?: quizWhereInput
    data: XOR<quizUpdateWithoutResponsesInput, quizUncheckedUpdateWithoutResponsesInput>
  }

  export type quizUpdateWithoutResponsesInput = {
    qst_id?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    difficulty?: EnumdifficultyFieldUpdateOperationsInput | $Enums.difficulty
    course?: CourseUpdateOneRequiredWithoutQuizzesNestedInput
  }

  export type quizUncheckedUpdateWithoutResponsesInput = {
    qst_id?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    difficulty?: EnumdifficultyFieldUpdateOperationsInput | $Enums.difficulty
    courseId?: StringFieldUpdateOperationsInput | string
  }

  export type StudentCreateWithoutEnrollInput = {
    std_id?: string
    std_name: string
    std_lastname: string
    std_email: string
    std_pfp?: string | null
    supabaseId: string
    std_streak?: number
    std_last_activeDate?: Date | string
    std_level?: $Enums.level
    score?: scoreCreateNestedManyWithoutStudentInput
    review?: reviewCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutEnrollInput = {
    std_id?: string
    std_name: string
    std_lastname: string
    std_email: string
    std_pfp?: string | null
    supabaseId: string
    std_streak?: number
    std_last_activeDate?: Date | string
    std_level?: $Enums.level
    score?: scoreUncheckedCreateNestedManyWithoutStudentInput
    review?: reviewUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutEnrollInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutEnrollInput, StudentUncheckedCreateWithoutEnrollInput>
  }

  export type DomainCreateWithoutEnrollInput = {
    dmn_id?: string
    dmn_title: string
    dmn_dscrptn: string
    dmn_duration: number
    subdomains?: subDomainCreateNestedManyWithoutDomainInput
  }

  export type DomainUncheckedCreateWithoutEnrollInput = {
    dmn_id?: string
    dmn_title: string
    dmn_dscrptn: string
    dmn_duration: number
    subdomains?: subDomainUncheckedCreateNestedManyWithoutDomainInput
  }

  export type DomainCreateOrConnectWithoutEnrollInput = {
    where: DomainWhereUniqueInput
    create: XOR<DomainCreateWithoutEnrollInput, DomainUncheckedCreateWithoutEnrollInput>
  }

  export type StudentUpsertWithoutEnrollInput = {
    update: XOR<StudentUpdateWithoutEnrollInput, StudentUncheckedUpdateWithoutEnrollInput>
    create: XOR<StudentCreateWithoutEnrollInput, StudentUncheckedCreateWithoutEnrollInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutEnrollInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutEnrollInput, StudentUncheckedUpdateWithoutEnrollInput>
  }

  export type StudentUpdateWithoutEnrollInput = {
    std_id?: StringFieldUpdateOperationsInput | string
    std_name?: StringFieldUpdateOperationsInput | string
    std_lastname?: StringFieldUpdateOperationsInput | string
    std_email?: StringFieldUpdateOperationsInput | string
    std_pfp?: NullableStringFieldUpdateOperationsInput | string | null
    supabaseId?: StringFieldUpdateOperationsInput | string
    std_streak?: IntFieldUpdateOperationsInput | number
    std_last_activeDate?: DateTimeFieldUpdateOperationsInput | Date | string
    std_level?: EnumlevelFieldUpdateOperationsInput | $Enums.level
    score?: scoreUpdateManyWithoutStudentNestedInput
    review?: reviewUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutEnrollInput = {
    std_id?: StringFieldUpdateOperationsInput | string
    std_name?: StringFieldUpdateOperationsInput | string
    std_lastname?: StringFieldUpdateOperationsInput | string
    std_email?: StringFieldUpdateOperationsInput | string
    std_pfp?: NullableStringFieldUpdateOperationsInput | string | null
    supabaseId?: StringFieldUpdateOperationsInput | string
    std_streak?: IntFieldUpdateOperationsInput | number
    std_last_activeDate?: DateTimeFieldUpdateOperationsInput | Date | string
    std_level?: EnumlevelFieldUpdateOperationsInput | $Enums.level
    score?: scoreUncheckedUpdateManyWithoutStudentNestedInput
    review?: reviewUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type DomainUpsertWithoutEnrollInput = {
    update: XOR<DomainUpdateWithoutEnrollInput, DomainUncheckedUpdateWithoutEnrollInput>
    create: XOR<DomainCreateWithoutEnrollInput, DomainUncheckedCreateWithoutEnrollInput>
    where?: DomainWhereInput
  }

  export type DomainUpdateToOneWithWhereWithoutEnrollInput = {
    where?: DomainWhereInput
    data: XOR<DomainUpdateWithoutEnrollInput, DomainUncheckedUpdateWithoutEnrollInput>
  }

  export type DomainUpdateWithoutEnrollInput = {
    dmn_id?: StringFieldUpdateOperationsInput | string
    dmn_title?: StringFieldUpdateOperationsInput | string
    dmn_dscrptn?: StringFieldUpdateOperationsInput | string
    dmn_duration?: IntFieldUpdateOperationsInput | number
    subdomains?: subDomainUpdateManyWithoutDomainNestedInput
  }

  export type DomainUncheckedUpdateWithoutEnrollInput = {
    dmn_id?: StringFieldUpdateOperationsInput | string
    dmn_title?: StringFieldUpdateOperationsInput | string
    dmn_dscrptn?: StringFieldUpdateOperationsInput | string
    dmn_duration?: IntFieldUpdateOperationsInput | number
    subdomains?: subDomainUncheckedUpdateManyWithoutDomainNestedInput
  }

  export type StudentCreateWithoutScoreInput = {
    std_id?: string
    std_name: string
    std_lastname: string
    std_email: string
    std_pfp?: string | null
    supabaseId: string
    std_streak?: number
    std_last_activeDate?: Date | string
    std_level?: $Enums.level
    enroll?: enrollCreateNestedManyWithoutStudentInput
    review?: reviewCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutScoreInput = {
    std_id?: string
    std_name: string
    std_lastname: string
    std_email: string
    std_pfp?: string | null
    supabaseId: string
    std_streak?: number
    std_last_activeDate?: Date | string
    std_level?: $Enums.level
    enroll?: enrollUncheckedCreateNestedManyWithoutStudentInput
    review?: reviewUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutScoreInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutScoreInput, StudentUncheckedCreateWithoutScoreInput>
  }

  export type subDomainCreateWithoutScoreInput = {
    subdom_id?: string
    subdom_title: string
    courses?: CourseCreateNestedManyWithoutSubdomainInput
    domain: DomainCreateNestedOneWithoutSubdomainsInput
    parent?: subDomainCreateNestedOneWithoutChildrenInput
    children?: subDomainCreateNestedManyWithoutParentInput
  }

  export type subDomainUncheckedCreateWithoutScoreInput = {
    subdom_id?: string
    subdom_title: string
    domainId: string
    parentId?: string | null
    courses?: CourseUncheckedCreateNestedManyWithoutSubdomainInput
    children?: subDomainUncheckedCreateNestedManyWithoutParentInput
  }

  export type subDomainCreateOrConnectWithoutScoreInput = {
    where: subDomainWhereUniqueInput
    create: XOR<subDomainCreateWithoutScoreInput, subDomainUncheckedCreateWithoutScoreInput>
  }

  export type StudentUpsertWithoutScoreInput = {
    update: XOR<StudentUpdateWithoutScoreInput, StudentUncheckedUpdateWithoutScoreInput>
    create: XOR<StudentCreateWithoutScoreInput, StudentUncheckedCreateWithoutScoreInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutScoreInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutScoreInput, StudentUncheckedUpdateWithoutScoreInput>
  }

  export type StudentUpdateWithoutScoreInput = {
    std_id?: StringFieldUpdateOperationsInput | string
    std_name?: StringFieldUpdateOperationsInput | string
    std_lastname?: StringFieldUpdateOperationsInput | string
    std_email?: StringFieldUpdateOperationsInput | string
    std_pfp?: NullableStringFieldUpdateOperationsInput | string | null
    supabaseId?: StringFieldUpdateOperationsInput | string
    std_streak?: IntFieldUpdateOperationsInput | number
    std_last_activeDate?: DateTimeFieldUpdateOperationsInput | Date | string
    std_level?: EnumlevelFieldUpdateOperationsInput | $Enums.level
    enroll?: enrollUpdateManyWithoutStudentNestedInput
    review?: reviewUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutScoreInput = {
    std_id?: StringFieldUpdateOperationsInput | string
    std_name?: StringFieldUpdateOperationsInput | string
    std_lastname?: StringFieldUpdateOperationsInput | string
    std_email?: StringFieldUpdateOperationsInput | string
    std_pfp?: NullableStringFieldUpdateOperationsInput | string | null
    supabaseId?: StringFieldUpdateOperationsInput | string
    std_streak?: IntFieldUpdateOperationsInput | number
    std_last_activeDate?: DateTimeFieldUpdateOperationsInput | Date | string
    std_level?: EnumlevelFieldUpdateOperationsInput | $Enums.level
    enroll?: enrollUncheckedUpdateManyWithoutStudentNestedInput
    review?: reviewUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type subDomainUpsertWithoutScoreInput = {
    update: XOR<subDomainUpdateWithoutScoreInput, subDomainUncheckedUpdateWithoutScoreInput>
    create: XOR<subDomainCreateWithoutScoreInput, subDomainUncheckedCreateWithoutScoreInput>
    where?: subDomainWhereInput
  }

  export type subDomainUpdateToOneWithWhereWithoutScoreInput = {
    where?: subDomainWhereInput
    data: XOR<subDomainUpdateWithoutScoreInput, subDomainUncheckedUpdateWithoutScoreInput>
  }

  export type subDomainUpdateWithoutScoreInput = {
    subdom_id?: StringFieldUpdateOperationsInput | string
    subdom_title?: StringFieldUpdateOperationsInput | string
    courses?: CourseUpdateManyWithoutSubdomainNestedInput
    domain?: DomainUpdateOneRequiredWithoutSubdomainsNestedInput
    parent?: subDomainUpdateOneWithoutChildrenNestedInput
    children?: subDomainUpdateManyWithoutParentNestedInput
  }

  export type subDomainUncheckedUpdateWithoutScoreInput = {
    subdom_id?: StringFieldUpdateOperationsInput | string
    subdom_title?: StringFieldUpdateOperationsInput | string
    domainId?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    courses?: CourseUncheckedUpdateManyWithoutSubdomainNestedInput
    children?: subDomainUncheckedUpdateManyWithoutParentNestedInput
  }

  export type StudentCreateWithoutReviewInput = {
    std_id?: string
    std_name: string
    std_lastname: string
    std_email: string
    std_pfp?: string | null
    supabaseId: string
    std_streak?: number
    std_last_activeDate?: Date | string
    std_level?: $Enums.level
    enroll?: enrollCreateNestedManyWithoutStudentInput
    score?: scoreCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutReviewInput = {
    std_id?: string
    std_name: string
    std_lastname: string
    std_email: string
    std_pfp?: string | null
    supabaseId: string
    std_streak?: number
    std_last_activeDate?: Date | string
    std_level?: $Enums.level
    enroll?: enrollUncheckedCreateNestedManyWithoutStudentInput
    score?: scoreUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutReviewInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutReviewInput, StudentUncheckedCreateWithoutReviewInput>
  }

  export type CourseCreateWithoutReviewInput = {
    crs_id?: string
    crs_title: string
    crs_type: $Enums.crs_type
    vd_link?: string | null
    pdf_file?: string | null
    article_content?: string | null
    quizzes?: quizCreateNestedManyWithoutCourseInput
    subdomain: subDomainCreateNestedOneWithoutCoursesInput
    teacher: TeacherCreateNestedOneWithoutCoursesInput
  }

  export type CourseUncheckedCreateWithoutReviewInput = {
    crs_id?: string
    crs_title: string
    crs_type: $Enums.crs_type
    vd_link?: string | null
    pdf_file?: string | null
    article_content?: string | null
    subdom: string
    teacherId: string
    quizzes?: quizUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseCreateOrConnectWithoutReviewInput = {
    where: CourseWhereUniqueInput
    create: XOR<CourseCreateWithoutReviewInput, CourseUncheckedCreateWithoutReviewInput>
  }

  export type StudentUpsertWithoutReviewInput = {
    update: XOR<StudentUpdateWithoutReviewInput, StudentUncheckedUpdateWithoutReviewInput>
    create: XOR<StudentCreateWithoutReviewInput, StudentUncheckedCreateWithoutReviewInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutReviewInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutReviewInput, StudentUncheckedUpdateWithoutReviewInput>
  }

  export type StudentUpdateWithoutReviewInput = {
    std_id?: StringFieldUpdateOperationsInput | string
    std_name?: StringFieldUpdateOperationsInput | string
    std_lastname?: StringFieldUpdateOperationsInput | string
    std_email?: StringFieldUpdateOperationsInput | string
    std_pfp?: NullableStringFieldUpdateOperationsInput | string | null
    supabaseId?: StringFieldUpdateOperationsInput | string
    std_streak?: IntFieldUpdateOperationsInput | number
    std_last_activeDate?: DateTimeFieldUpdateOperationsInput | Date | string
    std_level?: EnumlevelFieldUpdateOperationsInput | $Enums.level
    enroll?: enrollUpdateManyWithoutStudentNestedInput
    score?: scoreUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutReviewInput = {
    std_id?: StringFieldUpdateOperationsInput | string
    std_name?: StringFieldUpdateOperationsInput | string
    std_lastname?: StringFieldUpdateOperationsInput | string
    std_email?: StringFieldUpdateOperationsInput | string
    std_pfp?: NullableStringFieldUpdateOperationsInput | string | null
    supabaseId?: StringFieldUpdateOperationsInput | string
    std_streak?: IntFieldUpdateOperationsInput | number
    std_last_activeDate?: DateTimeFieldUpdateOperationsInput | Date | string
    std_level?: EnumlevelFieldUpdateOperationsInput | $Enums.level
    enroll?: enrollUncheckedUpdateManyWithoutStudentNestedInput
    score?: scoreUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type CourseUpsertWithoutReviewInput = {
    update: XOR<CourseUpdateWithoutReviewInput, CourseUncheckedUpdateWithoutReviewInput>
    create: XOR<CourseCreateWithoutReviewInput, CourseUncheckedCreateWithoutReviewInput>
    where?: CourseWhereInput
  }

  export type CourseUpdateToOneWithWhereWithoutReviewInput = {
    where?: CourseWhereInput
    data: XOR<CourseUpdateWithoutReviewInput, CourseUncheckedUpdateWithoutReviewInput>
  }

  export type CourseUpdateWithoutReviewInput = {
    crs_id?: StringFieldUpdateOperationsInput | string
    crs_title?: StringFieldUpdateOperationsInput | string
    crs_type?: Enumcrs_typeFieldUpdateOperationsInput | $Enums.crs_type
    vd_link?: NullableStringFieldUpdateOperationsInput | string | null
    pdf_file?: NullableStringFieldUpdateOperationsInput | string | null
    article_content?: NullableStringFieldUpdateOperationsInput | string | null
    quizzes?: quizUpdateManyWithoutCourseNestedInput
    subdomain?: subDomainUpdateOneRequiredWithoutCoursesNestedInput
    teacher?: TeacherUpdateOneRequiredWithoutCoursesNestedInput
  }

  export type CourseUncheckedUpdateWithoutReviewInput = {
    crs_id?: StringFieldUpdateOperationsInput | string
    crs_title?: StringFieldUpdateOperationsInput | string
    crs_type?: Enumcrs_typeFieldUpdateOperationsInput | $Enums.crs_type
    vd_link?: NullableStringFieldUpdateOperationsInput | string | null
    pdf_file?: NullableStringFieldUpdateOperationsInput | string | null
    article_content?: NullableStringFieldUpdateOperationsInput | string | null
    subdom?: StringFieldUpdateOperationsInput | string
    teacherId?: StringFieldUpdateOperationsInput | string
    quizzes?: quizUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type enrollCreateManyStudentInput = {
    domainId: string
    progress: number
  }

  export type scoreCreateManyStudentInput = {
    subdom: string
    score: number
    time_taken: number
  }

  export type reviewCreateManyStudentInput = {
    courseId: string
    comment: string
    rating: number
  }

  export type enrollUpdateWithoutStudentInput = {
    progress?: IntFieldUpdateOperationsInput | number
    domain?: DomainUpdateOneRequiredWithoutEnrollNestedInput
  }

  export type enrollUncheckedUpdateWithoutStudentInput = {
    domainId?: StringFieldUpdateOperationsInput | string
    progress?: IntFieldUpdateOperationsInput | number
  }

  export type enrollUncheckedUpdateManyWithoutStudentInput = {
    domainId?: StringFieldUpdateOperationsInput | string
    progress?: IntFieldUpdateOperationsInput | number
  }

  export type scoreUpdateWithoutStudentInput = {
    score?: FloatFieldUpdateOperationsInput | number
    time_taken?: IntFieldUpdateOperationsInput | number
    subdomain?: subDomainUpdateOneRequiredWithoutScoreNestedInput
  }

  export type scoreUncheckedUpdateWithoutStudentInput = {
    subdom?: StringFieldUpdateOperationsInput | string
    score?: FloatFieldUpdateOperationsInput | number
    time_taken?: IntFieldUpdateOperationsInput | number
  }

  export type scoreUncheckedUpdateManyWithoutStudentInput = {
    subdom?: StringFieldUpdateOperationsInput | string
    score?: FloatFieldUpdateOperationsInput | number
    time_taken?: IntFieldUpdateOperationsInput | number
  }

  export type reviewUpdateWithoutStudentInput = {
    comment?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    course?: CourseUpdateOneRequiredWithoutReviewNestedInput
  }

  export type reviewUncheckedUpdateWithoutStudentInput = {
    courseId?: StringFieldUpdateOperationsInput | string
    comment?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
  }

  export type reviewUncheckedUpdateManyWithoutStudentInput = {
    courseId?: StringFieldUpdateOperationsInput | string
    comment?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
  }

  export type CourseCreateManyTeacherInput = {
    crs_id?: string
    crs_title: string
    crs_type: $Enums.crs_type
    vd_link?: string | null
    pdf_file?: string | null
    article_content?: string | null
    subdom: string
  }

  export type CourseUpdateWithoutTeacherInput = {
    crs_id?: StringFieldUpdateOperationsInput | string
    crs_title?: StringFieldUpdateOperationsInput | string
    crs_type?: Enumcrs_typeFieldUpdateOperationsInput | $Enums.crs_type
    vd_link?: NullableStringFieldUpdateOperationsInput | string | null
    pdf_file?: NullableStringFieldUpdateOperationsInput | string | null
    article_content?: NullableStringFieldUpdateOperationsInput | string | null
    quizzes?: quizUpdateManyWithoutCourseNestedInput
    subdomain?: subDomainUpdateOneRequiredWithoutCoursesNestedInput
    review?: reviewUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateWithoutTeacherInput = {
    crs_id?: StringFieldUpdateOperationsInput | string
    crs_title?: StringFieldUpdateOperationsInput | string
    crs_type?: Enumcrs_typeFieldUpdateOperationsInput | $Enums.crs_type
    vd_link?: NullableStringFieldUpdateOperationsInput | string | null
    pdf_file?: NullableStringFieldUpdateOperationsInput | string | null
    article_content?: NullableStringFieldUpdateOperationsInput | string | null
    subdom?: StringFieldUpdateOperationsInput | string
    quizzes?: quizUncheckedUpdateManyWithoutCourseNestedInput
    review?: reviewUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateManyWithoutTeacherInput = {
    crs_id?: StringFieldUpdateOperationsInput | string
    crs_title?: StringFieldUpdateOperationsInput | string
    crs_type?: Enumcrs_typeFieldUpdateOperationsInput | $Enums.crs_type
    vd_link?: NullableStringFieldUpdateOperationsInput | string | null
    pdf_file?: NullableStringFieldUpdateOperationsInput | string | null
    article_content?: NullableStringFieldUpdateOperationsInput | string | null
    subdom?: StringFieldUpdateOperationsInput | string
  }

  export type subDomainCreateManyDomainInput = {
    subdom_id?: string
    subdom_title: string
    parentId?: string | null
  }

  export type enrollCreateManyDomainInput = {
    studentId: string
    progress: number
  }

  export type subDomainUpdateWithoutDomainInput = {
    subdom_id?: StringFieldUpdateOperationsInput | string
    subdom_title?: StringFieldUpdateOperationsInput | string
    courses?: CourseUpdateManyWithoutSubdomainNestedInput
    score?: scoreUpdateManyWithoutSubdomainNestedInput
    parent?: subDomainUpdateOneWithoutChildrenNestedInput
    children?: subDomainUpdateManyWithoutParentNestedInput
  }

  export type subDomainUncheckedUpdateWithoutDomainInput = {
    subdom_id?: StringFieldUpdateOperationsInput | string
    subdom_title?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    courses?: CourseUncheckedUpdateManyWithoutSubdomainNestedInput
    score?: scoreUncheckedUpdateManyWithoutSubdomainNestedInput
    children?: subDomainUncheckedUpdateManyWithoutParentNestedInput
  }

  export type subDomainUncheckedUpdateManyWithoutDomainInput = {
    subdom_id?: StringFieldUpdateOperationsInput | string
    subdom_title?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type enrollUpdateWithoutDomainInput = {
    progress?: IntFieldUpdateOperationsInput | number
    student?: StudentUpdateOneRequiredWithoutEnrollNestedInput
  }

  export type enrollUncheckedUpdateWithoutDomainInput = {
    studentId?: StringFieldUpdateOperationsInput | string
    progress?: IntFieldUpdateOperationsInput | number
  }

  export type enrollUncheckedUpdateManyWithoutDomainInput = {
    studentId?: StringFieldUpdateOperationsInput | string
    progress?: IntFieldUpdateOperationsInput | number
  }

  export type CourseCreateManySubdomainInput = {
    crs_id?: string
    crs_title: string
    crs_type: $Enums.crs_type
    vd_link?: string | null
    pdf_file?: string | null
    article_content?: string | null
    teacherId: string
  }

  export type scoreCreateManySubdomainInput = {
    studentId: string
    score: number
    time_taken: number
  }

  export type subDomainCreateManyParentInput = {
    subdom_id?: string
    subdom_title: string
    domainId: string
  }

  export type CourseUpdateWithoutSubdomainInput = {
    crs_id?: StringFieldUpdateOperationsInput | string
    crs_title?: StringFieldUpdateOperationsInput | string
    crs_type?: Enumcrs_typeFieldUpdateOperationsInput | $Enums.crs_type
    vd_link?: NullableStringFieldUpdateOperationsInput | string | null
    pdf_file?: NullableStringFieldUpdateOperationsInput | string | null
    article_content?: NullableStringFieldUpdateOperationsInput | string | null
    quizzes?: quizUpdateManyWithoutCourseNestedInput
    teacher?: TeacherUpdateOneRequiredWithoutCoursesNestedInput
    review?: reviewUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateWithoutSubdomainInput = {
    crs_id?: StringFieldUpdateOperationsInput | string
    crs_title?: StringFieldUpdateOperationsInput | string
    crs_type?: Enumcrs_typeFieldUpdateOperationsInput | $Enums.crs_type
    vd_link?: NullableStringFieldUpdateOperationsInput | string | null
    pdf_file?: NullableStringFieldUpdateOperationsInput | string | null
    article_content?: NullableStringFieldUpdateOperationsInput | string | null
    teacherId?: StringFieldUpdateOperationsInput | string
    quizzes?: quizUncheckedUpdateManyWithoutCourseNestedInput
    review?: reviewUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateManyWithoutSubdomainInput = {
    crs_id?: StringFieldUpdateOperationsInput | string
    crs_title?: StringFieldUpdateOperationsInput | string
    crs_type?: Enumcrs_typeFieldUpdateOperationsInput | $Enums.crs_type
    vd_link?: NullableStringFieldUpdateOperationsInput | string | null
    pdf_file?: NullableStringFieldUpdateOperationsInput | string | null
    article_content?: NullableStringFieldUpdateOperationsInput | string | null
    teacherId?: StringFieldUpdateOperationsInput | string
  }

  export type scoreUpdateWithoutSubdomainInput = {
    score?: FloatFieldUpdateOperationsInput | number
    time_taken?: IntFieldUpdateOperationsInput | number
    student?: StudentUpdateOneRequiredWithoutScoreNestedInput
  }

  export type scoreUncheckedUpdateWithoutSubdomainInput = {
    studentId?: StringFieldUpdateOperationsInput | string
    score?: FloatFieldUpdateOperationsInput | number
    time_taken?: IntFieldUpdateOperationsInput | number
  }

  export type scoreUncheckedUpdateManyWithoutSubdomainInput = {
    studentId?: StringFieldUpdateOperationsInput | string
    score?: FloatFieldUpdateOperationsInput | number
    time_taken?: IntFieldUpdateOperationsInput | number
  }

  export type subDomainUpdateWithoutParentInput = {
    subdom_id?: StringFieldUpdateOperationsInput | string
    subdom_title?: StringFieldUpdateOperationsInput | string
    courses?: CourseUpdateManyWithoutSubdomainNestedInput
    domain?: DomainUpdateOneRequiredWithoutSubdomainsNestedInput
    score?: scoreUpdateManyWithoutSubdomainNestedInput
    children?: subDomainUpdateManyWithoutParentNestedInput
  }

  export type subDomainUncheckedUpdateWithoutParentInput = {
    subdom_id?: StringFieldUpdateOperationsInput | string
    subdom_title?: StringFieldUpdateOperationsInput | string
    domainId?: StringFieldUpdateOperationsInput | string
    courses?: CourseUncheckedUpdateManyWithoutSubdomainNestedInput
    score?: scoreUncheckedUpdateManyWithoutSubdomainNestedInput
    children?: subDomainUncheckedUpdateManyWithoutParentNestedInput
  }

  export type subDomainUncheckedUpdateManyWithoutParentInput = {
    subdom_id?: StringFieldUpdateOperationsInput | string
    subdom_title?: StringFieldUpdateOperationsInput | string
    domainId?: StringFieldUpdateOperationsInput | string
  }

  export type quizCreateManyCourseInput = {
    qst_id?: string
    question: string
    difficulty: $Enums.difficulty
  }

  export type reviewCreateManyCourseInput = {
    studentId: string
    comment: string
    rating: number
  }

  export type quizUpdateWithoutCourseInput = {
    qst_id?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    difficulty?: EnumdifficultyFieldUpdateOperationsInput | $Enums.difficulty
    responses?: q_responseUpdateManyWithoutQuizNestedInput
  }

  export type quizUncheckedUpdateWithoutCourseInput = {
    qst_id?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    difficulty?: EnumdifficultyFieldUpdateOperationsInput | $Enums.difficulty
    responses?: q_responseUncheckedUpdateManyWithoutQuizNestedInput
  }

  export type quizUncheckedUpdateManyWithoutCourseInput = {
    qst_id?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    difficulty?: EnumdifficultyFieldUpdateOperationsInput | $Enums.difficulty
  }

  export type reviewUpdateWithoutCourseInput = {
    comment?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    student?: StudentUpdateOneRequiredWithoutReviewNestedInput
  }

  export type reviewUncheckedUpdateWithoutCourseInput = {
    studentId?: StringFieldUpdateOperationsInput | string
    comment?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
  }

  export type reviewUncheckedUpdateManyWithoutCourseInput = {
    studentId?: StringFieldUpdateOperationsInput | string
    comment?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
  }

  export type q_responseCreateManyQuizInput = {
    rspns_id?: string
    response: string
    isCorrect: boolean
  }

  export type q_responseUpdateWithoutQuizInput = {
    rspns_id?: StringFieldUpdateOperationsInput | string
    response?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
  }

  export type q_responseUncheckedUpdateWithoutQuizInput = {
    rspns_id?: StringFieldUpdateOperationsInput | string
    response?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
  }

  export type q_responseUncheckedUpdateManyWithoutQuizInput = {
    rspns_id?: StringFieldUpdateOperationsInput | string
    response?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}