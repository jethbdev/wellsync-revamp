
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model CpOrganization
 * 
 */
export type CpOrganization = $Result.DefaultSelection<Prisma.$CpOrganizationPayload>
/**
 * Model CpFeatureFlag
 * 
 */
export type CpFeatureFlag = $Result.DefaultSelection<Prisma.$CpFeatureFlagPayload>
/**
 * Model CpUsageMetric
 * 
 */
export type CpUsageMetric = $Result.DefaultSelection<Prisma.$CpUsageMetricPayload>
/**
 * Model CpPluginDirectory
 * 
 */
export type CpPluginDirectory = $Result.DefaultSelection<Prisma.$CpPluginDirectoryPayload>
/**
 * Model CpTempAccessGrant
 * 
 */
export type CpTempAccessGrant = $Result.DefaultSelection<Prisma.$CpTempAccessGrantPayload>
/**
 * Model CpTenantDbUpgrade
 * 
 */
export type CpTenantDbUpgrade = $Result.DefaultSelection<Prisma.$CpTenantDbUpgradePayload>
/**
 * Model CpIncident
 * 
 */
export type CpIncident = $Result.DefaultSelection<Prisma.$CpIncidentPayload>
/**
 * Model CpMigration
 * 
 */
export type CpMigration = $Result.DefaultSelection<Prisma.$CpMigrationPayload>
/**
 * Model CpUser
 * 
 */
export type CpUser = $Result.DefaultSelection<Prisma.$CpUserPayload>
/**
 * Model CpSession
 * 
 */
export type CpSession = $Result.DefaultSelection<Prisma.$CpSessionPayload>
/**
 * Model CpAccount
 * 
 */
export type CpAccount = $Result.DefaultSelection<Prisma.$CpAccountPayload>
/**
 * Model CpVerification
 * 
 */
export type CpVerification = $Result.DefaultSelection<Prisma.$CpVerificationPayload>
/**
 * Model CpPatientIndex
 * 
 */
export type CpPatientIndex = $Result.DefaultSelection<Prisma.$CpPatientIndexPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more CpOrganizations
 * const cpOrganizations = await prisma.cpOrganization.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
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
   * // Fetch zero or more CpOrganizations
   * const cpOrganizations = await prisma.cpOrganization.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.cpOrganization`: Exposes CRUD operations for the **CpOrganization** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CpOrganizations
    * const cpOrganizations = await prisma.cpOrganization.findMany()
    * ```
    */
  get cpOrganization(): Prisma.CpOrganizationDelegate<ExtArgs>;

  /**
   * `prisma.cpFeatureFlag`: Exposes CRUD operations for the **CpFeatureFlag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CpFeatureFlags
    * const cpFeatureFlags = await prisma.cpFeatureFlag.findMany()
    * ```
    */
  get cpFeatureFlag(): Prisma.CpFeatureFlagDelegate<ExtArgs>;

  /**
   * `prisma.cpUsageMetric`: Exposes CRUD operations for the **CpUsageMetric** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CpUsageMetrics
    * const cpUsageMetrics = await prisma.cpUsageMetric.findMany()
    * ```
    */
  get cpUsageMetric(): Prisma.CpUsageMetricDelegate<ExtArgs>;

  /**
   * `prisma.cpPluginDirectory`: Exposes CRUD operations for the **CpPluginDirectory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CpPluginDirectories
    * const cpPluginDirectories = await prisma.cpPluginDirectory.findMany()
    * ```
    */
  get cpPluginDirectory(): Prisma.CpPluginDirectoryDelegate<ExtArgs>;

  /**
   * `prisma.cpTempAccessGrant`: Exposes CRUD operations for the **CpTempAccessGrant** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CpTempAccessGrants
    * const cpTempAccessGrants = await prisma.cpTempAccessGrant.findMany()
    * ```
    */
  get cpTempAccessGrant(): Prisma.CpTempAccessGrantDelegate<ExtArgs>;

  /**
   * `prisma.cpTenantDbUpgrade`: Exposes CRUD operations for the **CpTenantDbUpgrade** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CpTenantDbUpgrades
    * const cpTenantDbUpgrades = await prisma.cpTenantDbUpgrade.findMany()
    * ```
    */
  get cpTenantDbUpgrade(): Prisma.CpTenantDbUpgradeDelegate<ExtArgs>;

  /**
   * `prisma.cpIncident`: Exposes CRUD operations for the **CpIncident** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CpIncidents
    * const cpIncidents = await prisma.cpIncident.findMany()
    * ```
    */
  get cpIncident(): Prisma.CpIncidentDelegate<ExtArgs>;

  /**
   * `prisma.cpMigration`: Exposes CRUD operations for the **CpMigration** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CpMigrations
    * const cpMigrations = await prisma.cpMigration.findMany()
    * ```
    */
  get cpMigration(): Prisma.CpMigrationDelegate<ExtArgs>;

  /**
   * `prisma.cpUser`: Exposes CRUD operations for the **CpUser** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CpUsers
    * const cpUsers = await prisma.cpUser.findMany()
    * ```
    */
  get cpUser(): Prisma.CpUserDelegate<ExtArgs>;

  /**
   * `prisma.cpSession`: Exposes CRUD operations for the **CpSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CpSessions
    * const cpSessions = await prisma.cpSession.findMany()
    * ```
    */
  get cpSession(): Prisma.CpSessionDelegate<ExtArgs>;

  /**
   * `prisma.cpAccount`: Exposes CRUD operations for the **CpAccount** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CpAccounts
    * const cpAccounts = await prisma.cpAccount.findMany()
    * ```
    */
  get cpAccount(): Prisma.CpAccountDelegate<ExtArgs>;

  /**
   * `prisma.cpVerification`: Exposes CRUD operations for the **CpVerification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CpVerifications
    * const cpVerifications = await prisma.cpVerification.findMany()
    * ```
    */
  get cpVerification(): Prisma.CpVerificationDelegate<ExtArgs>;

  /**
   * `prisma.cpPatientIndex`: Exposes CRUD operations for the **CpPatientIndex** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CpPatientIndices
    * const cpPatientIndices = await prisma.cpPatientIndex.findMany()
    * ```
    */
  get cpPatientIndex(): Prisma.CpPatientIndexDelegate<ExtArgs>;
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
  export import NotFoundError = runtime.NotFoundError

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
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

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
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


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
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
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
    CpOrganization: 'CpOrganization',
    CpFeatureFlag: 'CpFeatureFlag',
    CpUsageMetric: 'CpUsageMetric',
    CpPluginDirectory: 'CpPluginDirectory',
    CpTempAccessGrant: 'CpTempAccessGrant',
    CpTenantDbUpgrade: 'CpTenantDbUpgrade',
    CpIncident: 'CpIncident',
    CpMigration: 'CpMigration',
    CpUser: 'CpUser',
    CpSession: 'CpSession',
    CpAccount: 'CpAccount',
    CpVerification: 'CpVerification',
    CpPatientIndex: 'CpPatientIndex'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "cpOrganization" | "cpFeatureFlag" | "cpUsageMetric" | "cpPluginDirectory" | "cpTempAccessGrant" | "cpTenantDbUpgrade" | "cpIncident" | "cpMigration" | "cpUser" | "cpSession" | "cpAccount" | "cpVerification" | "cpPatientIndex"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      CpOrganization: {
        payload: Prisma.$CpOrganizationPayload<ExtArgs>
        fields: Prisma.CpOrganizationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CpOrganizationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpOrganizationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CpOrganizationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpOrganizationPayload>
          }
          findFirst: {
            args: Prisma.CpOrganizationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpOrganizationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CpOrganizationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpOrganizationPayload>
          }
          findMany: {
            args: Prisma.CpOrganizationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpOrganizationPayload>[]
          }
          create: {
            args: Prisma.CpOrganizationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpOrganizationPayload>
          }
          createMany: {
            args: Prisma.CpOrganizationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CpOrganizationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpOrganizationPayload>[]
          }
          delete: {
            args: Prisma.CpOrganizationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpOrganizationPayload>
          }
          update: {
            args: Prisma.CpOrganizationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpOrganizationPayload>
          }
          deleteMany: {
            args: Prisma.CpOrganizationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CpOrganizationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CpOrganizationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpOrganizationPayload>
          }
          aggregate: {
            args: Prisma.CpOrganizationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCpOrganization>
          }
          groupBy: {
            args: Prisma.CpOrganizationGroupByArgs<ExtArgs>
            result: $Utils.Optional<CpOrganizationGroupByOutputType>[]
          }
          count: {
            args: Prisma.CpOrganizationCountArgs<ExtArgs>
            result: $Utils.Optional<CpOrganizationCountAggregateOutputType> | number
          }
        }
      }
      CpFeatureFlag: {
        payload: Prisma.$CpFeatureFlagPayload<ExtArgs>
        fields: Prisma.CpFeatureFlagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CpFeatureFlagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpFeatureFlagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CpFeatureFlagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpFeatureFlagPayload>
          }
          findFirst: {
            args: Prisma.CpFeatureFlagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpFeatureFlagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CpFeatureFlagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpFeatureFlagPayload>
          }
          findMany: {
            args: Prisma.CpFeatureFlagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpFeatureFlagPayload>[]
          }
          create: {
            args: Prisma.CpFeatureFlagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpFeatureFlagPayload>
          }
          createMany: {
            args: Prisma.CpFeatureFlagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CpFeatureFlagCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpFeatureFlagPayload>[]
          }
          delete: {
            args: Prisma.CpFeatureFlagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpFeatureFlagPayload>
          }
          update: {
            args: Prisma.CpFeatureFlagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpFeatureFlagPayload>
          }
          deleteMany: {
            args: Prisma.CpFeatureFlagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CpFeatureFlagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CpFeatureFlagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpFeatureFlagPayload>
          }
          aggregate: {
            args: Prisma.CpFeatureFlagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCpFeatureFlag>
          }
          groupBy: {
            args: Prisma.CpFeatureFlagGroupByArgs<ExtArgs>
            result: $Utils.Optional<CpFeatureFlagGroupByOutputType>[]
          }
          count: {
            args: Prisma.CpFeatureFlagCountArgs<ExtArgs>
            result: $Utils.Optional<CpFeatureFlagCountAggregateOutputType> | number
          }
        }
      }
      CpUsageMetric: {
        payload: Prisma.$CpUsageMetricPayload<ExtArgs>
        fields: Prisma.CpUsageMetricFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CpUsageMetricFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpUsageMetricPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CpUsageMetricFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpUsageMetricPayload>
          }
          findFirst: {
            args: Prisma.CpUsageMetricFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpUsageMetricPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CpUsageMetricFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpUsageMetricPayload>
          }
          findMany: {
            args: Prisma.CpUsageMetricFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpUsageMetricPayload>[]
          }
          create: {
            args: Prisma.CpUsageMetricCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpUsageMetricPayload>
          }
          createMany: {
            args: Prisma.CpUsageMetricCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CpUsageMetricCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpUsageMetricPayload>[]
          }
          delete: {
            args: Prisma.CpUsageMetricDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpUsageMetricPayload>
          }
          update: {
            args: Prisma.CpUsageMetricUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpUsageMetricPayload>
          }
          deleteMany: {
            args: Prisma.CpUsageMetricDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CpUsageMetricUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CpUsageMetricUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpUsageMetricPayload>
          }
          aggregate: {
            args: Prisma.CpUsageMetricAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCpUsageMetric>
          }
          groupBy: {
            args: Prisma.CpUsageMetricGroupByArgs<ExtArgs>
            result: $Utils.Optional<CpUsageMetricGroupByOutputType>[]
          }
          count: {
            args: Prisma.CpUsageMetricCountArgs<ExtArgs>
            result: $Utils.Optional<CpUsageMetricCountAggregateOutputType> | number
          }
        }
      }
      CpPluginDirectory: {
        payload: Prisma.$CpPluginDirectoryPayload<ExtArgs>
        fields: Prisma.CpPluginDirectoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CpPluginDirectoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpPluginDirectoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CpPluginDirectoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpPluginDirectoryPayload>
          }
          findFirst: {
            args: Prisma.CpPluginDirectoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpPluginDirectoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CpPluginDirectoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpPluginDirectoryPayload>
          }
          findMany: {
            args: Prisma.CpPluginDirectoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpPluginDirectoryPayload>[]
          }
          create: {
            args: Prisma.CpPluginDirectoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpPluginDirectoryPayload>
          }
          createMany: {
            args: Prisma.CpPluginDirectoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CpPluginDirectoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpPluginDirectoryPayload>[]
          }
          delete: {
            args: Prisma.CpPluginDirectoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpPluginDirectoryPayload>
          }
          update: {
            args: Prisma.CpPluginDirectoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpPluginDirectoryPayload>
          }
          deleteMany: {
            args: Prisma.CpPluginDirectoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CpPluginDirectoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CpPluginDirectoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpPluginDirectoryPayload>
          }
          aggregate: {
            args: Prisma.CpPluginDirectoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCpPluginDirectory>
          }
          groupBy: {
            args: Prisma.CpPluginDirectoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CpPluginDirectoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CpPluginDirectoryCountArgs<ExtArgs>
            result: $Utils.Optional<CpPluginDirectoryCountAggregateOutputType> | number
          }
        }
      }
      CpTempAccessGrant: {
        payload: Prisma.$CpTempAccessGrantPayload<ExtArgs>
        fields: Prisma.CpTempAccessGrantFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CpTempAccessGrantFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpTempAccessGrantPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CpTempAccessGrantFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpTempAccessGrantPayload>
          }
          findFirst: {
            args: Prisma.CpTempAccessGrantFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpTempAccessGrantPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CpTempAccessGrantFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpTempAccessGrantPayload>
          }
          findMany: {
            args: Prisma.CpTempAccessGrantFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpTempAccessGrantPayload>[]
          }
          create: {
            args: Prisma.CpTempAccessGrantCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpTempAccessGrantPayload>
          }
          createMany: {
            args: Prisma.CpTempAccessGrantCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CpTempAccessGrantCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpTempAccessGrantPayload>[]
          }
          delete: {
            args: Prisma.CpTempAccessGrantDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpTempAccessGrantPayload>
          }
          update: {
            args: Prisma.CpTempAccessGrantUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpTempAccessGrantPayload>
          }
          deleteMany: {
            args: Prisma.CpTempAccessGrantDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CpTempAccessGrantUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CpTempAccessGrantUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpTempAccessGrantPayload>
          }
          aggregate: {
            args: Prisma.CpTempAccessGrantAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCpTempAccessGrant>
          }
          groupBy: {
            args: Prisma.CpTempAccessGrantGroupByArgs<ExtArgs>
            result: $Utils.Optional<CpTempAccessGrantGroupByOutputType>[]
          }
          count: {
            args: Prisma.CpTempAccessGrantCountArgs<ExtArgs>
            result: $Utils.Optional<CpTempAccessGrantCountAggregateOutputType> | number
          }
        }
      }
      CpTenantDbUpgrade: {
        payload: Prisma.$CpTenantDbUpgradePayload<ExtArgs>
        fields: Prisma.CpTenantDbUpgradeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CpTenantDbUpgradeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpTenantDbUpgradePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CpTenantDbUpgradeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpTenantDbUpgradePayload>
          }
          findFirst: {
            args: Prisma.CpTenantDbUpgradeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpTenantDbUpgradePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CpTenantDbUpgradeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpTenantDbUpgradePayload>
          }
          findMany: {
            args: Prisma.CpTenantDbUpgradeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpTenantDbUpgradePayload>[]
          }
          create: {
            args: Prisma.CpTenantDbUpgradeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpTenantDbUpgradePayload>
          }
          createMany: {
            args: Prisma.CpTenantDbUpgradeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CpTenantDbUpgradeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpTenantDbUpgradePayload>[]
          }
          delete: {
            args: Prisma.CpTenantDbUpgradeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpTenantDbUpgradePayload>
          }
          update: {
            args: Prisma.CpTenantDbUpgradeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpTenantDbUpgradePayload>
          }
          deleteMany: {
            args: Prisma.CpTenantDbUpgradeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CpTenantDbUpgradeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CpTenantDbUpgradeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpTenantDbUpgradePayload>
          }
          aggregate: {
            args: Prisma.CpTenantDbUpgradeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCpTenantDbUpgrade>
          }
          groupBy: {
            args: Prisma.CpTenantDbUpgradeGroupByArgs<ExtArgs>
            result: $Utils.Optional<CpTenantDbUpgradeGroupByOutputType>[]
          }
          count: {
            args: Prisma.CpTenantDbUpgradeCountArgs<ExtArgs>
            result: $Utils.Optional<CpTenantDbUpgradeCountAggregateOutputType> | number
          }
        }
      }
      CpIncident: {
        payload: Prisma.$CpIncidentPayload<ExtArgs>
        fields: Prisma.CpIncidentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CpIncidentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpIncidentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CpIncidentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpIncidentPayload>
          }
          findFirst: {
            args: Prisma.CpIncidentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpIncidentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CpIncidentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpIncidentPayload>
          }
          findMany: {
            args: Prisma.CpIncidentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpIncidentPayload>[]
          }
          create: {
            args: Prisma.CpIncidentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpIncidentPayload>
          }
          createMany: {
            args: Prisma.CpIncidentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CpIncidentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpIncidentPayload>[]
          }
          delete: {
            args: Prisma.CpIncidentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpIncidentPayload>
          }
          update: {
            args: Prisma.CpIncidentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpIncidentPayload>
          }
          deleteMany: {
            args: Prisma.CpIncidentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CpIncidentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CpIncidentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpIncidentPayload>
          }
          aggregate: {
            args: Prisma.CpIncidentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCpIncident>
          }
          groupBy: {
            args: Prisma.CpIncidentGroupByArgs<ExtArgs>
            result: $Utils.Optional<CpIncidentGroupByOutputType>[]
          }
          count: {
            args: Prisma.CpIncidentCountArgs<ExtArgs>
            result: $Utils.Optional<CpIncidentCountAggregateOutputType> | number
          }
        }
      }
      CpMigration: {
        payload: Prisma.$CpMigrationPayload<ExtArgs>
        fields: Prisma.CpMigrationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CpMigrationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpMigrationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CpMigrationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpMigrationPayload>
          }
          findFirst: {
            args: Prisma.CpMigrationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpMigrationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CpMigrationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpMigrationPayload>
          }
          findMany: {
            args: Prisma.CpMigrationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpMigrationPayload>[]
          }
          create: {
            args: Prisma.CpMigrationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpMigrationPayload>
          }
          createMany: {
            args: Prisma.CpMigrationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CpMigrationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpMigrationPayload>[]
          }
          delete: {
            args: Prisma.CpMigrationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpMigrationPayload>
          }
          update: {
            args: Prisma.CpMigrationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpMigrationPayload>
          }
          deleteMany: {
            args: Prisma.CpMigrationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CpMigrationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CpMigrationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpMigrationPayload>
          }
          aggregate: {
            args: Prisma.CpMigrationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCpMigration>
          }
          groupBy: {
            args: Prisma.CpMigrationGroupByArgs<ExtArgs>
            result: $Utils.Optional<CpMigrationGroupByOutputType>[]
          }
          count: {
            args: Prisma.CpMigrationCountArgs<ExtArgs>
            result: $Utils.Optional<CpMigrationCountAggregateOutputType> | number
          }
        }
      }
      CpUser: {
        payload: Prisma.$CpUserPayload<ExtArgs>
        fields: Prisma.CpUserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CpUserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpUserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CpUserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpUserPayload>
          }
          findFirst: {
            args: Prisma.CpUserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpUserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CpUserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpUserPayload>
          }
          findMany: {
            args: Prisma.CpUserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpUserPayload>[]
          }
          create: {
            args: Prisma.CpUserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpUserPayload>
          }
          createMany: {
            args: Prisma.CpUserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CpUserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpUserPayload>[]
          }
          delete: {
            args: Prisma.CpUserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpUserPayload>
          }
          update: {
            args: Prisma.CpUserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpUserPayload>
          }
          deleteMany: {
            args: Prisma.CpUserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CpUserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CpUserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpUserPayload>
          }
          aggregate: {
            args: Prisma.CpUserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCpUser>
          }
          groupBy: {
            args: Prisma.CpUserGroupByArgs<ExtArgs>
            result: $Utils.Optional<CpUserGroupByOutputType>[]
          }
          count: {
            args: Prisma.CpUserCountArgs<ExtArgs>
            result: $Utils.Optional<CpUserCountAggregateOutputType> | number
          }
        }
      }
      CpSession: {
        payload: Prisma.$CpSessionPayload<ExtArgs>
        fields: Prisma.CpSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CpSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CpSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpSessionPayload>
          }
          findFirst: {
            args: Prisma.CpSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CpSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpSessionPayload>
          }
          findMany: {
            args: Prisma.CpSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpSessionPayload>[]
          }
          create: {
            args: Prisma.CpSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpSessionPayload>
          }
          createMany: {
            args: Prisma.CpSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CpSessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpSessionPayload>[]
          }
          delete: {
            args: Prisma.CpSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpSessionPayload>
          }
          update: {
            args: Prisma.CpSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpSessionPayload>
          }
          deleteMany: {
            args: Prisma.CpSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CpSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CpSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpSessionPayload>
          }
          aggregate: {
            args: Prisma.CpSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCpSession>
          }
          groupBy: {
            args: Prisma.CpSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<CpSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.CpSessionCountArgs<ExtArgs>
            result: $Utils.Optional<CpSessionCountAggregateOutputType> | number
          }
        }
      }
      CpAccount: {
        payload: Prisma.$CpAccountPayload<ExtArgs>
        fields: Prisma.CpAccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CpAccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpAccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CpAccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpAccountPayload>
          }
          findFirst: {
            args: Prisma.CpAccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpAccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CpAccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpAccountPayload>
          }
          findMany: {
            args: Prisma.CpAccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpAccountPayload>[]
          }
          create: {
            args: Prisma.CpAccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpAccountPayload>
          }
          createMany: {
            args: Prisma.CpAccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CpAccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpAccountPayload>[]
          }
          delete: {
            args: Prisma.CpAccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpAccountPayload>
          }
          update: {
            args: Prisma.CpAccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpAccountPayload>
          }
          deleteMany: {
            args: Prisma.CpAccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CpAccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CpAccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpAccountPayload>
          }
          aggregate: {
            args: Prisma.CpAccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCpAccount>
          }
          groupBy: {
            args: Prisma.CpAccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<CpAccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.CpAccountCountArgs<ExtArgs>
            result: $Utils.Optional<CpAccountCountAggregateOutputType> | number
          }
        }
      }
      CpVerification: {
        payload: Prisma.$CpVerificationPayload<ExtArgs>
        fields: Prisma.CpVerificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CpVerificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpVerificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CpVerificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpVerificationPayload>
          }
          findFirst: {
            args: Prisma.CpVerificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpVerificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CpVerificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpVerificationPayload>
          }
          findMany: {
            args: Prisma.CpVerificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpVerificationPayload>[]
          }
          create: {
            args: Prisma.CpVerificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpVerificationPayload>
          }
          createMany: {
            args: Prisma.CpVerificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CpVerificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpVerificationPayload>[]
          }
          delete: {
            args: Prisma.CpVerificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpVerificationPayload>
          }
          update: {
            args: Prisma.CpVerificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpVerificationPayload>
          }
          deleteMany: {
            args: Prisma.CpVerificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CpVerificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CpVerificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpVerificationPayload>
          }
          aggregate: {
            args: Prisma.CpVerificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCpVerification>
          }
          groupBy: {
            args: Prisma.CpVerificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<CpVerificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.CpVerificationCountArgs<ExtArgs>
            result: $Utils.Optional<CpVerificationCountAggregateOutputType> | number
          }
        }
      }
      CpPatientIndex: {
        payload: Prisma.$CpPatientIndexPayload<ExtArgs>
        fields: Prisma.CpPatientIndexFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CpPatientIndexFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpPatientIndexPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CpPatientIndexFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpPatientIndexPayload>
          }
          findFirst: {
            args: Prisma.CpPatientIndexFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpPatientIndexPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CpPatientIndexFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpPatientIndexPayload>
          }
          findMany: {
            args: Prisma.CpPatientIndexFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpPatientIndexPayload>[]
          }
          create: {
            args: Prisma.CpPatientIndexCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpPatientIndexPayload>
          }
          createMany: {
            args: Prisma.CpPatientIndexCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CpPatientIndexCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpPatientIndexPayload>[]
          }
          delete: {
            args: Prisma.CpPatientIndexDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpPatientIndexPayload>
          }
          update: {
            args: Prisma.CpPatientIndexUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpPatientIndexPayload>
          }
          deleteMany: {
            args: Prisma.CpPatientIndexDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CpPatientIndexUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CpPatientIndexUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CpPatientIndexPayload>
          }
          aggregate: {
            args: Prisma.CpPatientIndexAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCpPatientIndex>
          }
          groupBy: {
            args: Prisma.CpPatientIndexGroupByArgs<ExtArgs>
            result: $Utils.Optional<CpPatientIndexGroupByOutputType>[]
          }
          count: {
            args: Prisma.CpPatientIndexCountArgs<ExtArgs>
            result: $Utils.Optional<CpPatientIndexCountAggregateOutputType> | number
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
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
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
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

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

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

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
   * Count Type CpOrganizationCountOutputType
   */

  export type CpOrganizationCountOutputType = {
    featureFlags: number
    usageMetrics: number
    tempAccessGrants: number
    tenantDbUpgrades: number
    incidents: number
    migrations: number
    patientIndexes: number
  }

  export type CpOrganizationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    featureFlags?: boolean | CpOrganizationCountOutputTypeCountFeatureFlagsArgs
    usageMetrics?: boolean | CpOrganizationCountOutputTypeCountUsageMetricsArgs
    tempAccessGrants?: boolean | CpOrganizationCountOutputTypeCountTempAccessGrantsArgs
    tenantDbUpgrades?: boolean | CpOrganizationCountOutputTypeCountTenantDbUpgradesArgs
    incidents?: boolean | CpOrganizationCountOutputTypeCountIncidentsArgs
    migrations?: boolean | CpOrganizationCountOutputTypeCountMigrationsArgs
    patientIndexes?: boolean | CpOrganizationCountOutputTypeCountPatientIndexesArgs
  }

  // Custom InputTypes
  /**
   * CpOrganizationCountOutputType without action
   */
  export type CpOrganizationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpOrganizationCountOutputType
     */
    select?: CpOrganizationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CpOrganizationCountOutputType without action
   */
  export type CpOrganizationCountOutputTypeCountFeatureFlagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CpFeatureFlagWhereInput
  }

  /**
   * CpOrganizationCountOutputType without action
   */
  export type CpOrganizationCountOutputTypeCountUsageMetricsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CpUsageMetricWhereInput
  }

  /**
   * CpOrganizationCountOutputType without action
   */
  export type CpOrganizationCountOutputTypeCountTempAccessGrantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CpTempAccessGrantWhereInput
  }

  /**
   * CpOrganizationCountOutputType without action
   */
  export type CpOrganizationCountOutputTypeCountTenantDbUpgradesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CpTenantDbUpgradeWhereInput
  }

  /**
   * CpOrganizationCountOutputType without action
   */
  export type CpOrganizationCountOutputTypeCountIncidentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CpIncidentWhereInput
  }

  /**
   * CpOrganizationCountOutputType without action
   */
  export type CpOrganizationCountOutputTypeCountMigrationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CpMigrationWhereInput
  }

  /**
   * CpOrganizationCountOutputType without action
   */
  export type CpOrganizationCountOutputTypeCountPatientIndexesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CpPatientIndexWhereInput
  }


  /**
   * Count Type CpUserCountOutputType
   */

  export type CpUserCountOutputType = {
    sessions: number
    accounts: number
  }

  export type CpUserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | CpUserCountOutputTypeCountSessionsArgs
    accounts?: boolean | CpUserCountOutputTypeCountAccountsArgs
  }

  // Custom InputTypes
  /**
   * CpUserCountOutputType without action
   */
  export type CpUserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpUserCountOutputType
     */
    select?: CpUserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CpUserCountOutputType without action
   */
  export type CpUserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CpSessionWhereInput
  }

  /**
   * CpUserCountOutputType without action
   */
  export type CpUserCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CpAccountWhereInput
  }


  /**
   * Models
   */

  /**
   * Model CpOrganization
   */

  export type AggregateCpOrganization = {
    _count: CpOrganizationCountAggregateOutputType | null
    _avg: CpOrganizationAvgAggregateOutputType | null
    _sum: CpOrganizationSumAggregateOutputType | null
    _min: CpOrganizationMinAggregateOutputType | null
    _max: CpOrganizationMaxAggregateOutputType | null
  }

  export type CpOrganizationAvgAggregateOutputType = {
    maxStaffSeats: number | null
    maxPatientRecords: number | null
    maxStorageMb: number | null
  }

  export type CpOrganizationSumAggregateOutputType = {
    maxStaffSeats: number | null
    maxPatientRecords: number | null
    maxStorageMb: bigint | null
  }

  export type CpOrganizationMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    type: string | null
    status: string | null
    billingEmail: string | null
    billingPlan: string | null
    stripeCustomerId: string | null
    stripeSubscriptionId: string | null
    maxStaffSeats: number | null
    maxPatientRecords: number | null
    maxStorageMb: bigint | null
    customDomain: string | null
    customDomainStatus: string | null
    dnsVerificationToken: string | null
    sslStatus: string | null
    primaryColor: string | null
    secondaryColor: string | null
    logoUrl: string | null
    deploymentUrl: string | null
    dbConnectionUri: string | null
    dbSchemaVersion: string | null
    trialEndsAt: Date | null
    contractStart: Date | null
    contractEnd: Date | null
    createdAt: Date | null
    allowCrossOrgReferrals: boolean | null
    referralCapacityStatus: string | null
    referralGeographicScope: string | null
    acceptedReferralTypes: string | null
  }

  export type CpOrganizationMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    type: string | null
    status: string | null
    billingEmail: string | null
    billingPlan: string | null
    stripeCustomerId: string | null
    stripeSubscriptionId: string | null
    maxStaffSeats: number | null
    maxPatientRecords: number | null
    maxStorageMb: bigint | null
    customDomain: string | null
    customDomainStatus: string | null
    dnsVerificationToken: string | null
    sslStatus: string | null
    primaryColor: string | null
    secondaryColor: string | null
    logoUrl: string | null
    deploymentUrl: string | null
    dbConnectionUri: string | null
    dbSchemaVersion: string | null
    trialEndsAt: Date | null
    contractStart: Date | null
    contractEnd: Date | null
    createdAt: Date | null
    allowCrossOrgReferrals: boolean | null
    referralCapacityStatus: string | null
    referralGeographicScope: string | null
    acceptedReferralTypes: string | null
  }

  export type CpOrganizationCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    type: number
    status: number
    billingEmail: number
    billingPlan: number
    stripeCustomerId: number
    stripeSubscriptionId: number
    maxStaffSeats: number
    maxPatientRecords: number
    maxStorageMb: number
    customDomain: number
    customDomainStatus: number
    dnsVerificationToken: number
    sslStatus: number
    primaryColor: number
    secondaryColor: number
    logoUrl: number
    deploymentUrl: number
    dbConnectionUri: number
    dbSchemaVersion: number
    trialEndsAt: number
    contractStart: number
    contractEnd: number
    createdAt: number
    allowCrossOrgReferrals: number
    referralCapacityStatus: number
    referralGeographicScope: number
    acceptedReferralTypes: number
    _all: number
  }


  export type CpOrganizationAvgAggregateInputType = {
    maxStaffSeats?: true
    maxPatientRecords?: true
    maxStorageMb?: true
  }

  export type CpOrganizationSumAggregateInputType = {
    maxStaffSeats?: true
    maxPatientRecords?: true
    maxStorageMb?: true
  }

  export type CpOrganizationMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    type?: true
    status?: true
    billingEmail?: true
    billingPlan?: true
    stripeCustomerId?: true
    stripeSubscriptionId?: true
    maxStaffSeats?: true
    maxPatientRecords?: true
    maxStorageMb?: true
    customDomain?: true
    customDomainStatus?: true
    dnsVerificationToken?: true
    sslStatus?: true
    primaryColor?: true
    secondaryColor?: true
    logoUrl?: true
    deploymentUrl?: true
    dbConnectionUri?: true
    dbSchemaVersion?: true
    trialEndsAt?: true
    contractStart?: true
    contractEnd?: true
    createdAt?: true
    allowCrossOrgReferrals?: true
    referralCapacityStatus?: true
    referralGeographicScope?: true
    acceptedReferralTypes?: true
  }

  export type CpOrganizationMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    type?: true
    status?: true
    billingEmail?: true
    billingPlan?: true
    stripeCustomerId?: true
    stripeSubscriptionId?: true
    maxStaffSeats?: true
    maxPatientRecords?: true
    maxStorageMb?: true
    customDomain?: true
    customDomainStatus?: true
    dnsVerificationToken?: true
    sslStatus?: true
    primaryColor?: true
    secondaryColor?: true
    logoUrl?: true
    deploymentUrl?: true
    dbConnectionUri?: true
    dbSchemaVersion?: true
    trialEndsAt?: true
    contractStart?: true
    contractEnd?: true
    createdAt?: true
    allowCrossOrgReferrals?: true
    referralCapacityStatus?: true
    referralGeographicScope?: true
    acceptedReferralTypes?: true
  }

  export type CpOrganizationCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    type?: true
    status?: true
    billingEmail?: true
    billingPlan?: true
    stripeCustomerId?: true
    stripeSubscriptionId?: true
    maxStaffSeats?: true
    maxPatientRecords?: true
    maxStorageMb?: true
    customDomain?: true
    customDomainStatus?: true
    dnsVerificationToken?: true
    sslStatus?: true
    primaryColor?: true
    secondaryColor?: true
    logoUrl?: true
    deploymentUrl?: true
    dbConnectionUri?: true
    dbSchemaVersion?: true
    trialEndsAt?: true
    contractStart?: true
    contractEnd?: true
    createdAt?: true
    allowCrossOrgReferrals?: true
    referralCapacityStatus?: true
    referralGeographicScope?: true
    acceptedReferralTypes?: true
    _all?: true
  }

  export type CpOrganizationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CpOrganization to aggregate.
     */
    where?: CpOrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CpOrganizations to fetch.
     */
    orderBy?: CpOrganizationOrderByWithRelationInput | CpOrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CpOrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CpOrganizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CpOrganizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CpOrganizations
    **/
    _count?: true | CpOrganizationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CpOrganizationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CpOrganizationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CpOrganizationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CpOrganizationMaxAggregateInputType
  }

  export type GetCpOrganizationAggregateType<T extends CpOrganizationAggregateArgs> = {
        [P in keyof T & keyof AggregateCpOrganization]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCpOrganization[P]>
      : GetScalarType<T[P], AggregateCpOrganization[P]>
  }




  export type CpOrganizationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CpOrganizationWhereInput
    orderBy?: CpOrganizationOrderByWithAggregationInput | CpOrganizationOrderByWithAggregationInput[]
    by: CpOrganizationScalarFieldEnum[] | CpOrganizationScalarFieldEnum
    having?: CpOrganizationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CpOrganizationCountAggregateInputType | true
    _avg?: CpOrganizationAvgAggregateInputType
    _sum?: CpOrganizationSumAggregateInputType
    _min?: CpOrganizationMinAggregateInputType
    _max?: CpOrganizationMaxAggregateInputType
  }

  export type CpOrganizationGroupByOutputType = {
    id: string
    name: string
    slug: string
    type: string
    status: string
    billingEmail: string | null
    billingPlan: string
    stripeCustomerId: string | null
    stripeSubscriptionId: string | null
    maxStaffSeats: number
    maxPatientRecords: number
    maxStorageMb: bigint
    customDomain: string | null
    customDomainStatus: string
    dnsVerificationToken: string | null
    sslStatus: string
    primaryColor: string
    secondaryColor: string
    logoUrl: string | null
    deploymentUrl: string | null
    dbConnectionUri: string | null
    dbSchemaVersion: string | null
    trialEndsAt: Date | null
    contractStart: Date | null
    contractEnd: Date | null
    createdAt: Date
    allowCrossOrgReferrals: boolean
    referralCapacityStatus: string
    referralGeographicScope: string
    acceptedReferralTypes: string
    _count: CpOrganizationCountAggregateOutputType | null
    _avg: CpOrganizationAvgAggregateOutputType | null
    _sum: CpOrganizationSumAggregateOutputType | null
    _min: CpOrganizationMinAggregateOutputType | null
    _max: CpOrganizationMaxAggregateOutputType | null
  }

  type GetCpOrganizationGroupByPayload<T extends CpOrganizationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CpOrganizationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CpOrganizationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CpOrganizationGroupByOutputType[P]>
            : GetScalarType<T[P], CpOrganizationGroupByOutputType[P]>
        }
      >
    >


  export type CpOrganizationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    type?: boolean
    status?: boolean
    billingEmail?: boolean
    billingPlan?: boolean
    stripeCustomerId?: boolean
    stripeSubscriptionId?: boolean
    maxStaffSeats?: boolean
    maxPatientRecords?: boolean
    maxStorageMb?: boolean
    customDomain?: boolean
    customDomainStatus?: boolean
    dnsVerificationToken?: boolean
    sslStatus?: boolean
    primaryColor?: boolean
    secondaryColor?: boolean
    logoUrl?: boolean
    deploymentUrl?: boolean
    dbConnectionUri?: boolean
    dbSchemaVersion?: boolean
    trialEndsAt?: boolean
    contractStart?: boolean
    contractEnd?: boolean
    createdAt?: boolean
    allowCrossOrgReferrals?: boolean
    referralCapacityStatus?: boolean
    referralGeographicScope?: boolean
    acceptedReferralTypes?: boolean
    featureFlags?: boolean | CpOrganization$featureFlagsArgs<ExtArgs>
    usageMetrics?: boolean | CpOrganization$usageMetricsArgs<ExtArgs>
    tempAccessGrants?: boolean | CpOrganization$tempAccessGrantsArgs<ExtArgs>
    tenantDbUpgrades?: boolean | CpOrganization$tenantDbUpgradesArgs<ExtArgs>
    incidents?: boolean | CpOrganization$incidentsArgs<ExtArgs>
    migrations?: boolean | CpOrganization$migrationsArgs<ExtArgs>
    patientIndexes?: boolean | CpOrganization$patientIndexesArgs<ExtArgs>
    _count?: boolean | CpOrganizationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cpOrganization"]>

  export type CpOrganizationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    type?: boolean
    status?: boolean
    billingEmail?: boolean
    billingPlan?: boolean
    stripeCustomerId?: boolean
    stripeSubscriptionId?: boolean
    maxStaffSeats?: boolean
    maxPatientRecords?: boolean
    maxStorageMb?: boolean
    customDomain?: boolean
    customDomainStatus?: boolean
    dnsVerificationToken?: boolean
    sslStatus?: boolean
    primaryColor?: boolean
    secondaryColor?: boolean
    logoUrl?: boolean
    deploymentUrl?: boolean
    dbConnectionUri?: boolean
    dbSchemaVersion?: boolean
    trialEndsAt?: boolean
    contractStart?: boolean
    contractEnd?: boolean
    createdAt?: boolean
    allowCrossOrgReferrals?: boolean
    referralCapacityStatus?: boolean
    referralGeographicScope?: boolean
    acceptedReferralTypes?: boolean
  }, ExtArgs["result"]["cpOrganization"]>

  export type CpOrganizationSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    type?: boolean
    status?: boolean
    billingEmail?: boolean
    billingPlan?: boolean
    stripeCustomerId?: boolean
    stripeSubscriptionId?: boolean
    maxStaffSeats?: boolean
    maxPatientRecords?: boolean
    maxStorageMb?: boolean
    customDomain?: boolean
    customDomainStatus?: boolean
    dnsVerificationToken?: boolean
    sslStatus?: boolean
    primaryColor?: boolean
    secondaryColor?: boolean
    logoUrl?: boolean
    deploymentUrl?: boolean
    dbConnectionUri?: boolean
    dbSchemaVersion?: boolean
    trialEndsAt?: boolean
    contractStart?: boolean
    contractEnd?: boolean
    createdAt?: boolean
    allowCrossOrgReferrals?: boolean
    referralCapacityStatus?: boolean
    referralGeographicScope?: boolean
    acceptedReferralTypes?: boolean
  }

  export type CpOrganizationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    featureFlags?: boolean | CpOrganization$featureFlagsArgs<ExtArgs>
    usageMetrics?: boolean | CpOrganization$usageMetricsArgs<ExtArgs>
    tempAccessGrants?: boolean | CpOrganization$tempAccessGrantsArgs<ExtArgs>
    tenantDbUpgrades?: boolean | CpOrganization$tenantDbUpgradesArgs<ExtArgs>
    incidents?: boolean | CpOrganization$incidentsArgs<ExtArgs>
    migrations?: boolean | CpOrganization$migrationsArgs<ExtArgs>
    patientIndexes?: boolean | CpOrganization$patientIndexesArgs<ExtArgs>
    _count?: boolean | CpOrganizationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CpOrganizationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CpOrganizationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CpOrganization"
    objects: {
      featureFlags: Prisma.$CpFeatureFlagPayload<ExtArgs>[]
      usageMetrics: Prisma.$CpUsageMetricPayload<ExtArgs>[]
      tempAccessGrants: Prisma.$CpTempAccessGrantPayload<ExtArgs>[]
      tenantDbUpgrades: Prisma.$CpTenantDbUpgradePayload<ExtArgs>[]
      incidents: Prisma.$CpIncidentPayload<ExtArgs>[]
      migrations: Prisma.$CpMigrationPayload<ExtArgs>[]
      patientIndexes: Prisma.$CpPatientIndexPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
      type: string
      status: string
      billingEmail: string | null
      billingPlan: string
      stripeCustomerId: string | null
      stripeSubscriptionId: string | null
      maxStaffSeats: number
      maxPatientRecords: number
      maxStorageMb: bigint
      customDomain: string | null
      customDomainStatus: string
      dnsVerificationToken: string | null
      sslStatus: string
      primaryColor: string
      secondaryColor: string
      logoUrl: string | null
      deploymentUrl: string | null
      dbConnectionUri: string | null
      dbSchemaVersion: string | null
      trialEndsAt: Date | null
      contractStart: Date | null
      contractEnd: Date | null
      createdAt: Date
      allowCrossOrgReferrals: boolean
      referralCapacityStatus: string
      referralGeographicScope: string
      acceptedReferralTypes: string
    }, ExtArgs["result"]["cpOrganization"]>
    composites: {}
  }

  type CpOrganizationGetPayload<S extends boolean | null | undefined | CpOrganizationDefaultArgs> = $Result.GetResult<Prisma.$CpOrganizationPayload, S>

  type CpOrganizationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CpOrganizationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CpOrganizationCountAggregateInputType | true
    }

  export interface CpOrganizationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CpOrganization'], meta: { name: 'CpOrganization' } }
    /**
     * Find zero or one CpOrganization that matches the filter.
     * @param {CpOrganizationFindUniqueArgs} args - Arguments to find a CpOrganization
     * @example
     * // Get one CpOrganization
     * const cpOrganization = await prisma.cpOrganization.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CpOrganizationFindUniqueArgs>(args: SelectSubset<T, CpOrganizationFindUniqueArgs<ExtArgs>>): Prisma__CpOrganizationClient<$Result.GetResult<Prisma.$CpOrganizationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CpOrganization that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CpOrganizationFindUniqueOrThrowArgs} args - Arguments to find a CpOrganization
     * @example
     * // Get one CpOrganization
     * const cpOrganization = await prisma.cpOrganization.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CpOrganizationFindUniqueOrThrowArgs>(args: SelectSubset<T, CpOrganizationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CpOrganizationClient<$Result.GetResult<Prisma.$CpOrganizationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CpOrganization that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpOrganizationFindFirstArgs} args - Arguments to find a CpOrganization
     * @example
     * // Get one CpOrganization
     * const cpOrganization = await prisma.cpOrganization.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CpOrganizationFindFirstArgs>(args?: SelectSubset<T, CpOrganizationFindFirstArgs<ExtArgs>>): Prisma__CpOrganizationClient<$Result.GetResult<Prisma.$CpOrganizationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CpOrganization that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpOrganizationFindFirstOrThrowArgs} args - Arguments to find a CpOrganization
     * @example
     * // Get one CpOrganization
     * const cpOrganization = await prisma.cpOrganization.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CpOrganizationFindFirstOrThrowArgs>(args?: SelectSubset<T, CpOrganizationFindFirstOrThrowArgs<ExtArgs>>): Prisma__CpOrganizationClient<$Result.GetResult<Prisma.$CpOrganizationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CpOrganizations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpOrganizationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CpOrganizations
     * const cpOrganizations = await prisma.cpOrganization.findMany()
     * 
     * // Get first 10 CpOrganizations
     * const cpOrganizations = await prisma.cpOrganization.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cpOrganizationWithIdOnly = await prisma.cpOrganization.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CpOrganizationFindManyArgs>(args?: SelectSubset<T, CpOrganizationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CpOrganizationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CpOrganization.
     * @param {CpOrganizationCreateArgs} args - Arguments to create a CpOrganization.
     * @example
     * // Create one CpOrganization
     * const CpOrganization = await prisma.cpOrganization.create({
     *   data: {
     *     // ... data to create a CpOrganization
     *   }
     * })
     * 
     */
    create<T extends CpOrganizationCreateArgs>(args: SelectSubset<T, CpOrganizationCreateArgs<ExtArgs>>): Prisma__CpOrganizationClient<$Result.GetResult<Prisma.$CpOrganizationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CpOrganizations.
     * @param {CpOrganizationCreateManyArgs} args - Arguments to create many CpOrganizations.
     * @example
     * // Create many CpOrganizations
     * const cpOrganization = await prisma.cpOrganization.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CpOrganizationCreateManyArgs>(args?: SelectSubset<T, CpOrganizationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CpOrganizations and returns the data saved in the database.
     * @param {CpOrganizationCreateManyAndReturnArgs} args - Arguments to create many CpOrganizations.
     * @example
     * // Create many CpOrganizations
     * const cpOrganization = await prisma.cpOrganization.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CpOrganizations and only return the `id`
     * const cpOrganizationWithIdOnly = await prisma.cpOrganization.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CpOrganizationCreateManyAndReturnArgs>(args?: SelectSubset<T, CpOrganizationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CpOrganizationPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a CpOrganization.
     * @param {CpOrganizationDeleteArgs} args - Arguments to delete one CpOrganization.
     * @example
     * // Delete one CpOrganization
     * const CpOrganization = await prisma.cpOrganization.delete({
     *   where: {
     *     // ... filter to delete one CpOrganization
     *   }
     * })
     * 
     */
    delete<T extends CpOrganizationDeleteArgs>(args: SelectSubset<T, CpOrganizationDeleteArgs<ExtArgs>>): Prisma__CpOrganizationClient<$Result.GetResult<Prisma.$CpOrganizationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CpOrganization.
     * @param {CpOrganizationUpdateArgs} args - Arguments to update one CpOrganization.
     * @example
     * // Update one CpOrganization
     * const cpOrganization = await prisma.cpOrganization.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CpOrganizationUpdateArgs>(args: SelectSubset<T, CpOrganizationUpdateArgs<ExtArgs>>): Prisma__CpOrganizationClient<$Result.GetResult<Prisma.$CpOrganizationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CpOrganizations.
     * @param {CpOrganizationDeleteManyArgs} args - Arguments to filter CpOrganizations to delete.
     * @example
     * // Delete a few CpOrganizations
     * const { count } = await prisma.cpOrganization.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CpOrganizationDeleteManyArgs>(args?: SelectSubset<T, CpOrganizationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CpOrganizations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpOrganizationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CpOrganizations
     * const cpOrganization = await prisma.cpOrganization.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CpOrganizationUpdateManyArgs>(args: SelectSubset<T, CpOrganizationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CpOrganization.
     * @param {CpOrganizationUpsertArgs} args - Arguments to update or create a CpOrganization.
     * @example
     * // Update or create a CpOrganization
     * const cpOrganization = await prisma.cpOrganization.upsert({
     *   create: {
     *     // ... data to create a CpOrganization
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CpOrganization we want to update
     *   }
     * })
     */
    upsert<T extends CpOrganizationUpsertArgs>(args: SelectSubset<T, CpOrganizationUpsertArgs<ExtArgs>>): Prisma__CpOrganizationClient<$Result.GetResult<Prisma.$CpOrganizationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CpOrganizations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpOrganizationCountArgs} args - Arguments to filter CpOrganizations to count.
     * @example
     * // Count the number of CpOrganizations
     * const count = await prisma.cpOrganization.count({
     *   where: {
     *     // ... the filter for the CpOrganizations we want to count
     *   }
     * })
    **/
    count<T extends CpOrganizationCountArgs>(
      args?: Subset<T, CpOrganizationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CpOrganizationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CpOrganization.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpOrganizationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CpOrganizationAggregateArgs>(args: Subset<T, CpOrganizationAggregateArgs>): Prisma.PrismaPromise<GetCpOrganizationAggregateType<T>>

    /**
     * Group by CpOrganization.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpOrganizationGroupByArgs} args - Group by arguments.
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
      T extends CpOrganizationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CpOrganizationGroupByArgs['orderBy'] }
        : { orderBy?: CpOrganizationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CpOrganizationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCpOrganizationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CpOrganization model
   */
  readonly fields: CpOrganizationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CpOrganization.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CpOrganizationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    featureFlags<T extends CpOrganization$featureFlagsArgs<ExtArgs> = {}>(args?: Subset<T, CpOrganization$featureFlagsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CpFeatureFlagPayload<ExtArgs>, T, "findMany"> | Null>
    usageMetrics<T extends CpOrganization$usageMetricsArgs<ExtArgs> = {}>(args?: Subset<T, CpOrganization$usageMetricsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CpUsageMetricPayload<ExtArgs>, T, "findMany"> | Null>
    tempAccessGrants<T extends CpOrganization$tempAccessGrantsArgs<ExtArgs> = {}>(args?: Subset<T, CpOrganization$tempAccessGrantsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CpTempAccessGrantPayload<ExtArgs>, T, "findMany"> | Null>
    tenantDbUpgrades<T extends CpOrganization$tenantDbUpgradesArgs<ExtArgs> = {}>(args?: Subset<T, CpOrganization$tenantDbUpgradesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CpTenantDbUpgradePayload<ExtArgs>, T, "findMany"> | Null>
    incidents<T extends CpOrganization$incidentsArgs<ExtArgs> = {}>(args?: Subset<T, CpOrganization$incidentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CpIncidentPayload<ExtArgs>, T, "findMany"> | Null>
    migrations<T extends CpOrganization$migrationsArgs<ExtArgs> = {}>(args?: Subset<T, CpOrganization$migrationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CpMigrationPayload<ExtArgs>, T, "findMany"> | Null>
    patientIndexes<T extends CpOrganization$patientIndexesArgs<ExtArgs> = {}>(args?: Subset<T, CpOrganization$patientIndexesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CpPatientIndexPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the CpOrganization model
   */ 
  interface CpOrganizationFieldRefs {
    readonly id: FieldRef<"CpOrganization", 'String'>
    readonly name: FieldRef<"CpOrganization", 'String'>
    readonly slug: FieldRef<"CpOrganization", 'String'>
    readonly type: FieldRef<"CpOrganization", 'String'>
    readonly status: FieldRef<"CpOrganization", 'String'>
    readonly billingEmail: FieldRef<"CpOrganization", 'String'>
    readonly billingPlan: FieldRef<"CpOrganization", 'String'>
    readonly stripeCustomerId: FieldRef<"CpOrganization", 'String'>
    readonly stripeSubscriptionId: FieldRef<"CpOrganization", 'String'>
    readonly maxStaffSeats: FieldRef<"CpOrganization", 'Int'>
    readonly maxPatientRecords: FieldRef<"CpOrganization", 'Int'>
    readonly maxStorageMb: FieldRef<"CpOrganization", 'BigInt'>
    readonly customDomain: FieldRef<"CpOrganization", 'String'>
    readonly customDomainStatus: FieldRef<"CpOrganization", 'String'>
    readonly dnsVerificationToken: FieldRef<"CpOrganization", 'String'>
    readonly sslStatus: FieldRef<"CpOrganization", 'String'>
    readonly primaryColor: FieldRef<"CpOrganization", 'String'>
    readonly secondaryColor: FieldRef<"CpOrganization", 'String'>
    readonly logoUrl: FieldRef<"CpOrganization", 'String'>
    readonly deploymentUrl: FieldRef<"CpOrganization", 'String'>
    readonly dbConnectionUri: FieldRef<"CpOrganization", 'String'>
    readonly dbSchemaVersion: FieldRef<"CpOrganization", 'String'>
    readonly trialEndsAt: FieldRef<"CpOrganization", 'DateTime'>
    readonly contractStart: FieldRef<"CpOrganization", 'DateTime'>
    readonly contractEnd: FieldRef<"CpOrganization", 'DateTime'>
    readonly createdAt: FieldRef<"CpOrganization", 'DateTime'>
    readonly allowCrossOrgReferrals: FieldRef<"CpOrganization", 'Boolean'>
    readonly referralCapacityStatus: FieldRef<"CpOrganization", 'String'>
    readonly referralGeographicScope: FieldRef<"CpOrganization", 'String'>
    readonly acceptedReferralTypes: FieldRef<"CpOrganization", 'String'>
  }
    

  // Custom InputTypes
  /**
   * CpOrganization findUnique
   */
  export type CpOrganizationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpOrganization
     */
    select?: CpOrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpOrganizationInclude<ExtArgs> | null
    /**
     * Filter, which CpOrganization to fetch.
     */
    where: CpOrganizationWhereUniqueInput
  }

  /**
   * CpOrganization findUniqueOrThrow
   */
  export type CpOrganizationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpOrganization
     */
    select?: CpOrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpOrganizationInclude<ExtArgs> | null
    /**
     * Filter, which CpOrganization to fetch.
     */
    where: CpOrganizationWhereUniqueInput
  }

  /**
   * CpOrganization findFirst
   */
  export type CpOrganizationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpOrganization
     */
    select?: CpOrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpOrganizationInclude<ExtArgs> | null
    /**
     * Filter, which CpOrganization to fetch.
     */
    where?: CpOrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CpOrganizations to fetch.
     */
    orderBy?: CpOrganizationOrderByWithRelationInput | CpOrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CpOrganizations.
     */
    cursor?: CpOrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CpOrganizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CpOrganizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CpOrganizations.
     */
    distinct?: CpOrganizationScalarFieldEnum | CpOrganizationScalarFieldEnum[]
  }

  /**
   * CpOrganization findFirstOrThrow
   */
  export type CpOrganizationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpOrganization
     */
    select?: CpOrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpOrganizationInclude<ExtArgs> | null
    /**
     * Filter, which CpOrganization to fetch.
     */
    where?: CpOrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CpOrganizations to fetch.
     */
    orderBy?: CpOrganizationOrderByWithRelationInput | CpOrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CpOrganizations.
     */
    cursor?: CpOrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CpOrganizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CpOrganizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CpOrganizations.
     */
    distinct?: CpOrganizationScalarFieldEnum | CpOrganizationScalarFieldEnum[]
  }

  /**
   * CpOrganization findMany
   */
  export type CpOrganizationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpOrganization
     */
    select?: CpOrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpOrganizationInclude<ExtArgs> | null
    /**
     * Filter, which CpOrganizations to fetch.
     */
    where?: CpOrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CpOrganizations to fetch.
     */
    orderBy?: CpOrganizationOrderByWithRelationInput | CpOrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CpOrganizations.
     */
    cursor?: CpOrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CpOrganizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CpOrganizations.
     */
    skip?: number
    distinct?: CpOrganizationScalarFieldEnum | CpOrganizationScalarFieldEnum[]
  }

  /**
   * CpOrganization create
   */
  export type CpOrganizationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpOrganization
     */
    select?: CpOrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpOrganizationInclude<ExtArgs> | null
    /**
     * The data needed to create a CpOrganization.
     */
    data: XOR<CpOrganizationCreateInput, CpOrganizationUncheckedCreateInput>
  }

  /**
   * CpOrganization createMany
   */
  export type CpOrganizationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CpOrganizations.
     */
    data: CpOrganizationCreateManyInput | CpOrganizationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CpOrganization createManyAndReturn
   */
  export type CpOrganizationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpOrganization
     */
    select?: CpOrganizationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many CpOrganizations.
     */
    data: CpOrganizationCreateManyInput | CpOrganizationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CpOrganization update
   */
  export type CpOrganizationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpOrganization
     */
    select?: CpOrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpOrganizationInclude<ExtArgs> | null
    /**
     * The data needed to update a CpOrganization.
     */
    data: XOR<CpOrganizationUpdateInput, CpOrganizationUncheckedUpdateInput>
    /**
     * Choose, which CpOrganization to update.
     */
    where: CpOrganizationWhereUniqueInput
  }

  /**
   * CpOrganization updateMany
   */
  export type CpOrganizationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CpOrganizations.
     */
    data: XOR<CpOrganizationUpdateManyMutationInput, CpOrganizationUncheckedUpdateManyInput>
    /**
     * Filter which CpOrganizations to update
     */
    where?: CpOrganizationWhereInput
  }

  /**
   * CpOrganization upsert
   */
  export type CpOrganizationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpOrganization
     */
    select?: CpOrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpOrganizationInclude<ExtArgs> | null
    /**
     * The filter to search for the CpOrganization to update in case it exists.
     */
    where: CpOrganizationWhereUniqueInput
    /**
     * In case the CpOrganization found by the `where` argument doesn't exist, create a new CpOrganization with this data.
     */
    create: XOR<CpOrganizationCreateInput, CpOrganizationUncheckedCreateInput>
    /**
     * In case the CpOrganization was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CpOrganizationUpdateInput, CpOrganizationUncheckedUpdateInput>
  }

  /**
   * CpOrganization delete
   */
  export type CpOrganizationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpOrganization
     */
    select?: CpOrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpOrganizationInclude<ExtArgs> | null
    /**
     * Filter which CpOrganization to delete.
     */
    where: CpOrganizationWhereUniqueInput
  }

  /**
   * CpOrganization deleteMany
   */
  export type CpOrganizationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CpOrganizations to delete
     */
    where?: CpOrganizationWhereInput
  }

  /**
   * CpOrganization.featureFlags
   */
  export type CpOrganization$featureFlagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpFeatureFlag
     */
    select?: CpFeatureFlagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpFeatureFlagInclude<ExtArgs> | null
    where?: CpFeatureFlagWhereInput
    orderBy?: CpFeatureFlagOrderByWithRelationInput | CpFeatureFlagOrderByWithRelationInput[]
    cursor?: CpFeatureFlagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CpFeatureFlagScalarFieldEnum | CpFeatureFlagScalarFieldEnum[]
  }

  /**
   * CpOrganization.usageMetrics
   */
  export type CpOrganization$usageMetricsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpUsageMetric
     */
    select?: CpUsageMetricSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpUsageMetricInclude<ExtArgs> | null
    where?: CpUsageMetricWhereInput
    orderBy?: CpUsageMetricOrderByWithRelationInput | CpUsageMetricOrderByWithRelationInput[]
    cursor?: CpUsageMetricWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CpUsageMetricScalarFieldEnum | CpUsageMetricScalarFieldEnum[]
  }

  /**
   * CpOrganization.tempAccessGrants
   */
  export type CpOrganization$tempAccessGrantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpTempAccessGrant
     */
    select?: CpTempAccessGrantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpTempAccessGrantInclude<ExtArgs> | null
    where?: CpTempAccessGrantWhereInput
    orderBy?: CpTempAccessGrantOrderByWithRelationInput | CpTempAccessGrantOrderByWithRelationInput[]
    cursor?: CpTempAccessGrantWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CpTempAccessGrantScalarFieldEnum | CpTempAccessGrantScalarFieldEnum[]
  }

  /**
   * CpOrganization.tenantDbUpgrades
   */
  export type CpOrganization$tenantDbUpgradesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpTenantDbUpgrade
     */
    select?: CpTenantDbUpgradeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpTenantDbUpgradeInclude<ExtArgs> | null
    where?: CpTenantDbUpgradeWhereInput
    orderBy?: CpTenantDbUpgradeOrderByWithRelationInput | CpTenantDbUpgradeOrderByWithRelationInput[]
    cursor?: CpTenantDbUpgradeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CpTenantDbUpgradeScalarFieldEnum | CpTenantDbUpgradeScalarFieldEnum[]
  }

  /**
   * CpOrganization.incidents
   */
  export type CpOrganization$incidentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpIncident
     */
    select?: CpIncidentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpIncidentInclude<ExtArgs> | null
    where?: CpIncidentWhereInput
    orderBy?: CpIncidentOrderByWithRelationInput | CpIncidentOrderByWithRelationInput[]
    cursor?: CpIncidentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CpIncidentScalarFieldEnum | CpIncidentScalarFieldEnum[]
  }

  /**
   * CpOrganization.migrations
   */
  export type CpOrganization$migrationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpMigration
     */
    select?: CpMigrationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpMigrationInclude<ExtArgs> | null
    where?: CpMigrationWhereInput
    orderBy?: CpMigrationOrderByWithRelationInput | CpMigrationOrderByWithRelationInput[]
    cursor?: CpMigrationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CpMigrationScalarFieldEnum | CpMigrationScalarFieldEnum[]
  }

  /**
   * CpOrganization.patientIndexes
   */
  export type CpOrganization$patientIndexesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpPatientIndex
     */
    select?: CpPatientIndexSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpPatientIndexInclude<ExtArgs> | null
    where?: CpPatientIndexWhereInput
    orderBy?: CpPatientIndexOrderByWithRelationInput | CpPatientIndexOrderByWithRelationInput[]
    cursor?: CpPatientIndexWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CpPatientIndexScalarFieldEnum | CpPatientIndexScalarFieldEnum[]
  }

  /**
   * CpOrganization without action
   */
  export type CpOrganizationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpOrganization
     */
    select?: CpOrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpOrganizationInclude<ExtArgs> | null
  }


  /**
   * Model CpFeatureFlag
   */

  export type AggregateCpFeatureFlag = {
    _count: CpFeatureFlagCountAggregateOutputType | null
    _min: CpFeatureFlagMinAggregateOutputType | null
    _max: CpFeatureFlagMaxAggregateOutputType | null
  }

  export type CpFeatureFlagMinAggregateOutputType = {
    orgId: string | null
    featureKey: string | null
    isEnabled: boolean | null
    configuredAt: Date | null
    configuredBy: string | null
  }

  export type CpFeatureFlagMaxAggregateOutputType = {
    orgId: string | null
    featureKey: string | null
    isEnabled: boolean | null
    configuredAt: Date | null
    configuredBy: string | null
  }

  export type CpFeatureFlagCountAggregateOutputType = {
    orgId: number
    featureKey: number
    isEnabled: number
    configuredAt: number
    configuredBy: number
    _all: number
  }


  export type CpFeatureFlagMinAggregateInputType = {
    orgId?: true
    featureKey?: true
    isEnabled?: true
    configuredAt?: true
    configuredBy?: true
  }

  export type CpFeatureFlagMaxAggregateInputType = {
    orgId?: true
    featureKey?: true
    isEnabled?: true
    configuredAt?: true
    configuredBy?: true
  }

  export type CpFeatureFlagCountAggregateInputType = {
    orgId?: true
    featureKey?: true
    isEnabled?: true
    configuredAt?: true
    configuredBy?: true
    _all?: true
  }

  export type CpFeatureFlagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CpFeatureFlag to aggregate.
     */
    where?: CpFeatureFlagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CpFeatureFlags to fetch.
     */
    orderBy?: CpFeatureFlagOrderByWithRelationInput | CpFeatureFlagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CpFeatureFlagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CpFeatureFlags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CpFeatureFlags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CpFeatureFlags
    **/
    _count?: true | CpFeatureFlagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CpFeatureFlagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CpFeatureFlagMaxAggregateInputType
  }

  export type GetCpFeatureFlagAggregateType<T extends CpFeatureFlagAggregateArgs> = {
        [P in keyof T & keyof AggregateCpFeatureFlag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCpFeatureFlag[P]>
      : GetScalarType<T[P], AggregateCpFeatureFlag[P]>
  }




  export type CpFeatureFlagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CpFeatureFlagWhereInput
    orderBy?: CpFeatureFlagOrderByWithAggregationInput | CpFeatureFlagOrderByWithAggregationInput[]
    by: CpFeatureFlagScalarFieldEnum[] | CpFeatureFlagScalarFieldEnum
    having?: CpFeatureFlagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CpFeatureFlagCountAggregateInputType | true
    _min?: CpFeatureFlagMinAggregateInputType
    _max?: CpFeatureFlagMaxAggregateInputType
  }

  export type CpFeatureFlagGroupByOutputType = {
    orgId: string
    featureKey: string
    isEnabled: boolean
    configuredAt: Date
    configuredBy: string | null
    _count: CpFeatureFlagCountAggregateOutputType | null
    _min: CpFeatureFlagMinAggregateOutputType | null
    _max: CpFeatureFlagMaxAggregateOutputType | null
  }

  type GetCpFeatureFlagGroupByPayload<T extends CpFeatureFlagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CpFeatureFlagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CpFeatureFlagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CpFeatureFlagGroupByOutputType[P]>
            : GetScalarType<T[P], CpFeatureFlagGroupByOutputType[P]>
        }
      >
    >


  export type CpFeatureFlagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    orgId?: boolean
    featureKey?: boolean
    isEnabled?: boolean
    configuredAt?: boolean
    configuredBy?: boolean
    organization?: boolean | CpOrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cpFeatureFlag"]>

  export type CpFeatureFlagSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    orgId?: boolean
    featureKey?: boolean
    isEnabled?: boolean
    configuredAt?: boolean
    configuredBy?: boolean
    organization?: boolean | CpOrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cpFeatureFlag"]>

  export type CpFeatureFlagSelectScalar = {
    orgId?: boolean
    featureKey?: boolean
    isEnabled?: boolean
    configuredAt?: boolean
    configuredBy?: boolean
  }

  export type CpFeatureFlagInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | CpOrganizationDefaultArgs<ExtArgs>
  }
  export type CpFeatureFlagIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | CpOrganizationDefaultArgs<ExtArgs>
  }

  export type $CpFeatureFlagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CpFeatureFlag"
    objects: {
      organization: Prisma.$CpOrganizationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      orgId: string
      featureKey: string
      isEnabled: boolean
      configuredAt: Date
      configuredBy: string | null
    }, ExtArgs["result"]["cpFeatureFlag"]>
    composites: {}
  }

  type CpFeatureFlagGetPayload<S extends boolean | null | undefined | CpFeatureFlagDefaultArgs> = $Result.GetResult<Prisma.$CpFeatureFlagPayload, S>

  type CpFeatureFlagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CpFeatureFlagFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CpFeatureFlagCountAggregateInputType | true
    }

  export interface CpFeatureFlagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CpFeatureFlag'], meta: { name: 'CpFeatureFlag' } }
    /**
     * Find zero or one CpFeatureFlag that matches the filter.
     * @param {CpFeatureFlagFindUniqueArgs} args - Arguments to find a CpFeatureFlag
     * @example
     * // Get one CpFeatureFlag
     * const cpFeatureFlag = await prisma.cpFeatureFlag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CpFeatureFlagFindUniqueArgs>(args: SelectSubset<T, CpFeatureFlagFindUniqueArgs<ExtArgs>>): Prisma__CpFeatureFlagClient<$Result.GetResult<Prisma.$CpFeatureFlagPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CpFeatureFlag that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CpFeatureFlagFindUniqueOrThrowArgs} args - Arguments to find a CpFeatureFlag
     * @example
     * // Get one CpFeatureFlag
     * const cpFeatureFlag = await prisma.cpFeatureFlag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CpFeatureFlagFindUniqueOrThrowArgs>(args: SelectSubset<T, CpFeatureFlagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CpFeatureFlagClient<$Result.GetResult<Prisma.$CpFeatureFlagPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CpFeatureFlag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpFeatureFlagFindFirstArgs} args - Arguments to find a CpFeatureFlag
     * @example
     * // Get one CpFeatureFlag
     * const cpFeatureFlag = await prisma.cpFeatureFlag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CpFeatureFlagFindFirstArgs>(args?: SelectSubset<T, CpFeatureFlagFindFirstArgs<ExtArgs>>): Prisma__CpFeatureFlagClient<$Result.GetResult<Prisma.$CpFeatureFlagPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CpFeatureFlag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpFeatureFlagFindFirstOrThrowArgs} args - Arguments to find a CpFeatureFlag
     * @example
     * // Get one CpFeatureFlag
     * const cpFeatureFlag = await prisma.cpFeatureFlag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CpFeatureFlagFindFirstOrThrowArgs>(args?: SelectSubset<T, CpFeatureFlagFindFirstOrThrowArgs<ExtArgs>>): Prisma__CpFeatureFlagClient<$Result.GetResult<Prisma.$CpFeatureFlagPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CpFeatureFlags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpFeatureFlagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CpFeatureFlags
     * const cpFeatureFlags = await prisma.cpFeatureFlag.findMany()
     * 
     * // Get first 10 CpFeatureFlags
     * const cpFeatureFlags = await prisma.cpFeatureFlag.findMany({ take: 10 })
     * 
     * // Only select the `orgId`
     * const cpFeatureFlagWithOrgIdOnly = await prisma.cpFeatureFlag.findMany({ select: { orgId: true } })
     * 
     */
    findMany<T extends CpFeatureFlagFindManyArgs>(args?: SelectSubset<T, CpFeatureFlagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CpFeatureFlagPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CpFeatureFlag.
     * @param {CpFeatureFlagCreateArgs} args - Arguments to create a CpFeatureFlag.
     * @example
     * // Create one CpFeatureFlag
     * const CpFeatureFlag = await prisma.cpFeatureFlag.create({
     *   data: {
     *     // ... data to create a CpFeatureFlag
     *   }
     * })
     * 
     */
    create<T extends CpFeatureFlagCreateArgs>(args: SelectSubset<T, CpFeatureFlagCreateArgs<ExtArgs>>): Prisma__CpFeatureFlagClient<$Result.GetResult<Prisma.$CpFeatureFlagPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CpFeatureFlags.
     * @param {CpFeatureFlagCreateManyArgs} args - Arguments to create many CpFeatureFlags.
     * @example
     * // Create many CpFeatureFlags
     * const cpFeatureFlag = await prisma.cpFeatureFlag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CpFeatureFlagCreateManyArgs>(args?: SelectSubset<T, CpFeatureFlagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CpFeatureFlags and returns the data saved in the database.
     * @param {CpFeatureFlagCreateManyAndReturnArgs} args - Arguments to create many CpFeatureFlags.
     * @example
     * // Create many CpFeatureFlags
     * const cpFeatureFlag = await prisma.cpFeatureFlag.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CpFeatureFlags and only return the `orgId`
     * const cpFeatureFlagWithOrgIdOnly = await prisma.cpFeatureFlag.createManyAndReturn({ 
     *   select: { orgId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CpFeatureFlagCreateManyAndReturnArgs>(args?: SelectSubset<T, CpFeatureFlagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CpFeatureFlagPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a CpFeatureFlag.
     * @param {CpFeatureFlagDeleteArgs} args - Arguments to delete one CpFeatureFlag.
     * @example
     * // Delete one CpFeatureFlag
     * const CpFeatureFlag = await prisma.cpFeatureFlag.delete({
     *   where: {
     *     // ... filter to delete one CpFeatureFlag
     *   }
     * })
     * 
     */
    delete<T extends CpFeatureFlagDeleteArgs>(args: SelectSubset<T, CpFeatureFlagDeleteArgs<ExtArgs>>): Prisma__CpFeatureFlagClient<$Result.GetResult<Prisma.$CpFeatureFlagPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CpFeatureFlag.
     * @param {CpFeatureFlagUpdateArgs} args - Arguments to update one CpFeatureFlag.
     * @example
     * // Update one CpFeatureFlag
     * const cpFeatureFlag = await prisma.cpFeatureFlag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CpFeatureFlagUpdateArgs>(args: SelectSubset<T, CpFeatureFlagUpdateArgs<ExtArgs>>): Prisma__CpFeatureFlagClient<$Result.GetResult<Prisma.$CpFeatureFlagPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CpFeatureFlags.
     * @param {CpFeatureFlagDeleteManyArgs} args - Arguments to filter CpFeatureFlags to delete.
     * @example
     * // Delete a few CpFeatureFlags
     * const { count } = await prisma.cpFeatureFlag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CpFeatureFlagDeleteManyArgs>(args?: SelectSubset<T, CpFeatureFlagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CpFeatureFlags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpFeatureFlagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CpFeatureFlags
     * const cpFeatureFlag = await prisma.cpFeatureFlag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CpFeatureFlagUpdateManyArgs>(args: SelectSubset<T, CpFeatureFlagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CpFeatureFlag.
     * @param {CpFeatureFlagUpsertArgs} args - Arguments to update or create a CpFeatureFlag.
     * @example
     * // Update or create a CpFeatureFlag
     * const cpFeatureFlag = await prisma.cpFeatureFlag.upsert({
     *   create: {
     *     // ... data to create a CpFeatureFlag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CpFeatureFlag we want to update
     *   }
     * })
     */
    upsert<T extends CpFeatureFlagUpsertArgs>(args: SelectSubset<T, CpFeatureFlagUpsertArgs<ExtArgs>>): Prisma__CpFeatureFlagClient<$Result.GetResult<Prisma.$CpFeatureFlagPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CpFeatureFlags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpFeatureFlagCountArgs} args - Arguments to filter CpFeatureFlags to count.
     * @example
     * // Count the number of CpFeatureFlags
     * const count = await prisma.cpFeatureFlag.count({
     *   where: {
     *     // ... the filter for the CpFeatureFlags we want to count
     *   }
     * })
    **/
    count<T extends CpFeatureFlagCountArgs>(
      args?: Subset<T, CpFeatureFlagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CpFeatureFlagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CpFeatureFlag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpFeatureFlagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CpFeatureFlagAggregateArgs>(args: Subset<T, CpFeatureFlagAggregateArgs>): Prisma.PrismaPromise<GetCpFeatureFlagAggregateType<T>>

    /**
     * Group by CpFeatureFlag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpFeatureFlagGroupByArgs} args - Group by arguments.
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
      T extends CpFeatureFlagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CpFeatureFlagGroupByArgs['orderBy'] }
        : { orderBy?: CpFeatureFlagGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CpFeatureFlagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCpFeatureFlagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CpFeatureFlag model
   */
  readonly fields: CpFeatureFlagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CpFeatureFlag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CpFeatureFlagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organization<T extends CpOrganizationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CpOrganizationDefaultArgs<ExtArgs>>): Prisma__CpOrganizationClient<$Result.GetResult<Prisma.$CpOrganizationPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the CpFeatureFlag model
   */ 
  interface CpFeatureFlagFieldRefs {
    readonly orgId: FieldRef<"CpFeatureFlag", 'String'>
    readonly featureKey: FieldRef<"CpFeatureFlag", 'String'>
    readonly isEnabled: FieldRef<"CpFeatureFlag", 'Boolean'>
    readonly configuredAt: FieldRef<"CpFeatureFlag", 'DateTime'>
    readonly configuredBy: FieldRef<"CpFeatureFlag", 'String'>
  }
    

  // Custom InputTypes
  /**
   * CpFeatureFlag findUnique
   */
  export type CpFeatureFlagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpFeatureFlag
     */
    select?: CpFeatureFlagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpFeatureFlagInclude<ExtArgs> | null
    /**
     * Filter, which CpFeatureFlag to fetch.
     */
    where: CpFeatureFlagWhereUniqueInput
  }

  /**
   * CpFeatureFlag findUniqueOrThrow
   */
  export type CpFeatureFlagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpFeatureFlag
     */
    select?: CpFeatureFlagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpFeatureFlagInclude<ExtArgs> | null
    /**
     * Filter, which CpFeatureFlag to fetch.
     */
    where: CpFeatureFlagWhereUniqueInput
  }

  /**
   * CpFeatureFlag findFirst
   */
  export type CpFeatureFlagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpFeatureFlag
     */
    select?: CpFeatureFlagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpFeatureFlagInclude<ExtArgs> | null
    /**
     * Filter, which CpFeatureFlag to fetch.
     */
    where?: CpFeatureFlagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CpFeatureFlags to fetch.
     */
    orderBy?: CpFeatureFlagOrderByWithRelationInput | CpFeatureFlagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CpFeatureFlags.
     */
    cursor?: CpFeatureFlagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CpFeatureFlags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CpFeatureFlags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CpFeatureFlags.
     */
    distinct?: CpFeatureFlagScalarFieldEnum | CpFeatureFlagScalarFieldEnum[]
  }

  /**
   * CpFeatureFlag findFirstOrThrow
   */
  export type CpFeatureFlagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpFeatureFlag
     */
    select?: CpFeatureFlagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpFeatureFlagInclude<ExtArgs> | null
    /**
     * Filter, which CpFeatureFlag to fetch.
     */
    where?: CpFeatureFlagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CpFeatureFlags to fetch.
     */
    orderBy?: CpFeatureFlagOrderByWithRelationInput | CpFeatureFlagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CpFeatureFlags.
     */
    cursor?: CpFeatureFlagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CpFeatureFlags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CpFeatureFlags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CpFeatureFlags.
     */
    distinct?: CpFeatureFlagScalarFieldEnum | CpFeatureFlagScalarFieldEnum[]
  }

  /**
   * CpFeatureFlag findMany
   */
  export type CpFeatureFlagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpFeatureFlag
     */
    select?: CpFeatureFlagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpFeatureFlagInclude<ExtArgs> | null
    /**
     * Filter, which CpFeatureFlags to fetch.
     */
    where?: CpFeatureFlagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CpFeatureFlags to fetch.
     */
    orderBy?: CpFeatureFlagOrderByWithRelationInput | CpFeatureFlagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CpFeatureFlags.
     */
    cursor?: CpFeatureFlagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CpFeatureFlags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CpFeatureFlags.
     */
    skip?: number
    distinct?: CpFeatureFlagScalarFieldEnum | CpFeatureFlagScalarFieldEnum[]
  }

  /**
   * CpFeatureFlag create
   */
  export type CpFeatureFlagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpFeatureFlag
     */
    select?: CpFeatureFlagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpFeatureFlagInclude<ExtArgs> | null
    /**
     * The data needed to create a CpFeatureFlag.
     */
    data: XOR<CpFeatureFlagCreateInput, CpFeatureFlagUncheckedCreateInput>
  }

  /**
   * CpFeatureFlag createMany
   */
  export type CpFeatureFlagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CpFeatureFlags.
     */
    data: CpFeatureFlagCreateManyInput | CpFeatureFlagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CpFeatureFlag createManyAndReturn
   */
  export type CpFeatureFlagCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpFeatureFlag
     */
    select?: CpFeatureFlagSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many CpFeatureFlags.
     */
    data: CpFeatureFlagCreateManyInput | CpFeatureFlagCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpFeatureFlagIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CpFeatureFlag update
   */
  export type CpFeatureFlagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpFeatureFlag
     */
    select?: CpFeatureFlagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpFeatureFlagInclude<ExtArgs> | null
    /**
     * The data needed to update a CpFeatureFlag.
     */
    data: XOR<CpFeatureFlagUpdateInput, CpFeatureFlagUncheckedUpdateInput>
    /**
     * Choose, which CpFeatureFlag to update.
     */
    where: CpFeatureFlagWhereUniqueInput
  }

  /**
   * CpFeatureFlag updateMany
   */
  export type CpFeatureFlagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CpFeatureFlags.
     */
    data: XOR<CpFeatureFlagUpdateManyMutationInput, CpFeatureFlagUncheckedUpdateManyInput>
    /**
     * Filter which CpFeatureFlags to update
     */
    where?: CpFeatureFlagWhereInput
  }

  /**
   * CpFeatureFlag upsert
   */
  export type CpFeatureFlagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpFeatureFlag
     */
    select?: CpFeatureFlagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpFeatureFlagInclude<ExtArgs> | null
    /**
     * The filter to search for the CpFeatureFlag to update in case it exists.
     */
    where: CpFeatureFlagWhereUniqueInput
    /**
     * In case the CpFeatureFlag found by the `where` argument doesn't exist, create a new CpFeatureFlag with this data.
     */
    create: XOR<CpFeatureFlagCreateInput, CpFeatureFlagUncheckedCreateInput>
    /**
     * In case the CpFeatureFlag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CpFeatureFlagUpdateInput, CpFeatureFlagUncheckedUpdateInput>
  }

  /**
   * CpFeatureFlag delete
   */
  export type CpFeatureFlagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpFeatureFlag
     */
    select?: CpFeatureFlagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpFeatureFlagInclude<ExtArgs> | null
    /**
     * Filter which CpFeatureFlag to delete.
     */
    where: CpFeatureFlagWhereUniqueInput
  }

  /**
   * CpFeatureFlag deleteMany
   */
  export type CpFeatureFlagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CpFeatureFlags to delete
     */
    where?: CpFeatureFlagWhereInput
  }

  /**
   * CpFeatureFlag without action
   */
  export type CpFeatureFlagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpFeatureFlag
     */
    select?: CpFeatureFlagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpFeatureFlagInclude<ExtArgs> | null
  }


  /**
   * Model CpUsageMetric
   */

  export type AggregateCpUsageMetric = {
    _count: CpUsageMetricCountAggregateOutputType | null
    _avg: CpUsageMetricAvgAggregateOutputType | null
    _sum: CpUsageMetricSumAggregateOutputType | null
    _min: CpUsageMetricMinAggregateOutputType | null
    _max: CpUsageMetricMaxAggregateOutputType | null
  }

  export type CpUsageMetricAvgAggregateOutputType = {
    activeStaffCount: number | null
    patientRecordsCount: number | null
    storageBytesUsed: number | null
    smsSentThisMonth: number | null
    apiRequestsCount: number | null
  }

  export type CpUsageMetricSumAggregateOutputType = {
    activeStaffCount: number | null
    patientRecordsCount: number | null
    storageBytesUsed: bigint | null
    smsSentThisMonth: number | null
    apiRequestsCount: number | null
  }

  export type CpUsageMetricMinAggregateOutputType = {
    id: string | null
    orgId: string | null
    recordedAt: Date | null
    activeStaffCount: number | null
    patientRecordsCount: number | null
    storageBytesUsed: bigint | null
    smsSentThisMonth: number | null
    apiRequestsCount: number | null
  }

  export type CpUsageMetricMaxAggregateOutputType = {
    id: string | null
    orgId: string | null
    recordedAt: Date | null
    activeStaffCount: number | null
    patientRecordsCount: number | null
    storageBytesUsed: bigint | null
    smsSentThisMonth: number | null
    apiRequestsCount: number | null
  }

  export type CpUsageMetricCountAggregateOutputType = {
    id: number
    orgId: number
    recordedAt: number
    activeStaffCount: number
    patientRecordsCount: number
    storageBytesUsed: number
    smsSentThisMonth: number
    apiRequestsCount: number
    _all: number
  }


  export type CpUsageMetricAvgAggregateInputType = {
    activeStaffCount?: true
    patientRecordsCount?: true
    storageBytesUsed?: true
    smsSentThisMonth?: true
    apiRequestsCount?: true
  }

  export type CpUsageMetricSumAggregateInputType = {
    activeStaffCount?: true
    patientRecordsCount?: true
    storageBytesUsed?: true
    smsSentThisMonth?: true
    apiRequestsCount?: true
  }

  export type CpUsageMetricMinAggregateInputType = {
    id?: true
    orgId?: true
    recordedAt?: true
    activeStaffCount?: true
    patientRecordsCount?: true
    storageBytesUsed?: true
    smsSentThisMonth?: true
    apiRequestsCount?: true
  }

  export type CpUsageMetricMaxAggregateInputType = {
    id?: true
    orgId?: true
    recordedAt?: true
    activeStaffCount?: true
    patientRecordsCount?: true
    storageBytesUsed?: true
    smsSentThisMonth?: true
    apiRequestsCount?: true
  }

  export type CpUsageMetricCountAggregateInputType = {
    id?: true
    orgId?: true
    recordedAt?: true
    activeStaffCount?: true
    patientRecordsCount?: true
    storageBytesUsed?: true
    smsSentThisMonth?: true
    apiRequestsCount?: true
    _all?: true
  }

  export type CpUsageMetricAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CpUsageMetric to aggregate.
     */
    where?: CpUsageMetricWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CpUsageMetrics to fetch.
     */
    orderBy?: CpUsageMetricOrderByWithRelationInput | CpUsageMetricOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CpUsageMetricWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CpUsageMetrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CpUsageMetrics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CpUsageMetrics
    **/
    _count?: true | CpUsageMetricCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CpUsageMetricAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CpUsageMetricSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CpUsageMetricMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CpUsageMetricMaxAggregateInputType
  }

  export type GetCpUsageMetricAggregateType<T extends CpUsageMetricAggregateArgs> = {
        [P in keyof T & keyof AggregateCpUsageMetric]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCpUsageMetric[P]>
      : GetScalarType<T[P], AggregateCpUsageMetric[P]>
  }




  export type CpUsageMetricGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CpUsageMetricWhereInput
    orderBy?: CpUsageMetricOrderByWithAggregationInput | CpUsageMetricOrderByWithAggregationInput[]
    by: CpUsageMetricScalarFieldEnum[] | CpUsageMetricScalarFieldEnum
    having?: CpUsageMetricScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CpUsageMetricCountAggregateInputType | true
    _avg?: CpUsageMetricAvgAggregateInputType
    _sum?: CpUsageMetricSumAggregateInputType
    _min?: CpUsageMetricMinAggregateInputType
    _max?: CpUsageMetricMaxAggregateInputType
  }

  export type CpUsageMetricGroupByOutputType = {
    id: string
    orgId: string
    recordedAt: Date
    activeStaffCount: number
    patientRecordsCount: number
    storageBytesUsed: bigint
    smsSentThisMonth: number
    apiRequestsCount: number
    _count: CpUsageMetricCountAggregateOutputType | null
    _avg: CpUsageMetricAvgAggregateOutputType | null
    _sum: CpUsageMetricSumAggregateOutputType | null
    _min: CpUsageMetricMinAggregateOutputType | null
    _max: CpUsageMetricMaxAggregateOutputType | null
  }

  type GetCpUsageMetricGroupByPayload<T extends CpUsageMetricGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CpUsageMetricGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CpUsageMetricGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CpUsageMetricGroupByOutputType[P]>
            : GetScalarType<T[P], CpUsageMetricGroupByOutputType[P]>
        }
      >
    >


  export type CpUsageMetricSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    recordedAt?: boolean
    activeStaffCount?: boolean
    patientRecordsCount?: boolean
    storageBytesUsed?: boolean
    smsSentThisMonth?: boolean
    apiRequestsCount?: boolean
    organization?: boolean | CpOrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cpUsageMetric"]>

  export type CpUsageMetricSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    recordedAt?: boolean
    activeStaffCount?: boolean
    patientRecordsCount?: boolean
    storageBytesUsed?: boolean
    smsSentThisMonth?: boolean
    apiRequestsCount?: boolean
    organization?: boolean | CpOrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cpUsageMetric"]>

  export type CpUsageMetricSelectScalar = {
    id?: boolean
    orgId?: boolean
    recordedAt?: boolean
    activeStaffCount?: boolean
    patientRecordsCount?: boolean
    storageBytesUsed?: boolean
    smsSentThisMonth?: boolean
    apiRequestsCount?: boolean
  }

  export type CpUsageMetricInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | CpOrganizationDefaultArgs<ExtArgs>
  }
  export type CpUsageMetricIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | CpOrganizationDefaultArgs<ExtArgs>
  }

  export type $CpUsageMetricPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CpUsageMetric"
    objects: {
      organization: Prisma.$CpOrganizationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orgId: string
      recordedAt: Date
      activeStaffCount: number
      patientRecordsCount: number
      storageBytesUsed: bigint
      smsSentThisMonth: number
      apiRequestsCount: number
    }, ExtArgs["result"]["cpUsageMetric"]>
    composites: {}
  }

  type CpUsageMetricGetPayload<S extends boolean | null | undefined | CpUsageMetricDefaultArgs> = $Result.GetResult<Prisma.$CpUsageMetricPayload, S>

  type CpUsageMetricCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CpUsageMetricFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CpUsageMetricCountAggregateInputType | true
    }

  export interface CpUsageMetricDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CpUsageMetric'], meta: { name: 'CpUsageMetric' } }
    /**
     * Find zero or one CpUsageMetric that matches the filter.
     * @param {CpUsageMetricFindUniqueArgs} args - Arguments to find a CpUsageMetric
     * @example
     * // Get one CpUsageMetric
     * const cpUsageMetric = await prisma.cpUsageMetric.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CpUsageMetricFindUniqueArgs>(args: SelectSubset<T, CpUsageMetricFindUniqueArgs<ExtArgs>>): Prisma__CpUsageMetricClient<$Result.GetResult<Prisma.$CpUsageMetricPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CpUsageMetric that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CpUsageMetricFindUniqueOrThrowArgs} args - Arguments to find a CpUsageMetric
     * @example
     * // Get one CpUsageMetric
     * const cpUsageMetric = await prisma.cpUsageMetric.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CpUsageMetricFindUniqueOrThrowArgs>(args: SelectSubset<T, CpUsageMetricFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CpUsageMetricClient<$Result.GetResult<Prisma.$CpUsageMetricPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CpUsageMetric that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpUsageMetricFindFirstArgs} args - Arguments to find a CpUsageMetric
     * @example
     * // Get one CpUsageMetric
     * const cpUsageMetric = await prisma.cpUsageMetric.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CpUsageMetricFindFirstArgs>(args?: SelectSubset<T, CpUsageMetricFindFirstArgs<ExtArgs>>): Prisma__CpUsageMetricClient<$Result.GetResult<Prisma.$CpUsageMetricPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CpUsageMetric that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpUsageMetricFindFirstOrThrowArgs} args - Arguments to find a CpUsageMetric
     * @example
     * // Get one CpUsageMetric
     * const cpUsageMetric = await prisma.cpUsageMetric.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CpUsageMetricFindFirstOrThrowArgs>(args?: SelectSubset<T, CpUsageMetricFindFirstOrThrowArgs<ExtArgs>>): Prisma__CpUsageMetricClient<$Result.GetResult<Prisma.$CpUsageMetricPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CpUsageMetrics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpUsageMetricFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CpUsageMetrics
     * const cpUsageMetrics = await prisma.cpUsageMetric.findMany()
     * 
     * // Get first 10 CpUsageMetrics
     * const cpUsageMetrics = await prisma.cpUsageMetric.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cpUsageMetricWithIdOnly = await prisma.cpUsageMetric.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CpUsageMetricFindManyArgs>(args?: SelectSubset<T, CpUsageMetricFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CpUsageMetricPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CpUsageMetric.
     * @param {CpUsageMetricCreateArgs} args - Arguments to create a CpUsageMetric.
     * @example
     * // Create one CpUsageMetric
     * const CpUsageMetric = await prisma.cpUsageMetric.create({
     *   data: {
     *     // ... data to create a CpUsageMetric
     *   }
     * })
     * 
     */
    create<T extends CpUsageMetricCreateArgs>(args: SelectSubset<T, CpUsageMetricCreateArgs<ExtArgs>>): Prisma__CpUsageMetricClient<$Result.GetResult<Prisma.$CpUsageMetricPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CpUsageMetrics.
     * @param {CpUsageMetricCreateManyArgs} args - Arguments to create many CpUsageMetrics.
     * @example
     * // Create many CpUsageMetrics
     * const cpUsageMetric = await prisma.cpUsageMetric.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CpUsageMetricCreateManyArgs>(args?: SelectSubset<T, CpUsageMetricCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CpUsageMetrics and returns the data saved in the database.
     * @param {CpUsageMetricCreateManyAndReturnArgs} args - Arguments to create many CpUsageMetrics.
     * @example
     * // Create many CpUsageMetrics
     * const cpUsageMetric = await prisma.cpUsageMetric.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CpUsageMetrics and only return the `id`
     * const cpUsageMetricWithIdOnly = await prisma.cpUsageMetric.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CpUsageMetricCreateManyAndReturnArgs>(args?: SelectSubset<T, CpUsageMetricCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CpUsageMetricPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a CpUsageMetric.
     * @param {CpUsageMetricDeleteArgs} args - Arguments to delete one CpUsageMetric.
     * @example
     * // Delete one CpUsageMetric
     * const CpUsageMetric = await prisma.cpUsageMetric.delete({
     *   where: {
     *     // ... filter to delete one CpUsageMetric
     *   }
     * })
     * 
     */
    delete<T extends CpUsageMetricDeleteArgs>(args: SelectSubset<T, CpUsageMetricDeleteArgs<ExtArgs>>): Prisma__CpUsageMetricClient<$Result.GetResult<Prisma.$CpUsageMetricPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CpUsageMetric.
     * @param {CpUsageMetricUpdateArgs} args - Arguments to update one CpUsageMetric.
     * @example
     * // Update one CpUsageMetric
     * const cpUsageMetric = await prisma.cpUsageMetric.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CpUsageMetricUpdateArgs>(args: SelectSubset<T, CpUsageMetricUpdateArgs<ExtArgs>>): Prisma__CpUsageMetricClient<$Result.GetResult<Prisma.$CpUsageMetricPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CpUsageMetrics.
     * @param {CpUsageMetricDeleteManyArgs} args - Arguments to filter CpUsageMetrics to delete.
     * @example
     * // Delete a few CpUsageMetrics
     * const { count } = await prisma.cpUsageMetric.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CpUsageMetricDeleteManyArgs>(args?: SelectSubset<T, CpUsageMetricDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CpUsageMetrics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpUsageMetricUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CpUsageMetrics
     * const cpUsageMetric = await prisma.cpUsageMetric.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CpUsageMetricUpdateManyArgs>(args: SelectSubset<T, CpUsageMetricUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CpUsageMetric.
     * @param {CpUsageMetricUpsertArgs} args - Arguments to update or create a CpUsageMetric.
     * @example
     * // Update or create a CpUsageMetric
     * const cpUsageMetric = await prisma.cpUsageMetric.upsert({
     *   create: {
     *     // ... data to create a CpUsageMetric
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CpUsageMetric we want to update
     *   }
     * })
     */
    upsert<T extends CpUsageMetricUpsertArgs>(args: SelectSubset<T, CpUsageMetricUpsertArgs<ExtArgs>>): Prisma__CpUsageMetricClient<$Result.GetResult<Prisma.$CpUsageMetricPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CpUsageMetrics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpUsageMetricCountArgs} args - Arguments to filter CpUsageMetrics to count.
     * @example
     * // Count the number of CpUsageMetrics
     * const count = await prisma.cpUsageMetric.count({
     *   where: {
     *     // ... the filter for the CpUsageMetrics we want to count
     *   }
     * })
    **/
    count<T extends CpUsageMetricCountArgs>(
      args?: Subset<T, CpUsageMetricCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CpUsageMetricCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CpUsageMetric.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpUsageMetricAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CpUsageMetricAggregateArgs>(args: Subset<T, CpUsageMetricAggregateArgs>): Prisma.PrismaPromise<GetCpUsageMetricAggregateType<T>>

    /**
     * Group by CpUsageMetric.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpUsageMetricGroupByArgs} args - Group by arguments.
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
      T extends CpUsageMetricGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CpUsageMetricGroupByArgs['orderBy'] }
        : { orderBy?: CpUsageMetricGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CpUsageMetricGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCpUsageMetricGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CpUsageMetric model
   */
  readonly fields: CpUsageMetricFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CpUsageMetric.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CpUsageMetricClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organization<T extends CpOrganizationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CpOrganizationDefaultArgs<ExtArgs>>): Prisma__CpOrganizationClient<$Result.GetResult<Prisma.$CpOrganizationPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the CpUsageMetric model
   */ 
  interface CpUsageMetricFieldRefs {
    readonly id: FieldRef<"CpUsageMetric", 'String'>
    readonly orgId: FieldRef<"CpUsageMetric", 'String'>
    readonly recordedAt: FieldRef<"CpUsageMetric", 'DateTime'>
    readonly activeStaffCount: FieldRef<"CpUsageMetric", 'Int'>
    readonly patientRecordsCount: FieldRef<"CpUsageMetric", 'Int'>
    readonly storageBytesUsed: FieldRef<"CpUsageMetric", 'BigInt'>
    readonly smsSentThisMonth: FieldRef<"CpUsageMetric", 'Int'>
    readonly apiRequestsCount: FieldRef<"CpUsageMetric", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * CpUsageMetric findUnique
   */
  export type CpUsageMetricFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpUsageMetric
     */
    select?: CpUsageMetricSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpUsageMetricInclude<ExtArgs> | null
    /**
     * Filter, which CpUsageMetric to fetch.
     */
    where: CpUsageMetricWhereUniqueInput
  }

  /**
   * CpUsageMetric findUniqueOrThrow
   */
  export type CpUsageMetricFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpUsageMetric
     */
    select?: CpUsageMetricSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpUsageMetricInclude<ExtArgs> | null
    /**
     * Filter, which CpUsageMetric to fetch.
     */
    where: CpUsageMetricWhereUniqueInput
  }

  /**
   * CpUsageMetric findFirst
   */
  export type CpUsageMetricFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpUsageMetric
     */
    select?: CpUsageMetricSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpUsageMetricInclude<ExtArgs> | null
    /**
     * Filter, which CpUsageMetric to fetch.
     */
    where?: CpUsageMetricWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CpUsageMetrics to fetch.
     */
    orderBy?: CpUsageMetricOrderByWithRelationInput | CpUsageMetricOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CpUsageMetrics.
     */
    cursor?: CpUsageMetricWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CpUsageMetrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CpUsageMetrics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CpUsageMetrics.
     */
    distinct?: CpUsageMetricScalarFieldEnum | CpUsageMetricScalarFieldEnum[]
  }

  /**
   * CpUsageMetric findFirstOrThrow
   */
  export type CpUsageMetricFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpUsageMetric
     */
    select?: CpUsageMetricSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpUsageMetricInclude<ExtArgs> | null
    /**
     * Filter, which CpUsageMetric to fetch.
     */
    where?: CpUsageMetricWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CpUsageMetrics to fetch.
     */
    orderBy?: CpUsageMetricOrderByWithRelationInput | CpUsageMetricOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CpUsageMetrics.
     */
    cursor?: CpUsageMetricWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CpUsageMetrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CpUsageMetrics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CpUsageMetrics.
     */
    distinct?: CpUsageMetricScalarFieldEnum | CpUsageMetricScalarFieldEnum[]
  }

  /**
   * CpUsageMetric findMany
   */
  export type CpUsageMetricFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpUsageMetric
     */
    select?: CpUsageMetricSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpUsageMetricInclude<ExtArgs> | null
    /**
     * Filter, which CpUsageMetrics to fetch.
     */
    where?: CpUsageMetricWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CpUsageMetrics to fetch.
     */
    orderBy?: CpUsageMetricOrderByWithRelationInput | CpUsageMetricOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CpUsageMetrics.
     */
    cursor?: CpUsageMetricWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CpUsageMetrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CpUsageMetrics.
     */
    skip?: number
    distinct?: CpUsageMetricScalarFieldEnum | CpUsageMetricScalarFieldEnum[]
  }

  /**
   * CpUsageMetric create
   */
  export type CpUsageMetricCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpUsageMetric
     */
    select?: CpUsageMetricSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpUsageMetricInclude<ExtArgs> | null
    /**
     * The data needed to create a CpUsageMetric.
     */
    data: XOR<CpUsageMetricCreateInput, CpUsageMetricUncheckedCreateInput>
  }

  /**
   * CpUsageMetric createMany
   */
  export type CpUsageMetricCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CpUsageMetrics.
     */
    data: CpUsageMetricCreateManyInput | CpUsageMetricCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CpUsageMetric createManyAndReturn
   */
  export type CpUsageMetricCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpUsageMetric
     */
    select?: CpUsageMetricSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many CpUsageMetrics.
     */
    data: CpUsageMetricCreateManyInput | CpUsageMetricCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpUsageMetricIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CpUsageMetric update
   */
  export type CpUsageMetricUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpUsageMetric
     */
    select?: CpUsageMetricSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpUsageMetricInclude<ExtArgs> | null
    /**
     * The data needed to update a CpUsageMetric.
     */
    data: XOR<CpUsageMetricUpdateInput, CpUsageMetricUncheckedUpdateInput>
    /**
     * Choose, which CpUsageMetric to update.
     */
    where: CpUsageMetricWhereUniqueInput
  }

  /**
   * CpUsageMetric updateMany
   */
  export type CpUsageMetricUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CpUsageMetrics.
     */
    data: XOR<CpUsageMetricUpdateManyMutationInput, CpUsageMetricUncheckedUpdateManyInput>
    /**
     * Filter which CpUsageMetrics to update
     */
    where?: CpUsageMetricWhereInput
  }

  /**
   * CpUsageMetric upsert
   */
  export type CpUsageMetricUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpUsageMetric
     */
    select?: CpUsageMetricSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpUsageMetricInclude<ExtArgs> | null
    /**
     * The filter to search for the CpUsageMetric to update in case it exists.
     */
    where: CpUsageMetricWhereUniqueInput
    /**
     * In case the CpUsageMetric found by the `where` argument doesn't exist, create a new CpUsageMetric with this data.
     */
    create: XOR<CpUsageMetricCreateInput, CpUsageMetricUncheckedCreateInput>
    /**
     * In case the CpUsageMetric was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CpUsageMetricUpdateInput, CpUsageMetricUncheckedUpdateInput>
  }

  /**
   * CpUsageMetric delete
   */
  export type CpUsageMetricDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpUsageMetric
     */
    select?: CpUsageMetricSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpUsageMetricInclude<ExtArgs> | null
    /**
     * Filter which CpUsageMetric to delete.
     */
    where: CpUsageMetricWhereUniqueInput
  }

  /**
   * CpUsageMetric deleteMany
   */
  export type CpUsageMetricDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CpUsageMetrics to delete
     */
    where?: CpUsageMetricWhereInput
  }

  /**
   * CpUsageMetric without action
   */
  export type CpUsageMetricDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpUsageMetric
     */
    select?: CpUsageMetricSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpUsageMetricInclude<ExtArgs> | null
  }


  /**
   * Model CpPluginDirectory
   */

  export type AggregateCpPluginDirectory = {
    _count: CpPluginDirectoryCountAggregateOutputType | null
    _min: CpPluginDirectoryMinAggregateOutputType | null
    _max: CpPluginDirectoryMaxAggregateOutputType | null
  }

  export type CpPluginDirectoryMinAggregateOutputType = {
    id: string | null
    pluginId: string | null
    name: string | null
    description: string | null
    version: string | null
    isPublished: boolean | null
    publishedAt: Date | null
    createdAt: Date | null
  }

  export type CpPluginDirectoryMaxAggregateOutputType = {
    id: string | null
    pluginId: string | null
    name: string | null
    description: string | null
    version: string | null
    isPublished: boolean | null
    publishedAt: Date | null
    createdAt: Date | null
  }

  export type CpPluginDirectoryCountAggregateOutputType = {
    id: number
    pluginId: number
    name: number
    description: number
    version: number
    isPublished: number
    publishedAt: number
    createdAt: number
    _all: number
  }


  export type CpPluginDirectoryMinAggregateInputType = {
    id?: true
    pluginId?: true
    name?: true
    description?: true
    version?: true
    isPublished?: true
    publishedAt?: true
    createdAt?: true
  }

  export type CpPluginDirectoryMaxAggregateInputType = {
    id?: true
    pluginId?: true
    name?: true
    description?: true
    version?: true
    isPublished?: true
    publishedAt?: true
    createdAt?: true
  }

  export type CpPluginDirectoryCountAggregateInputType = {
    id?: true
    pluginId?: true
    name?: true
    description?: true
    version?: true
    isPublished?: true
    publishedAt?: true
    createdAt?: true
    _all?: true
  }

  export type CpPluginDirectoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CpPluginDirectory to aggregate.
     */
    where?: CpPluginDirectoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CpPluginDirectories to fetch.
     */
    orderBy?: CpPluginDirectoryOrderByWithRelationInput | CpPluginDirectoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CpPluginDirectoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CpPluginDirectories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CpPluginDirectories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CpPluginDirectories
    **/
    _count?: true | CpPluginDirectoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CpPluginDirectoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CpPluginDirectoryMaxAggregateInputType
  }

  export type GetCpPluginDirectoryAggregateType<T extends CpPluginDirectoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCpPluginDirectory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCpPluginDirectory[P]>
      : GetScalarType<T[P], AggregateCpPluginDirectory[P]>
  }




  export type CpPluginDirectoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CpPluginDirectoryWhereInput
    orderBy?: CpPluginDirectoryOrderByWithAggregationInput | CpPluginDirectoryOrderByWithAggregationInput[]
    by: CpPluginDirectoryScalarFieldEnum[] | CpPluginDirectoryScalarFieldEnum
    having?: CpPluginDirectoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CpPluginDirectoryCountAggregateInputType | true
    _min?: CpPluginDirectoryMinAggregateInputType
    _max?: CpPluginDirectoryMaxAggregateInputType
  }

  export type CpPluginDirectoryGroupByOutputType = {
    id: string
    pluginId: string
    name: string
    description: string | null
    version: string
    isPublished: boolean
    publishedAt: Date | null
    createdAt: Date
    _count: CpPluginDirectoryCountAggregateOutputType | null
    _min: CpPluginDirectoryMinAggregateOutputType | null
    _max: CpPluginDirectoryMaxAggregateOutputType | null
  }

  type GetCpPluginDirectoryGroupByPayload<T extends CpPluginDirectoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CpPluginDirectoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CpPluginDirectoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CpPluginDirectoryGroupByOutputType[P]>
            : GetScalarType<T[P], CpPluginDirectoryGroupByOutputType[P]>
        }
      >
    >


  export type CpPluginDirectorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pluginId?: boolean
    name?: boolean
    description?: boolean
    version?: boolean
    isPublished?: boolean
    publishedAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["cpPluginDirectory"]>

  export type CpPluginDirectorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pluginId?: boolean
    name?: boolean
    description?: boolean
    version?: boolean
    isPublished?: boolean
    publishedAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["cpPluginDirectory"]>

  export type CpPluginDirectorySelectScalar = {
    id?: boolean
    pluginId?: boolean
    name?: boolean
    description?: boolean
    version?: boolean
    isPublished?: boolean
    publishedAt?: boolean
    createdAt?: boolean
  }


  export type $CpPluginDirectoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CpPluginDirectory"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      pluginId: string
      name: string
      description: string | null
      version: string
      isPublished: boolean
      publishedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["cpPluginDirectory"]>
    composites: {}
  }

  type CpPluginDirectoryGetPayload<S extends boolean | null | undefined | CpPluginDirectoryDefaultArgs> = $Result.GetResult<Prisma.$CpPluginDirectoryPayload, S>

  type CpPluginDirectoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CpPluginDirectoryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CpPluginDirectoryCountAggregateInputType | true
    }

  export interface CpPluginDirectoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CpPluginDirectory'], meta: { name: 'CpPluginDirectory' } }
    /**
     * Find zero or one CpPluginDirectory that matches the filter.
     * @param {CpPluginDirectoryFindUniqueArgs} args - Arguments to find a CpPluginDirectory
     * @example
     * // Get one CpPluginDirectory
     * const cpPluginDirectory = await prisma.cpPluginDirectory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CpPluginDirectoryFindUniqueArgs>(args: SelectSubset<T, CpPluginDirectoryFindUniqueArgs<ExtArgs>>): Prisma__CpPluginDirectoryClient<$Result.GetResult<Prisma.$CpPluginDirectoryPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CpPluginDirectory that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CpPluginDirectoryFindUniqueOrThrowArgs} args - Arguments to find a CpPluginDirectory
     * @example
     * // Get one CpPluginDirectory
     * const cpPluginDirectory = await prisma.cpPluginDirectory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CpPluginDirectoryFindUniqueOrThrowArgs>(args: SelectSubset<T, CpPluginDirectoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CpPluginDirectoryClient<$Result.GetResult<Prisma.$CpPluginDirectoryPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CpPluginDirectory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpPluginDirectoryFindFirstArgs} args - Arguments to find a CpPluginDirectory
     * @example
     * // Get one CpPluginDirectory
     * const cpPluginDirectory = await prisma.cpPluginDirectory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CpPluginDirectoryFindFirstArgs>(args?: SelectSubset<T, CpPluginDirectoryFindFirstArgs<ExtArgs>>): Prisma__CpPluginDirectoryClient<$Result.GetResult<Prisma.$CpPluginDirectoryPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CpPluginDirectory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpPluginDirectoryFindFirstOrThrowArgs} args - Arguments to find a CpPluginDirectory
     * @example
     * // Get one CpPluginDirectory
     * const cpPluginDirectory = await prisma.cpPluginDirectory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CpPluginDirectoryFindFirstOrThrowArgs>(args?: SelectSubset<T, CpPluginDirectoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CpPluginDirectoryClient<$Result.GetResult<Prisma.$CpPluginDirectoryPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CpPluginDirectories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpPluginDirectoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CpPluginDirectories
     * const cpPluginDirectories = await prisma.cpPluginDirectory.findMany()
     * 
     * // Get first 10 CpPluginDirectories
     * const cpPluginDirectories = await prisma.cpPluginDirectory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cpPluginDirectoryWithIdOnly = await prisma.cpPluginDirectory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CpPluginDirectoryFindManyArgs>(args?: SelectSubset<T, CpPluginDirectoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CpPluginDirectoryPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CpPluginDirectory.
     * @param {CpPluginDirectoryCreateArgs} args - Arguments to create a CpPluginDirectory.
     * @example
     * // Create one CpPluginDirectory
     * const CpPluginDirectory = await prisma.cpPluginDirectory.create({
     *   data: {
     *     // ... data to create a CpPluginDirectory
     *   }
     * })
     * 
     */
    create<T extends CpPluginDirectoryCreateArgs>(args: SelectSubset<T, CpPluginDirectoryCreateArgs<ExtArgs>>): Prisma__CpPluginDirectoryClient<$Result.GetResult<Prisma.$CpPluginDirectoryPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CpPluginDirectories.
     * @param {CpPluginDirectoryCreateManyArgs} args - Arguments to create many CpPluginDirectories.
     * @example
     * // Create many CpPluginDirectories
     * const cpPluginDirectory = await prisma.cpPluginDirectory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CpPluginDirectoryCreateManyArgs>(args?: SelectSubset<T, CpPluginDirectoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CpPluginDirectories and returns the data saved in the database.
     * @param {CpPluginDirectoryCreateManyAndReturnArgs} args - Arguments to create many CpPluginDirectories.
     * @example
     * // Create many CpPluginDirectories
     * const cpPluginDirectory = await prisma.cpPluginDirectory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CpPluginDirectories and only return the `id`
     * const cpPluginDirectoryWithIdOnly = await prisma.cpPluginDirectory.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CpPluginDirectoryCreateManyAndReturnArgs>(args?: SelectSubset<T, CpPluginDirectoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CpPluginDirectoryPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a CpPluginDirectory.
     * @param {CpPluginDirectoryDeleteArgs} args - Arguments to delete one CpPluginDirectory.
     * @example
     * // Delete one CpPluginDirectory
     * const CpPluginDirectory = await prisma.cpPluginDirectory.delete({
     *   where: {
     *     // ... filter to delete one CpPluginDirectory
     *   }
     * })
     * 
     */
    delete<T extends CpPluginDirectoryDeleteArgs>(args: SelectSubset<T, CpPluginDirectoryDeleteArgs<ExtArgs>>): Prisma__CpPluginDirectoryClient<$Result.GetResult<Prisma.$CpPluginDirectoryPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CpPluginDirectory.
     * @param {CpPluginDirectoryUpdateArgs} args - Arguments to update one CpPluginDirectory.
     * @example
     * // Update one CpPluginDirectory
     * const cpPluginDirectory = await prisma.cpPluginDirectory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CpPluginDirectoryUpdateArgs>(args: SelectSubset<T, CpPluginDirectoryUpdateArgs<ExtArgs>>): Prisma__CpPluginDirectoryClient<$Result.GetResult<Prisma.$CpPluginDirectoryPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CpPluginDirectories.
     * @param {CpPluginDirectoryDeleteManyArgs} args - Arguments to filter CpPluginDirectories to delete.
     * @example
     * // Delete a few CpPluginDirectories
     * const { count } = await prisma.cpPluginDirectory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CpPluginDirectoryDeleteManyArgs>(args?: SelectSubset<T, CpPluginDirectoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CpPluginDirectories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpPluginDirectoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CpPluginDirectories
     * const cpPluginDirectory = await prisma.cpPluginDirectory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CpPluginDirectoryUpdateManyArgs>(args: SelectSubset<T, CpPluginDirectoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CpPluginDirectory.
     * @param {CpPluginDirectoryUpsertArgs} args - Arguments to update or create a CpPluginDirectory.
     * @example
     * // Update or create a CpPluginDirectory
     * const cpPluginDirectory = await prisma.cpPluginDirectory.upsert({
     *   create: {
     *     // ... data to create a CpPluginDirectory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CpPluginDirectory we want to update
     *   }
     * })
     */
    upsert<T extends CpPluginDirectoryUpsertArgs>(args: SelectSubset<T, CpPluginDirectoryUpsertArgs<ExtArgs>>): Prisma__CpPluginDirectoryClient<$Result.GetResult<Prisma.$CpPluginDirectoryPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CpPluginDirectories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpPluginDirectoryCountArgs} args - Arguments to filter CpPluginDirectories to count.
     * @example
     * // Count the number of CpPluginDirectories
     * const count = await prisma.cpPluginDirectory.count({
     *   where: {
     *     // ... the filter for the CpPluginDirectories we want to count
     *   }
     * })
    **/
    count<T extends CpPluginDirectoryCountArgs>(
      args?: Subset<T, CpPluginDirectoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CpPluginDirectoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CpPluginDirectory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpPluginDirectoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CpPluginDirectoryAggregateArgs>(args: Subset<T, CpPluginDirectoryAggregateArgs>): Prisma.PrismaPromise<GetCpPluginDirectoryAggregateType<T>>

    /**
     * Group by CpPluginDirectory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpPluginDirectoryGroupByArgs} args - Group by arguments.
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
      T extends CpPluginDirectoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CpPluginDirectoryGroupByArgs['orderBy'] }
        : { orderBy?: CpPluginDirectoryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CpPluginDirectoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCpPluginDirectoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CpPluginDirectory model
   */
  readonly fields: CpPluginDirectoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CpPluginDirectory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CpPluginDirectoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the CpPluginDirectory model
   */ 
  interface CpPluginDirectoryFieldRefs {
    readonly id: FieldRef<"CpPluginDirectory", 'String'>
    readonly pluginId: FieldRef<"CpPluginDirectory", 'String'>
    readonly name: FieldRef<"CpPluginDirectory", 'String'>
    readonly description: FieldRef<"CpPluginDirectory", 'String'>
    readonly version: FieldRef<"CpPluginDirectory", 'String'>
    readonly isPublished: FieldRef<"CpPluginDirectory", 'Boolean'>
    readonly publishedAt: FieldRef<"CpPluginDirectory", 'DateTime'>
    readonly createdAt: FieldRef<"CpPluginDirectory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CpPluginDirectory findUnique
   */
  export type CpPluginDirectoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpPluginDirectory
     */
    select?: CpPluginDirectorySelect<ExtArgs> | null
    /**
     * Filter, which CpPluginDirectory to fetch.
     */
    where: CpPluginDirectoryWhereUniqueInput
  }

  /**
   * CpPluginDirectory findUniqueOrThrow
   */
  export type CpPluginDirectoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpPluginDirectory
     */
    select?: CpPluginDirectorySelect<ExtArgs> | null
    /**
     * Filter, which CpPluginDirectory to fetch.
     */
    where: CpPluginDirectoryWhereUniqueInput
  }

  /**
   * CpPluginDirectory findFirst
   */
  export type CpPluginDirectoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpPluginDirectory
     */
    select?: CpPluginDirectorySelect<ExtArgs> | null
    /**
     * Filter, which CpPluginDirectory to fetch.
     */
    where?: CpPluginDirectoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CpPluginDirectories to fetch.
     */
    orderBy?: CpPluginDirectoryOrderByWithRelationInput | CpPluginDirectoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CpPluginDirectories.
     */
    cursor?: CpPluginDirectoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CpPluginDirectories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CpPluginDirectories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CpPluginDirectories.
     */
    distinct?: CpPluginDirectoryScalarFieldEnum | CpPluginDirectoryScalarFieldEnum[]
  }

  /**
   * CpPluginDirectory findFirstOrThrow
   */
  export type CpPluginDirectoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpPluginDirectory
     */
    select?: CpPluginDirectorySelect<ExtArgs> | null
    /**
     * Filter, which CpPluginDirectory to fetch.
     */
    where?: CpPluginDirectoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CpPluginDirectories to fetch.
     */
    orderBy?: CpPluginDirectoryOrderByWithRelationInput | CpPluginDirectoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CpPluginDirectories.
     */
    cursor?: CpPluginDirectoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CpPluginDirectories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CpPluginDirectories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CpPluginDirectories.
     */
    distinct?: CpPluginDirectoryScalarFieldEnum | CpPluginDirectoryScalarFieldEnum[]
  }

  /**
   * CpPluginDirectory findMany
   */
  export type CpPluginDirectoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpPluginDirectory
     */
    select?: CpPluginDirectorySelect<ExtArgs> | null
    /**
     * Filter, which CpPluginDirectories to fetch.
     */
    where?: CpPluginDirectoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CpPluginDirectories to fetch.
     */
    orderBy?: CpPluginDirectoryOrderByWithRelationInput | CpPluginDirectoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CpPluginDirectories.
     */
    cursor?: CpPluginDirectoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CpPluginDirectories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CpPluginDirectories.
     */
    skip?: number
    distinct?: CpPluginDirectoryScalarFieldEnum | CpPluginDirectoryScalarFieldEnum[]
  }

  /**
   * CpPluginDirectory create
   */
  export type CpPluginDirectoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpPluginDirectory
     */
    select?: CpPluginDirectorySelect<ExtArgs> | null
    /**
     * The data needed to create a CpPluginDirectory.
     */
    data: XOR<CpPluginDirectoryCreateInput, CpPluginDirectoryUncheckedCreateInput>
  }

  /**
   * CpPluginDirectory createMany
   */
  export type CpPluginDirectoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CpPluginDirectories.
     */
    data: CpPluginDirectoryCreateManyInput | CpPluginDirectoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CpPluginDirectory createManyAndReturn
   */
  export type CpPluginDirectoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpPluginDirectory
     */
    select?: CpPluginDirectorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many CpPluginDirectories.
     */
    data: CpPluginDirectoryCreateManyInput | CpPluginDirectoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CpPluginDirectory update
   */
  export type CpPluginDirectoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpPluginDirectory
     */
    select?: CpPluginDirectorySelect<ExtArgs> | null
    /**
     * The data needed to update a CpPluginDirectory.
     */
    data: XOR<CpPluginDirectoryUpdateInput, CpPluginDirectoryUncheckedUpdateInput>
    /**
     * Choose, which CpPluginDirectory to update.
     */
    where: CpPluginDirectoryWhereUniqueInput
  }

  /**
   * CpPluginDirectory updateMany
   */
  export type CpPluginDirectoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CpPluginDirectories.
     */
    data: XOR<CpPluginDirectoryUpdateManyMutationInput, CpPluginDirectoryUncheckedUpdateManyInput>
    /**
     * Filter which CpPluginDirectories to update
     */
    where?: CpPluginDirectoryWhereInput
  }

  /**
   * CpPluginDirectory upsert
   */
  export type CpPluginDirectoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpPluginDirectory
     */
    select?: CpPluginDirectorySelect<ExtArgs> | null
    /**
     * The filter to search for the CpPluginDirectory to update in case it exists.
     */
    where: CpPluginDirectoryWhereUniqueInput
    /**
     * In case the CpPluginDirectory found by the `where` argument doesn't exist, create a new CpPluginDirectory with this data.
     */
    create: XOR<CpPluginDirectoryCreateInput, CpPluginDirectoryUncheckedCreateInput>
    /**
     * In case the CpPluginDirectory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CpPluginDirectoryUpdateInput, CpPluginDirectoryUncheckedUpdateInput>
  }

  /**
   * CpPluginDirectory delete
   */
  export type CpPluginDirectoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpPluginDirectory
     */
    select?: CpPluginDirectorySelect<ExtArgs> | null
    /**
     * Filter which CpPluginDirectory to delete.
     */
    where: CpPluginDirectoryWhereUniqueInput
  }

  /**
   * CpPluginDirectory deleteMany
   */
  export type CpPluginDirectoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CpPluginDirectories to delete
     */
    where?: CpPluginDirectoryWhereInput
  }

  /**
   * CpPluginDirectory without action
   */
  export type CpPluginDirectoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpPluginDirectory
     */
    select?: CpPluginDirectorySelect<ExtArgs> | null
  }


  /**
   * Model CpTempAccessGrant
   */

  export type AggregateCpTempAccessGrant = {
    _count: CpTempAccessGrantCountAggregateOutputType | null
    _avg: CpTempAccessGrantAvgAggregateOutputType | null
    _sum: CpTempAccessGrantSumAggregateOutputType | null
    _min: CpTempAccessGrantMinAggregateOutputType | null
    _max: CpTempAccessGrantMaxAggregateOutputType | null
  }

  export type CpTempAccessGrantAvgAggregateOutputType = {
    durationHours: number | null
  }

  export type CpTempAccessGrantSumAggregateOutputType = {
    durationHours: number | null
  }

  export type CpTempAccessGrantMinAggregateOutputType = {
    id: string | null
    orgId: string | null
    requestedBy: string | null
    reason: string | null
    scope: string | null
    durationHours: number | null
    status: string | null
    requestedAt: Date | null
    approvedAt: Date | null
    approvedBy: string | null
    expiresAt: Date | null
    revokedAt: Date | null
    revokedBy: string | null
  }

  export type CpTempAccessGrantMaxAggregateOutputType = {
    id: string | null
    orgId: string | null
    requestedBy: string | null
    reason: string | null
    scope: string | null
    durationHours: number | null
    status: string | null
    requestedAt: Date | null
    approvedAt: Date | null
    approvedBy: string | null
    expiresAt: Date | null
    revokedAt: Date | null
    revokedBy: string | null
  }

  export type CpTempAccessGrantCountAggregateOutputType = {
    id: number
    orgId: number
    requestedBy: number
    reason: number
    scope: number
    durationHours: number
    status: number
    requestedAt: number
    approvedAt: number
    approvedBy: number
    expiresAt: number
    revokedAt: number
    revokedBy: number
    _all: number
  }


  export type CpTempAccessGrantAvgAggregateInputType = {
    durationHours?: true
  }

  export type CpTempAccessGrantSumAggregateInputType = {
    durationHours?: true
  }

  export type CpTempAccessGrantMinAggregateInputType = {
    id?: true
    orgId?: true
    requestedBy?: true
    reason?: true
    scope?: true
    durationHours?: true
    status?: true
    requestedAt?: true
    approvedAt?: true
    approvedBy?: true
    expiresAt?: true
    revokedAt?: true
    revokedBy?: true
  }

  export type CpTempAccessGrantMaxAggregateInputType = {
    id?: true
    orgId?: true
    requestedBy?: true
    reason?: true
    scope?: true
    durationHours?: true
    status?: true
    requestedAt?: true
    approvedAt?: true
    approvedBy?: true
    expiresAt?: true
    revokedAt?: true
    revokedBy?: true
  }

  export type CpTempAccessGrantCountAggregateInputType = {
    id?: true
    orgId?: true
    requestedBy?: true
    reason?: true
    scope?: true
    durationHours?: true
    status?: true
    requestedAt?: true
    approvedAt?: true
    approvedBy?: true
    expiresAt?: true
    revokedAt?: true
    revokedBy?: true
    _all?: true
  }

  export type CpTempAccessGrantAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CpTempAccessGrant to aggregate.
     */
    where?: CpTempAccessGrantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CpTempAccessGrants to fetch.
     */
    orderBy?: CpTempAccessGrantOrderByWithRelationInput | CpTempAccessGrantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CpTempAccessGrantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CpTempAccessGrants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CpTempAccessGrants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CpTempAccessGrants
    **/
    _count?: true | CpTempAccessGrantCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CpTempAccessGrantAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CpTempAccessGrantSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CpTempAccessGrantMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CpTempAccessGrantMaxAggregateInputType
  }

  export type GetCpTempAccessGrantAggregateType<T extends CpTempAccessGrantAggregateArgs> = {
        [P in keyof T & keyof AggregateCpTempAccessGrant]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCpTempAccessGrant[P]>
      : GetScalarType<T[P], AggregateCpTempAccessGrant[P]>
  }




  export type CpTempAccessGrantGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CpTempAccessGrantWhereInput
    orderBy?: CpTempAccessGrantOrderByWithAggregationInput | CpTempAccessGrantOrderByWithAggregationInput[]
    by: CpTempAccessGrantScalarFieldEnum[] | CpTempAccessGrantScalarFieldEnum
    having?: CpTempAccessGrantScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CpTempAccessGrantCountAggregateInputType | true
    _avg?: CpTempAccessGrantAvgAggregateInputType
    _sum?: CpTempAccessGrantSumAggregateInputType
    _min?: CpTempAccessGrantMinAggregateInputType
    _max?: CpTempAccessGrantMaxAggregateInputType
  }

  export type CpTempAccessGrantGroupByOutputType = {
    id: string
    orgId: string
    requestedBy: string
    reason: string
    scope: string
    durationHours: number
    status: string
    requestedAt: Date
    approvedAt: Date | null
    approvedBy: string | null
    expiresAt: Date | null
    revokedAt: Date | null
    revokedBy: string | null
    _count: CpTempAccessGrantCountAggregateOutputType | null
    _avg: CpTempAccessGrantAvgAggregateOutputType | null
    _sum: CpTempAccessGrantSumAggregateOutputType | null
    _min: CpTempAccessGrantMinAggregateOutputType | null
    _max: CpTempAccessGrantMaxAggregateOutputType | null
  }

  type GetCpTempAccessGrantGroupByPayload<T extends CpTempAccessGrantGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CpTempAccessGrantGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CpTempAccessGrantGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CpTempAccessGrantGroupByOutputType[P]>
            : GetScalarType<T[P], CpTempAccessGrantGroupByOutputType[P]>
        }
      >
    >


  export type CpTempAccessGrantSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    requestedBy?: boolean
    reason?: boolean
    scope?: boolean
    durationHours?: boolean
    status?: boolean
    requestedAt?: boolean
    approvedAt?: boolean
    approvedBy?: boolean
    expiresAt?: boolean
    revokedAt?: boolean
    revokedBy?: boolean
    organization?: boolean | CpOrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cpTempAccessGrant"]>

  export type CpTempAccessGrantSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    requestedBy?: boolean
    reason?: boolean
    scope?: boolean
    durationHours?: boolean
    status?: boolean
    requestedAt?: boolean
    approvedAt?: boolean
    approvedBy?: boolean
    expiresAt?: boolean
    revokedAt?: boolean
    revokedBy?: boolean
    organization?: boolean | CpOrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cpTempAccessGrant"]>

  export type CpTempAccessGrantSelectScalar = {
    id?: boolean
    orgId?: boolean
    requestedBy?: boolean
    reason?: boolean
    scope?: boolean
    durationHours?: boolean
    status?: boolean
    requestedAt?: boolean
    approvedAt?: boolean
    approvedBy?: boolean
    expiresAt?: boolean
    revokedAt?: boolean
    revokedBy?: boolean
  }

  export type CpTempAccessGrantInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | CpOrganizationDefaultArgs<ExtArgs>
  }
  export type CpTempAccessGrantIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | CpOrganizationDefaultArgs<ExtArgs>
  }

  export type $CpTempAccessGrantPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CpTempAccessGrant"
    objects: {
      organization: Prisma.$CpOrganizationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orgId: string
      requestedBy: string
      reason: string
      scope: string
      durationHours: number
      status: string
      requestedAt: Date
      approvedAt: Date | null
      approvedBy: string | null
      expiresAt: Date | null
      revokedAt: Date | null
      revokedBy: string | null
    }, ExtArgs["result"]["cpTempAccessGrant"]>
    composites: {}
  }

  type CpTempAccessGrantGetPayload<S extends boolean | null | undefined | CpTempAccessGrantDefaultArgs> = $Result.GetResult<Prisma.$CpTempAccessGrantPayload, S>

  type CpTempAccessGrantCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CpTempAccessGrantFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CpTempAccessGrantCountAggregateInputType | true
    }

  export interface CpTempAccessGrantDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CpTempAccessGrant'], meta: { name: 'CpTempAccessGrant' } }
    /**
     * Find zero or one CpTempAccessGrant that matches the filter.
     * @param {CpTempAccessGrantFindUniqueArgs} args - Arguments to find a CpTempAccessGrant
     * @example
     * // Get one CpTempAccessGrant
     * const cpTempAccessGrant = await prisma.cpTempAccessGrant.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CpTempAccessGrantFindUniqueArgs>(args: SelectSubset<T, CpTempAccessGrantFindUniqueArgs<ExtArgs>>): Prisma__CpTempAccessGrantClient<$Result.GetResult<Prisma.$CpTempAccessGrantPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CpTempAccessGrant that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CpTempAccessGrantFindUniqueOrThrowArgs} args - Arguments to find a CpTempAccessGrant
     * @example
     * // Get one CpTempAccessGrant
     * const cpTempAccessGrant = await prisma.cpTempAccessGrant.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CpTempAccessGrantFindUniqueOrThrowArgs>(args: SelectSubset<T, CpTempAccessGrantFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CpTempAccessGrantClient<$Result.GetResult<Prisma.$CpTempAccessGrantPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CpTempAccessGrant that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpTempAccessGrantFindFirstArgs} args - Arguments to find a CpTempAccessGrant
     * @example
     * // Get one CpTempAccessGrant
     * const cpTempAccessGrant = await prisma.cpTempAccessGrant.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CpTempAccessGrantFindFirstArgs>(args?: SelectSubset<T, CpTempAccessGrantFindFirstArgs<ExtArgs>>): Prisma__CpTempAccessGrantClient<$Result.GetResult<Prisma.$CpTempAccessGrantPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CpTempAccessGrant that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpTempAccessGrantFindFirstOrThrowArgs} args - Arguments to find a CpTempAccessGrant
     * @example
     * // Get one CpTempAccessGrant
     * const cpTempAccessGrant = await prisma.cpTempAccessGrant.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CpTempAccessGrantFindFirstOrThrowArgs>(args?: SelectSubset<T, CpTempAccessGrantFindFirstOrThrowArgs<ExtArgs>>): Prisma__CpTempAccessGrantClient<$Result.GetResult<Prisma.$CpTempAccessGrantPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CpTempAccessGrants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpTempAccessGrantFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CpTempAccessGrants
     * const cpTempAccessGrants = await prisma.cpTempAccessGrant.findMany()
     * 
     * // Get first 10 CpTempAccessGrants
     * const cpTempAccessGrants = await prisma.cpTempAccessGrant.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cpTempAccessGrantWithIdOnly = await prisma.cpTempAccessGrant.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CpTempAccessGrantFindManyArgs>(args?: SelectSubset<T, CpTempAccessGrantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CpTempAccessGrantPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CpTempAccessGrant.
     * @param {CpTempAccessGrantCreateArgs} args - Arguments to create a CpTempAccessGrant.
     * @example
     * // Create one CpTempAccessGrant
     * const CpTempAccessGrant = await prisma.cpTempAccessGrant.create({
     *   data: {
     *     // ... data to create a CpTempAccessGrant
     *   }
     * })
     * 
     */
    create<T extends CpTempAccessGrantCreateArgs>(args: SelectSubset<T, CpTempAccessGrantCreateArgs<ExtArgs>>): Prisma__CpTempAccessGrantClient<$Result.GetResult<Prisma.$CpTempAccessGrantPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CpTempAccessGrants.
     * @param {CpTempAccessGrantCreateManyArgs} args - Arguments to create many CpTempAccessGrants.
     * @example
     * // Create many CpTempAccessGrants
     * const cpTempAccessGrant = await prisma.cpTempAccessGrant.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CpTempAccessGrantCreateManyArgs>(args?: SelectSubset<T, CpTempAccessGrantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CpTempAccessGrants and returns the data saved in the database.
     * @param {CpTempAccessGrantCreateManyAndReturnArgs} args - Arguments to create many CpTempAccessGrants.
     * @example
     * // Create many CpTempAccessGrants
     * const cpTempAccessGrant = await prisma.cpTempAccessGrant.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CpTempAccessGrants and only return the `id`
     * const cpTempAccessGrantWithIdOnly = await prisma.cpTempAccessGrant.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CpTempAccessGrantCreateManyAndReturnArgs>(args?: SelectSubset<T, CpTempAccessGrantCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CpTempAccessGrantPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a CpTempAccessGrant.
     * @param {CpTempAccessGrantDeleteArgs} args - Arguments to delete one CpTempAccessGrant.
     * @example
     * // Delete one CpTempAccessGrant
     * const CpTempAccessGrant = await prisma.cpTempAccessGrant.delete({
     *   where: {
     *     // ... filter to delete one CpTempAccessGrant
     *   }
     * })
     * 
     */
    delete<T extends CpTempAccessGrantDeleteArgs>(args: SelectSubset<T, CpTempAccessGrantDeleteArgs<ExtArgs>>): Prisma__CpTempAccessGrantClient<$Result.GetResult<Prisma.$CpTempAccessGrantPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CpTempAccessGrant.
     * @param {CpTempAccessGrantUpdateArgs} args - Arguments to update one CpTempAccessGrant.
     * @example
     * // Update one CpTempAccessGrant
     * const cpTempAccessGrant = await prisma.cpTempAccessGrant.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CpTempAccessGrantUpdateArgs>(args: SelectSubset<T, CpTempAccessGrantUpdateArgs<ExtArgs>>): Prisma__CpTempAccessGrantClient<$Result.GetResult<Prisma.$CpTempAccessGrantPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CpTempAccessGrants.
     * @param {CpTempAccessGrantDeleteManyArgs} args - Arguments to filter CpTempAccessGrants to delete.
     * @example
     * // Delete a few CpTempAccessGrants
     * const { count } = await prisma.cpTempAccessGrant.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CpTempAccessGrantDeleteManyArgs>(args?: SelectSubset<T, CpTempAccessGrantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CpTempAccessGrants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpTempAccessGrantUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CpTempAccessGrants
     * const cpTempAccessGrant = await prisma.cpTempAccessGrant.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CpTempAccessGrantUpdateManyArgs>(args: SelectSubset<T, CpTempAccessGrantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CpTempAccessGrant.
     * @param {CpTempAccessGrantUpsertArgs} args - Arguments to update or create a CpTempAccessGrant.
     * @example
     * // Update or create a CpTempAccessGrant
     * const cpTempAccessGrant = await prisma.cpTempAccessGrant.upsert({
     *   create: {
     *     // ... data to create a CpTempAccessGrant
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CpTempAccessGrant we want to update
     *   }
     * })
     */
    upsert<T extends CpTempAccessGrantUpsertArgs>(args: SelectSubset<T, CpTempAccessGrantUpsertArgs<ExtArgs>>): Prisma__CpTempAccessGrantClient<$Result.GetResult<Prisma.$CpTempAccessGrantPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CpTempAccessGrants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpTempAccessGrantCountArgs} args - Arguments to filter CpTempAccessGrants to count.
     * @example
     * // Count the number of CpTempAccessGrants
     * const count = await prisma.cpTempAccessGrant.count({
     *   where: {
     *     // ... the filter for the CpTempAccessGrants we want to count
     *   }
     * })
    **/
    count<T extends CpTempAccessGrantCountArgs>(
      args?: Subset<T, CpTempAccessGrantCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CpTempAccessGrantCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CpTempAccessGrant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpTempAccessGrantAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CpTempAccessGrantAggregateArgs>(args: Subset<T, CpTempAccessGrantAggregateArgs>): Prisma.PrismaPromise<GetCpTempAccessGrantAggregateType<T>>

    /**
     * Group by CpTempAccessGrant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpTempAccessGrantGroupByArgs} args - Group by arguments.
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
      T extends CpTempAccessGrantGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CpTempAccessGrantGroupByArgs['orderBy'] }
        : { orderBy?: CpTempAccessGrantGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CpTempAccessGrantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCpTempAccessGrantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CpTempAccessGrant model
   */
  readonly fields: CpTempAccessGrantFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CpTempAccessGrant.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CpTempAccessGrantClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organization<T extends CpOrganizationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CpOrganizationDefaultArgs<ExtArgs>>): Prisma__CpOrganizationClient<$Result.GetResult<Prisma.$CpOrganizationPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the CpTempAccessGrant model
   */ 
  interface CpTempAccessGrantFieldRefs {
    readonly id: FieldRef<"CpTempAccessGrant", 'String'>
    readonly orgId: FieldRef<"CpTempAccessGrant", 'String'>
    readonly requestedBy: FieldRef<"CpTempAccessGrant", 'String'>
    readonly reason: FieldRef<"CpTempAccessGrant", 'String'>
    readonly scope: FieldRef<"CpTempAccessGrant", 'String'>
    readonly durationHours: FieldRef<"CpTempAccessGrant", 'Int'>
    readonly status: FieldRef<"CpTempAccessGrant", 'String'>
    readonly requestedAt: FieldRef<"CpTempAccessGrant", 'DateTime'>
    readonly approvedAt: FieldRef<"CpTempAccessGrant", 'DateTime'>
    readonly approvedBy: FieldRef<"CpTempAccessGrant", 'String'>
    readonly expiresAt: FieldRef<"CpTempAccessGrant", 'DateTime'>
    readonly revokedAt: FieldRef<"CpTempAccessGrant", 'DateTime'>
    readonly revokedBy: FieldRef<"CpTempAccessGrant", 'String'>
  }
    

  // Custom InputTypes
  /**
   * CpTempAccessGrant findUnique
   */
  export type CpTempAccessGrantFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpTempAccessGrant
     */
    select?: CpTempAccessGrantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpTempAccessGrantInclude<ExtArgs> | null
    /**
     * Filter, which CpTempAccessGrant to fetch.
     */
    where: CpTempAccessGrantWhereUniqueInput
  }

  /**
   * CpTempAccessGrant findUniqueOrThrow
   */
  export type CpTempAccessGrantFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpTempAccessGrant
     */
    select?: CpTempAccessGrantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpTempAccessGrantInclude<ExtArgs> | null
    /**
     * Filter, which CpTempAccessGrant to fetch.
     */
    where: CpTempAccessGrantWhereUniqueInput
  }

  /**
   * CpTempAccessGrant findFirst
   */
  export type CpTempAccessGrantFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpTempAccessGrant
     */
    select?: CpTempAccessGrantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpTempAccessGrantInclude<ExtArgs> | null
    /**
     * Filter, which CpTempAccessGrant to fetch.
     */
    where?: CpTempAccessGrantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CpTempAccessGrants to fetch.
     */
    orderBy?: CpTempAccessGrantOrderByWithRelationInput | CpTempAccessGrantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CpTempAccessGrants.
     */
    cursor?: CpTempAccessGrantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CpTempAccessGrants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CpTempAccessGrants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CpTempAccessGrants.
     */
    distinct?: CpTempAccessGrantScalarFieldEnum | CpTempAccessGrantScalarFieldEnum[]
  }

  /**
   * CpTempAccessGrant findFirstOrThrow
   */
  export type CpTempAccessGrantFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpTempAccessGrant
     */
    select?: CpTempAccessGrantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpTempAccessGrantInclude<ExtArgs> | null
    /**
     * Filter, which CpTempAccessGrant to fetch.
     */
    where?: CpTempAccessGrantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CpTempAccessGrants to fetch.
     */
    orderBy?: CpTempAccessGrantOrderByWithRelationInput | CpTempAccessGrantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CpTempAccessGrants.
     */
    cursor?: CpTempAccessGrantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CpTempAccessGrants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CpTempAccessGrants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CpTempAccessGrants.
     */
    distinct?: CpTempAccessGrantScalarFieldEnum | CpTempAccessGrantScalarFieldEnum[]
  }

  /**
   * CpTempAccessGrant findMany
   */
  export type CpTempAccessGrantFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpTempAccessGrant
     */
    select?: CpTempAccessGrantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpTempAccessGrantInclude<ExtArgs> | null
    /**
     * Filter, which CpTempAccessGrants to fetch.
     */
    where?: CpTempAccessGrantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CpTempAccessGrants to fetch.
     */
    orderBy?: CpTempAccessGrantOrderByWithRelationInput | CpTempAccessGrantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CpTempAccessGrants.
     */
    cursor?: CpTempAccessGrantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CpTempAccessGrants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CpTempAccessGrants.
     */
    skip?: number
    distinct?: CpTempAccessGrantScalarFieldEnum | CpTempAccessGrantScalarFieldEnum[]
  }

  /**
   * CpTempAccessGrant create
   */
  export type CpTempAccessGrantCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpTempAccessGrant
     */
    select?: CpTempAccessGrantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpTempAccessGrantInclude<ExtArgs> | null
    /**
     * The data needed to create a CpTempAccessGrant.
     */
    data: XOR<CpTempAccessGrantCreateInput, CpTempAccessGrantUncheckedCreateInput>
  }

  /**
   * CpTempAccessGrant createMany
   */
  export type CpTempAccessGrantCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CpTempAccessGrants.
     */
    data: CpTempAccessGrantCreateManyInput | CpTempAccessGrantCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CpTempAccessGrant createManyAndReturn
   */
  export type CpTempAccessGrantCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpTempAccessGrant
     */
    select?: CpTempAccessGrantSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many CpTempAccessGrants.
     */
    data: CpTempAccessGrantCreateManyInput | CpTempAccessGrantCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpTempAccessGrantIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CpTempAccessGrant update
   */
  export type CpTempAccessGrantUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpTempAccessGrant
     */
    select?: CpTempAccessGrantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpTempAccessGrantInclude<ExtArgs> | null
    /**
     * The data needed to update a CpTempAccessGrant.
     */
    data: XOR<CpTempAccessGrantUpdateInput, CpTempAccessGrantUncheckedUpdateInput>
    /**
     * Choose, which CpTempAccessGrant to update.
     */
    where: CpTempAccessGrantWhereUniqueInput
  }

  /**
   * CpTempAccessGrant updateMany
   */
  export type CpTempAccessGrantUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CpTempAccessGrants.
     */
    data: XOR<CpTempAccessGrantUpdateManyMutationInput, CpTempAccessGrantUncheckedUpdateManyInput>
    /**
     * Filter which CpTempAccessGrants to update
     */
    where?: CpTempAccessGrantWhereInput
  }

  /**
   * CpTempAccessGrant upsert
   */
  export type CpTempAccessGrantUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpTempAccessGrant
     */
    select?: CpTempAccessGrantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpTempAccessGrantInclude<ExtArgs> | null
    /**
     * The filter to search for the CpTempAccessGrant to update in case it exists.
     */
    where: CpTempAccessGrantWhereUniqueInput
    /**
     * In case the CpTempAccessGrant found by the `where` argument doesn't exist, create a new CpTempAccessGrant with this data.
     */
    create: XOR<CpTempAccessGrantCreateInput, CpTempAccessGrantUncheckedCreateInput>
    /**
     * In case the CpTempAccessGrant was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CpTempAccessGrantUpdateInput, CpTempAccessGrantUncheckedUpdateInput>
  }

  /**
   * CpTempAccessGrant delete
   */
  export type CpTempAccessGrantDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpTempAccessGrant
     */
    select?: CpTempAccessGrantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpTempAccessGrantInclude<ExtArgs> | null
    /**
     * Filter which CpTempAccessGrant to delete.
     */
    where: CpTempAccessGrantWhereUniqueInput
  }

  /**
   * CpTempAccessGrant deleteMany
   */
  export type CpTempAccessGrantDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CpTempAccessGrants to delete
     */
    where?: CpTempAccessGrantWhereInput
  }

  /**
   * CpTempAccessGrant without action
   */
  export type CpTempAccessGrantDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpTempAccessGrant
     */
    select?: CpTempAccessGrantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpTempAccessGrantInclude<ExtArgs> | null
  }


  /**
   * Model CpTenantDbUpgrade
   */

  export type AggregateCpTenantDbUpgrade = {
    _count: CpTenantDbUpgradeCountAggregateOutputType | null
    _min: CpTenantDbUpgradeMinAggregateOutputType | null
    _max: CpTenantDbUpgradeMaxAggregateOutputType | null
  }

  export type CpTenantDbUpgradeMinAggregateOutputType = {
    id: string | null
    orgId: string | null
    schemaVersion: string | null
    status: string | null
    startedAt: Date | null
    completedAt: Date | null
    errorLog: string | null
  }

  export type CpTenantDbUpgradeMaxAggregateOutputType = {
    id: string | null
    orgId: string | null
    schemaVersion: string | null
    status: string | null
    startedAt: Date | null
    completedAt: Date | null
    errorLog: string | null
  }

  export type CpTenantDbUpgradeCountAggregateOutputType = {
    id: number
    orgId: number
    schemaVersion: number
    status: number
    startedAt: number
    completedAt: number
    errorLog: number
    _all: number
  }


  export type CpTenantDbUpgradeMinAggregateInputType = {
    id?: true
    orgId?: true
    schemaVersion?: true
    status?: true
    startedAt?: true
    completedAt?: true
    errorLog?: true
  }

  export type CpTenantDbUpgradeMaxAggregateInputType = {
    id?: true
    orgId?: true
    schemaVersion?: true
    status?: true
    startedAt?: true
    completedAt?: true
    errorLog?: true
  }

  export type CpTenantDbUpgradeCountAggregateInputType = {
    id?: true
    orgId?: true
    schemaVersion?: true
    status?: true
    startedAt?: true
    completedAt?: true
    errorLog?: true
    _all?: true
  }

  export type CpTenantDbUpgradeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CpTenantDbUpgrade to aggregate.
     */
    where?: CpTenantDbUpgradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CpTenantDbUpgrades to fetch.
     */
    orderBy?: CpTenantDbUpgradeOrderByWithRelationInput | CpTenantDbUpgradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CpTenantDbUpgradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CpTenantDbUpgrades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CpTenantDbUpgrades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CpTenantDbUpgrades
    **/
    _count?: true | CpTenantDbUpgradeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CpTenantDbUpgradeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CpTenantDbUpgradeMaxAggregateInputType
  }

  export type GetCpTenantDbUpgradeAggregateType<T extends CpTenantDbUpgradeAggregateArgs> = {
        [P in keyof T & keyof AggregateCpTenantDbUpgrade]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCpTenantDbUpgrade[P]>
      : GetScalarType<T[P], AggregateCpTenantDbUpgrade[P]>
  }




  export type CpTenantDbUpgradeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CpTenantDbUpgradeWhereInput
    orderBy?: CpTenantDbUpgradeOrderByWithAggregationInput | CpTenantDbUpgradeOrderByWithAggregationInput[]
    by: CpTenantDbUpgradeScalarFieldEnum[] | CpTenantDbUpgradeScalarFieldEnum
    having?: CpTenantDbUpgradeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CpTenantDbUpgradeCountAggregateInputType | true
    _min?: CpTenantDbUpgradeMinAggregateInputType
    _max?: CpTenantDbUpgradeMaxAggregateInputType
  }

  export type CpTenantDbUpgradeGroupByOutputType = {
    id: string
    orgId: string
    schemaVersion: string
    status: string
    startedAt: Date | null
    completedAt: Date | null
    errorLog: string | null
    _count: CpTenantDbUpgradeCountAggregateOutputType | null
    _min: CpTenantDbUpgradeMinAggregateOutputType | null
    _max: CpTenantDbUpgradeMaxAggregateOutputType | null
  }

  type GetCpTenantDbUpgradeGroupByPayload<T extends CpTenantDbUpgradeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CpTenantDbUpgradeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CpTenantDbUpgradeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CpTenantDbUpgradeGroupByOutputType[P]>
            : GetScalarType<T[P], CpTenantDbUpgradeGroupByOutputType[P]>
        }
      >
    >


  export type CpTenantDbUpgradeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    schemaVersion?: boolean
    status?: boolean
    startedAt?: boolean
    completedAt?: boolean
    errorLog?: boolean
    organization?: boolean | CpOrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cpTenantDbUpgrade"]>

  export type CpTenantDbUpgradeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    schemaVersion?: boolean
    status?: boolean
    startedAt?: boolean
    completedAt?: boolean
    errorLog?: boolean
    organization?: boolean | CpOrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cpTenantDbUpgrade"]>

  export type CpTenantDbUpgradeSelectScalar = {
    id?: boolean
    orgId?: boolean
    schemaVersion?: boolean
    status?: boolean
    startedAt?: boolean
    completedAt?: boolean
    errorLog?: boolean
  }

  export type CpTenantDbUpgradeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | CpOrganizationDefaultArgs<ExtArgs>
  }
  export type CpTenantDbUpgradeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | CpOrganizationDefaultArgs<ExtArgs>
  }

  export type $CpTenantDbUpgradePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CpTenantDbUpgrade"
    objects: {
      organization: Prisma.$CpOrganizationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orgId: string
      schemaVersion: string
      status: string
      startedAt: Date | null
      completedAt: Date | null
      errorLog: string | null
    }, ExtArgs["result"]["cpTenantDbUpgrade"]>
    composites: {}
  }

  type CpTenantDbUpgradeGetPayload<S extends boolean | null | undefined | CpTenantDbUpgradeDefaultArgs> = $Result.GetResult<Prisma.$CpTenantDbUpgradePayload, S>

  type CpTenantDbUpgradeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CpTenantDbUpgradeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CpTenantDbUpgradeCountAggregateInputType | true
    }

  export interface CpTenantDbUpgradeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CpTenantDbUpgrade'], meta: { name: 'CpTenantDbUpgrade' } }
    /**
     * Find zero or one CpTenantDbUpgrade that matches the filter.
     * @param {CpTenantDbUpgradeFindUniqueArgs} args - Arguments to find a CpTenantDbUpgrade
     * @example
     * // Get one CpTenantDbUpgrade
     * const cpTenantDbUpgrade = await prisma.cpTenantDbUpgrade.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CpTenantDbUpgradeFindUniqueArgs>(args: SelectSubset<T, CpTenantDbUpgradeFindUniqueArgs<ExtArgs>>): Prisma__CpTenantDbUpgradeClient<$Result.GetResult<Prisma.$CpTenantDbUpgradePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CpTenantDbUpgrade that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CpTenantDbUpgradeFindUniqueOrThrowArgs} args - Arguments to find a CpTenantDbUpgrade
     * @example
     * // Get one CpTenantDbUpgrade
     * const cpTenantDbUpgrade = await prisma.cpTenantDbUpgrade.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CpTenantDbUpgradeFindUniqueOrThrowArgs>(args: SelectSubset<T, CpTenantDbUpgradeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CpTenantDbUpgradeClient<$Result.GetResult<Prisma.$CpTenantDbUpgradePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CpTenantDbUpgrade that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpTenantDbUpgradeFindFirstArgs} args - Arguments to find a CpTenantDbUpgrade
     * @example
     * // Get one CpTenantDbUpgrade
     * const cpTenantDbUpgrade = await prisma.cpTenantDbUpgrade.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CpTenantDbUpgradeFindFirstArgs>(args?: SelectSubset<T, CpTenantDbUpgradeFindFirstArgs<ExtArgs>>): Prisma__CpTenantDbUpgradeClient<$Result.GetResult<Prisma.$CpTenantDbUpgradePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CpTenantDbUpgrade that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpTenantDbUpgradeFindFirstOrThrowArgs} args - Arguments to find a CpTenantDbUpgrade
     * @example
     * // Get one CpTenantDbUpgrade
     * const cpTenantDbUpgrade = await prisma.cpTenantDbUpgrade.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CpTenantDbUpgradeFindFirstOrThrowArgs>(args?: SelectSubset<T, CpTenantDbUpgradeFindFirstOrThrowArgs<ExtArgs>>): Prisma__CpTenantDbUpgradeClient<$Result.GetResult<Prisma.$CpTenantDbUpgradePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CpTenantDbUpgrades that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpTenantDbUpgradeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CpTenantDbUpgrades
     * const cpTenantDbUpgrades = await prisma.cpTenantDbUpgrade.findMany()
     * 
     * // Get first 10 CpTenantDbUpgrades
     * const cpTenantDbUpgrades = await prisma.cpTenantDbUpgrade.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cpTenantDbUpgradeWithIdOnly = await prisma.cpTenantDbUpgrade.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CpTenantDbUpgradeFindManyArgs>(args?: SelectSubset<T, CpTenantDbUpgradeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CpTenantDbUpgradePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CpTenantDbUpgrade.
     * @param {CpTenantDbUpgradeCreateArgs} args - Arguments to create a CpTenantDbUpgrade.
     * @example
     * // Create one CpTenantDbUpgrade
     * const CpTenantDbUpgrade = await prisma.cpTenantDbUpgrade.create({
     *   data: {
     *     // ... data to create a CpTenantDbUpgrade
     *   }
     * })
     * 
     */
    create<T extends CpTenantDbUpgradeCreateArgs>(args: SelectSubset<T, CpTenantDbUpgradeCreateArgs<ExtArgs>>): Prisma__CpTenantDbUpgradeClient<$Result.GetResult<Prisma.$CpTenantDbUpgradePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CpTenantDbUpgrades.
     * @param {CpTenantDbUpgradeCreateManyArgs} args - Arguments to create many CpTenantDbUpgrades.
     * @example
     * // Create many CpTenantDbUpgrades
     * const cpTenantDbUpgrade = await prisma.cpTenantDbUpgrade.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CpTenantDbUpgradeCreateManyArgs>(args?: SelectSubset<T, CpTenantDbUpgradeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CpTenantDbUpgrades and returns the data saved in the database.
     * @param {CpTenantDbUpgradeCreateManyAndReturnArgs} args - Arguments to create many CpTenantDbUpgrades.
     * @example
     * // Create many CpTenantDbUpgrades
     * const cpTenantDbUpgrade = await prisma.cpTenantDbUpgrade.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CpTenantDbUpgrades and only return the `id`
     * const cpTenantDbUpgradeWithIdOnly = await prisma.cpTenantDbUpgrade.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CpTenantDbUpgradeCreateManyAndReturnArgs>(args?: SelectSubset<T, CpTenantDbUpgradeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CpTenantDbUpgradePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a CpTenantDbUpgrade.
     * @param {CpTenantDbUpgradeDeleteArgs} args - Arguments to delete one CpTenantDbUpgrade.
     * @example
     * // Delete one CpTenantDbUpgrade
     * const CpTenantDbUpgrade = await prisma.cpTenantDbUpgrade.delete({
     *   where: {
     *     // ... filter to delete one CpTenantDbUpgrade
     *   }
     * })
     * 
     */
    delete<T extends CpTenantDbUpgradeDeleteArgs>(args: SelectSubset<T, CpTenantDbUpgradeDeleteArgs<ExtArgs>>): Prisma__CpTenantDbUpgradeClient<$Result.GetResult<Prisma.$CpTenantDbUpgradePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CpTenantDbUpgrade.
     * @param {CpTenantDbUpgradeUpdateArgs} args - Arguments to update one CpTenantDbUpgrade.
     * @example
     * // Update one CpTenantDbUpgrade
     * const cpTenantDbUpgrade = await prisma.cpTenantDbUpgrade.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CpTenantDbUpgradeUpdateArgs>(args: SelectSubset<T, CpTenantDbUpgradeUpdateArgs<ExtArgs>>): Prisma__CpTenantDbUpgradeClient<$Result.GetResult<Prisma.$CpTenantDbUpgradePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CpTenantDbUpgrades.
     * @param {CpTenantDbUpgradeDeleteManyArgs} args - Arguments to filter CpTenantDbUpgrades to delete.
     * @example
     * // Delete a few CpTenantDbUpgrades
     * const { count } = await prisma.cpTenantDbUpgrade.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CpTenantDbUpgradeDeleteManyArgs>(args?: SelectSubset<T, CpTenantDbUpgradeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CpTenantDbUpgrades.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpTenantDbUpgradeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CpTenantDbUpgrades
     * const cpTenantDbUpgrade = await prisma.cpTenantDbUpgrade.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CpTenantDbUpgradeUpdateManyArgs>(args: SelectSubset<T, CpTenantDbUpgradeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CpTenantDbUpgrade.
     * @param {CpTenantDbUpgradeUpsertArgs} args - Arguments to update or create a CpTenantDbUpgrade.
     * @example
     * // Update or create a CpTenantDbUpgrade
     * const cpTenantDbUpgrade = await prisma.cpTenantDbUpgrade.upsert({
     *   create: {
     *     // ... data to create a CpTenantDbUpgrade
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CpTenantDbUpgrade we want to update
     *   }
     * })
     */
    upsert<T extends CpTenantDbUpgradeUpsertArgs>(args: SelectSubset<T, CpTenantDbUpgradeUpsertArgs<ExtArgs>>): Prisma__CpTenantDbUpgradeClient<$Result.GetResult<Prisma.$CpTenantDbUpgradePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CpTenantDbUpgrades.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpTenantDbUpgradeCountArgs} args - Arguments to filter CpTenantDbUpgrades to count.
     * @example
     * // Count the number of CpTenantDbUpgrades
     * const count = await prisma.cpTenantDbUpgrade.count({
     *   where: {
     *     // ... the filter for the CpTenantDbUpgrades we want to count
     *   }
     * })
    **/
    count<T extends CpTenantDbUpgradeCountArgs>(
      args?: Subset<T, CpTenantDbUpgradeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CpTenantDbUpgradeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CpTenantDbUpgrade.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpTenantDbUpgradeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CpTenantDbUpgradeAggregateArgs>(args: Subset<T, CpTenantDbUpgradeAggregateArgs>): Prisma.PrismaPromise<GetCpTenantDbUpgradeAggregateType<T>>

    /**
     * Group by CpTenantDbUpgrade.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpTenantDbUpgradeGroupByArgs} args - Group by arguments.
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
      T extends CpTenantDbUpgradeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CpTenantDbUpgradeGroupByArgs['orderBy'] }
        : { orderBy?: CpTenantDbUpgradeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CpTenantDbUpgradeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCpTenantDbUpgradeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CpTenantDbUpgrade model
   */
  readonly fields: CpTenantDbUpgradeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CpTenantDbUpgrade.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CpTenantDbUpgradeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organization<T extends CpOrganizationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CpOrganizationDefaultArgs<ExtArgs>>): Prisma__CpOrganizationClient<$Result.GetResult<Prisma.$CpOrganizationPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the CpTenantDbUpgrade model
   */ 
  interface CpTenantDbUpgradeFieldRefs {
    readonly id: FieldRef<"CpTenantDbUpgrade", 'String'>
    readonly orgId: FieldRef<"CpTenantDbUpgrade", 'String'>
    readonly schemaVersion: FieldRef<"CpTenantDbUpgrade", 'String'>
    readonly status: FieldRef<"CpTenantDbUpgrade", 'String'>
    readonly startedAt: FieldRef<"CpTenantDbUpgrade", 'DateTime'>
    readonly completedAt: FieldRef<"CpTenantDbUpgrade", 'DateTime'>
    readonly errorLog: FieldRef<"CpTenantDbUpgrade", 'String'>
  }
    

  // Custom InputTypes
  /**
   * CpTenantDbUpgrade findUnique
   */
  export type CpTenantDbUpgradeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpTenantDbUpgrade
     */
    select?: CpTenantDbUpgradeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpTenantDbUpgradeInclude<ExtArgs> | null
    /**
     * Filter, which CpTenantDbUpgrade to fetch.
     */
    where: CpTenantDbUpgradeWhereUniqueInput
  }

  /**
   * CpTenantDbUpgrade findUniqueOrThrow
   */
  export type CpTenantDbUpgradeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpTenantDbUpgrade
     */
    select?: CpTenantDbUpgradeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpTenantDbUpgradeInclude<ExtArgs> | null
    /**
     * Filter, which CpTenantDbUpgrade to fetch.
     */
    where: CpTenantDbUpgradeWhereUniqueInput
  }

  /**
   * CpTenantDbUpgrade findFirst
   */
  export type CpTenantDbUpgradeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpTenantDbUpgrade
     */
    select?: CpTenantDbUpgradeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpTenantDbUpgradeInclude<ExtArgs> | null
    /**
     * Filter, which CpTenantDbUpgrade to fetch.
     */
    where?: CpTenantDbUpgradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CpTenantDbUpgrades to fetch.
     */
    orderBy?: CpTenantDbUpgradeOrderByWithRelationInput | CpTenantDbUpgradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CpTenantDbUpgrades.
     */
    cursor?: CpTenantDbUpgradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CpTenantDbUpgrades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CpTenantDbUpgrades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CpTenantDbUpgrades.
     */
    distinct?: CpTenantDbUpgradeScalarFieldEnum | CpTenantDbUpgradeScalarFieldEnum[]
  }

  /**
   * CpTenantDbUpgrade findFirstOrThrow
   */
  export type CpTenantDbUpgradeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpTenantDbUpgrade
     */
    select?: CpTenantDbUpgradeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpTenantDbUpgradeInclude<ExtArgs> | null
    /**
     * Filter, which CpTenantDbUpgrade to fetch.
     */
    where?: CpTenantDbUpgradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CpTenantDbUpgrades to fetch.
     */
    orderBy?: CpTenantDbUpgradeOrderByWithRelationInput | CpTenantDbUpgradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CpTenantDbUpgrades.
     */
    cursor?: CpTenantDbUpgradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CpTenantDbUpgrades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CpTenantDbUpgrades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CpTenantDbUpgrades.
     */
    distinct?: CpTenantDbUpgradeScalarFieldEnum | CpTenantDbUpgradeScalarFieldEnum[]
  }

  /**
   * CpTenantDbUpgrade findMany
   */
  export type CpTenantDbUpgradeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpTenantDbUpgrade
     */
    select?: CpTenantDbUpgradeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpTenantDbUpgradeInclude<ExtArgs> | null
    /**
     * Filter, which CpTenantDbUpgrades to fetch.
     */
    where?: CpTenantDbUpgradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CpTenantDbUpgrades to fetch.
     */
    orderBy?: CpTenantDbUpgradeOrderByWithRelationInput | CpTenantDbUpgradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CpTenantDbUpgrades.
     */
    cursor?: CpTenantDbUpgradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CpTenantDbUpgrades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CpTenantDbUpgrades.
     */
    skip?: number
    distinct?: CpTenantDbUpgradeScalarFieldEnum | CpTenantDbUpgradeScalarFieldEnum[]
  }

  /**
   * CpTenantDbUpgrade create
   */
  export type CpTenantDbUpgradeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpTenantDbUpgrade
     */
    select?: CpTenantDbUpgradeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpTenantDbUpgradeInclude<ExtArgs> | null
    /**
     * The data needed to create a CpTenantDbUpgrade.
     */
    data: XOR<CpTenantDbUpgradeCreateInput, CpTenantDbUpgradeUncheckedCreateInput>
  }

  /**
   * CpTenantDbUpgrade createMany
   */
  export type CpTenantDbUpgradeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CpTenantDbUpgrades.
     */
    data: CpTenantDbUpgradeCreateManyInput | CpTenantDbUpgradeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CpTenantDbUpgrade createManyAndReturn
   */
  export type CpTenantDbUpgradeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpTenantDbUpgrade
     */
    select?: CpTenantDbUpgradeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many CpTenantDbUpgrades.
     */
    data: CpTenantDbUpgradeCreateManyInput | CpTenantDbUpgradeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpTenantDbUpgradeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CpTenantDbUpgrade update
   */
  export type CpTenantDbUpgradeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpTenantDbUpgrade
     */
    select?: CpTenantDbUpgradeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpTenantDbUpgradeInclude<ExtArgs> | null
    /**
     * The data needed to update a CpTenantDbUpgrade.
     */
    data: XOR<CpTenantDbUpgradeUpdateInput, CpTenantDbUpgradeUncheckedUpdateInput>
    /**
     * Choose, which CpTenantDbUpgrade to update.
     */
    where: CpTenantDbUpgradeWhereUniqueInput
  }

  /**
   * CpTenantDbUpgrade updateMany
   */
  export type CpTenantDbUpgradeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CpTenantDbUpgrades.
     */
    data: XOR<CpTenantDbUpgradeUpdateManyMutationInput, CpTenantDbUpgradeUncheckedUpdateManyInput>
    /**
     * Filter which CpTenantDbUpgrades to update
     */
    where?: CpTenantDbUpgradeWhereInput
  }

  /**
   * CpTenantDbUpgrade upsert
   */
  export type CpTenantDbUpgradeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpTenantDbUpgrade
     */
    select?: CpTenantDbUpgradeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpTenantDbUpgradeInclude<ExtArgs> | null
    /**
     * The filter to search for the CpTenantDbUpgrade to update in case it exists.
     */
    where: CpTenantDbUpgradeWhereUniqueInput
    /**
     * In case the CpTenantDbUpgrade found by the `where` argument doesn't exist, create a new CpTenantDbUpgrade with this data.
     */
    create: XOR<CpTenantDbUpgradeCreateInput, CpTenantDbUpgradeUncheckedCreateInput>
    /**
     * In case the CpTenantDbUpgrade was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CpTenantDbUpgradeUpdateInput, CpTenantDbUpgradeUncheckedUpdateInput>
  }

  /**
   * CpTenantDbUpgrade delete
   */
  export type CpTenantDbUpgradeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpTenantDbUpgrade
     */
    select?: CpTenantDbUpgradeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpTenantDbUpgradeInclude<ExtArgs> | null
    /**
     * Filter which CpTenantDbUpgrade to delete.
     */
    where: CpTenantDbUpgradeWhereUniqueInput
  }

  /**
   * CpTenantDbUpgrade deleteMany
   */
  export type CpTenantDbUpgradeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CpTenantDbUpgrades to delete
     */
    where?: CpTenantDbUpgradeWhereInput
  }

  /**
   * CpTenantDbUpgrade without action
   */
  export type CpTenantDbUpgradeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpTenantDbUpgrade
     */
    select?: CpTenantDbUpgradeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpTenantDbUpgradeInclude<ExtArgs> | null
  }


  /**
   * Model CpIncident
   */

  export type AggregateCpIncident = {
    _count: CpIncidentCountAggregateOutputType | null
    _min: CpIncidentMinAggregateOutputType | null
    _max: CpIncidentMaxAggregateOutputType | null
  }

  export type CpIncidentMinAggregateOutputType = {
    id: string | null
    orgId: string | null
    title: string | null
    description: string | null
    severity: string | null
    status: string | null
    createdBy: string | null
    createdAt: Date | null
    resolvedAt: Date | null
  }

  export type CpIncidentMaxAggregateOutputType = {
    id: string | null
    orgId: string | null
    title: string | null
    description: string | null
    severity: string | null
    status: string | null
    createdBy: string | null
    createdAt: Date | null
    resolvedAt: Date | null
  }

  export type CpIncidentCountAggregateOutputType = {
    id: number
    orgId: number
    title: number
    description: number
    severity: number
    status: number
    createdBy: number
    createdAt: number
    resolvedAt: number
    _all: number
  }


  export type CpIncidentMinAggregateInputType = {
    id?: true
    orgId?: true
    title?: true
    description?: true
    severity?: true
    status?: true
    createdBy?: true
    createdAt?: true
    resolvedAt?: true
  }

  export type CpIncidentMaxAggregateInputType = {
    id?: true
    orgId?: true
    title?: true
    description?: true
    severity?: true
    status?: true
    createdBy?: true
    createdAt?: true
    resolvedAt?: true
  }

  export type CpIncidentCountAggregateInputType = {
    id?: true
    orgId?: true
    title?: true
    description?: true
    severity?: true
    status?: true
    createdBy?: true
    createdAt?: true
    resolvedAt?: true
    _all?: true
  }

  export type CpIncidentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CpIncident to aggregate.
     */
    where?: CpIncidentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CpIncidents to fetch.
     */
    orderBy?: CpIncidentOrderByWithRelationInput | CpIncidentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CpIncidentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CpIncidents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CpIncidents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CpIncidents
    **/
    _count?: true | CpIncidentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CpIncidentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CpIncidentMaxAggregateInputType
  }

  export type GetCpIncidentAggregateType<T extends CpIncidentAggregateArgs> = {
        [P in keyof T & keyof AggregateCpIncident]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCpIncident[P]>
      : GetScalarType<T[P], AggregateCpIncident[P]>
  }




  export type CpIncidentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CpIncidentWhereInput
    orderBy?: CpIncidentOrderByWithAggregationInput | CpIncidentOrderByWithAggregationInput[]
    by: CpIncidentScalarFieldEnum[] | CpIncidentScalarFieldEnum
    having?: CpIncidentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CpIncidentCountAggregateInputType | true
    _min?: CpIncidentMinAggregateInputType
    _max?: CpIncidentMaxAggregateInputType
  }

  export type CpIncidentGroupByOutputType = {
    id: string
    orgId: string | null
    title: string
    description: string | null
    severity: string | null
    status: string
    createdBy: string | null
    createdAt: Date
    resolvedAt: Date | null
    _count: CpIncidentCountAggregateOutputType | null
    _min: CpIncidentMinAggregateOutputType | null
    _max: CpIncidentMaxAggregateOutputType | null
  }

  type GetCpIncidentGroupByPayload<T extends CpIncidentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CpIncidentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CpIncidentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CpIncidentGroupByOutputType[P]>
            : GetScalarType<T[P], CpIncidentGroupByOutputType[P]>
        }
      >
    >


  export type CpIncidentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    title?: boolean
    description?: boolean
    severity?: boolean
    status?: boolean
    createdBy?: boolean
    createdAt?: boolean
    resolvedAt?: boolean
    organization?: boolean | CpIncident$organizationArgs<ExtArgs>
  }, ExtArgs["result"]["cpIncident"]>

  export type CpIncidentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    title?: boolean
    description?: boolean
    severity?: boolean
    status?: boolean
    createdBy?: boolean
    createdAt?: boolean
    resolvedAt?: boolean
    organization?: boolean | CpIncident$organizationArgs<ExtArgs>
  }, ExtArgs["result"]["cpIncident"]>

  export type CpIncidentSelectScalar = {
    id?: boolean
    orgId?: boolean
    title?: boolean
    description?: boolean
    severity?: boolean
    status?: boolean
    createdBy?: boolean
    createdAt?: boolean
    resolvedAt?: boolean
  }

  export type CpIncidentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | CpIncident$organizationArgs<ExtArgs>
  }
  export type CpIncidentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | CpIncident$organizationArgs<ExtArgs>
  }

  export type $CpIncidentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CpIncident"
    objects: {
      organization: Prisma.$CpOrganizationPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orgId: string | null
      title: string
      description: string | null
      severity: string | null
      status: string
      createdBy: string | null
      createdAt: Date
      resolvedAt: Date | null
    }, ExtArgs["result"]["cpIncident"]>
    composites: {}
  }

  type CpIncidentGetPayload<S extends boolean | null | undefined | CpIncidentDefaultArgs> = $Result.GetResult<Prisma.$CpIncidentPayload, S>

  type CpIncidentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CpIncidentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CpIncidentCountAggregateInputType | true
    }

  export interface CpIncidentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CpIncident'], meta: { name: 'CpIncident' } }
    /**
     * Find zero or one CpIncident that matches the filter.
     * @param {CpIncidentFindUniqueArgs} args - Arguments to find a CpIncident
     * @example
     * // Get one CpIncident
     * const cpIncident = await prisma.cpIncident.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CpIncidentFindUniqueArgs>(args: SelectSubset<T, CpIncidentFindUniqueArgs<ExtArgs>>): Prisma__CpIncidentClient<$Result.GetResult<Prisma.$CpIncidentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CpIncident that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CpIncidentFindUniqueOrThrowArgs} args - Arguments to find a CpIncident
     * @example
     * // Get one CpIncident
     * const cpIncident = await prisma.cpIncident.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CpIncidentFindUniqueOrThrowArgs>(args: SelectSubset<T, CpIncidentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CpIncidentClient<$Result.GetResult<Prisma.$CpIncidentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CpIncident that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpIncidentFindFirstArgs} args - Arguments to find a CpIncident
     * @example
     * // Get one CpIncident
     * const cpIncident = await prisma.cpIncident.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CpIncidentFindFirstArgs>(args?: SelectSubset<T, CpIncidentFindFirstArgs<ExtArgs>>): Prisma__CpIncidentClient<$Result.GetResult<Prisma.$CpIncidentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CpIncident that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpIncidentFindFirstOrThrowArgs} args - Arguments to find a CpIncident
     * @example
     * // Get one CpIncident
     * const cpIncident = await prisma.cpIncident.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CpIncidentFindFirstOrThrowArgs>(args?: SelectSubset<T, CpIncidentFindFirstOrThrowArgs<ExtArgs>>): Prisma__CpIncidentClient<$Result.GetResult<Prisma.$CpIncidentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CpIncidents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpIncidentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CpIncidents
     * const cpIncidents = await prisma.cpIncident.findMany()
     * 
     * // Get first 10 CpIncidents
     * const cpIncidents = await prisma.cpIncident.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cpIncidentWithIdOnly = await prisma.cpIncident.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CpIncidentFindManyArgs>(args?: SelectSubset<T, CpIncidentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CpIncidentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CpIncident.
     * @param {CpIncidentCreateArgs} args - Arguments to create a CpIncident.
     * @example
     * // Create one CpIncident
     * const CpIncident = await prisma.cpIncident.create({
     *   data: {
     *     // ... data to create a CpIncident
     *   }
     * })
     * 
     */
    create<T extends CpIncidentCreateArgs>(args: SelectSubset<T, CpIncidentCreateArgs<ExtArgs>>): Prisma__CpIncidentClient<$Result.GetResult<Prisma.$CpIncidentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CpIncidents.
     * @param {CpIncidentCreateManyArgs} args - Arguments to create many CpIncidents.
     * @example
     * // Create many CpIncidents
     * const cpIncident = await prisma.cpIncident.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CpIncidentCreateManyArgs>(args?: SelectSubset<T, CpIncidentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CpIncidents and returns the data saved in the database.
     * @param {CpIncidentCreateManyAndReturnArgs} args - Arguments to create many CpIncidents.
     * @example
     * // Create many CpIncidents
     * const cpIncident = await prisma.cpIncident.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CpIncidents and only return the `id`
     * const cpIncidentWithIdOnly = await prisma.cpIncident.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CpIncidentCreateManyAndReturnArgs>(args?: SelectSubset<T, CpIncidentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CpIncidentPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a CpIncident.
     * @param {CpIncidentDeleteArgs} args - Arguments to delete one CpIncident.
     * @example
     * // Delete one CpIncident
     * const CpIncident = await prisma.cpIncident.delete({
     *   where: {
     *     // ... filter to delete one CpIncident
     *   }
     * })
     * 
     */
    delete<T extends CpIncidentDeleteArgs>(args: SelectSubset<T, CpIncidentDeleteArgs<ExtArgs>>): Prisma__CpIncidentClient<$Result.GetResult<Prisma.$CpIncidentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CpIncident.
     * @param {CpIncidentUpdateArgs} args - Arguments to update one CpIncident.
     * @example
     * // Update one CpIncident
     * const cpIncident = await prisma.cpIncident.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CpIncidentUpdateArgs>(args: SelectSubset<T, CpIncidentUpdateArgs<ExtArgs>>): Prisma__CpIncidentClient<$Result.GetResult<Prisma.$CpIncidentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CpIncidents.
     * @param {CpIncidentDeleteManyArgs} args - Arguments to filter CpIncidents to delete.
     * @example
     * // Delete a few CpIncidents
     * const { count } = await prisma.cpIncident.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CpIncidentDeleteManyArgs>(args?: SelectSubset<T, CpIncidentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CpIncidents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpIncidentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CpIncidents
     * const cpIncident = await prisma.cpIncident.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CpIncidentUpdateManyArgs>(args: SelectSubset<T, CpIncidentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CpIncident.
     * @param {CpIncidentUpsertArgs} args - Arguments to update or create a CpIncident.
     * @example
     * // Update or create a CpIncident
     * const cpIncident = await prisma.cpIncident.upsert({
     *   create: {
     *     // ... data to create a CpIncident
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CpIncident we want to update
     *   }
     * })
     */
    upsert<T extends CpIncidentUpsertArgs>(args: SelectSubset<T, CpIncidentUpsertArgs<ExtArgs>>): Prisma__CpIncidentClient<$Result.GetResult<Prisma.$CpIncidentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CpIncidents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpIncidentCountArgs} args - Arguments to filter CpIncidents to count.
     * @example
     * // Count the number of CpIncidents
     * const count = await prisma.cpIncident.count({
     *   where: {
     *     // ... the filter for the CpIncidents we want to count
     *   }
     * })
    **/
    count<T extends CpIncidentCountArgs>(
      args?: Subset<T, CpIncidentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CpIncidentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CpIncident.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpIncidentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CpIncidentAggregateArgs>(args: Subset<T, CpIncidentAggregateArgs>): Prisma.PrismaPromise<GetCpIncidentAggregateType<T>>

    /**
     * Group by CpIncident.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpIncidentGroupByArgs} args - Group by arguments.
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
      T extends CpIncidentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CpIncidentGroupByArgs['orderBy'] }
        : { orderBy?: CpIncidentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CpIncidentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCpIncidentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CpIncident model
   */
  readonly fields: CpIncidentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CpIncident.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CpIncidentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organization<T extends CpIncident$organizationArgs<ExtArgs> = {}>(args?: Subset<T, CpIncident$organizationArgs<ExtArgs>>): Prisma__CpOrganizationClient<$Result.GetResult<Prisma.$CpOrganizationPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
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
   * Fields of the CpIncident model
   */ 
  interface CpIncidentFieldRefs {
    readonly id: FieldRef<"CpIncident", 'String'>
    readonly orgId: FieldRef<"CpIncident", 'String'>
    readonly title: FieldRef<"CpIncident", 'String'>
    readonly description: FieldRef<"CpIncident", 'String'>
    readonly severity: FieldRef<"CpIncident", 'String'>
    readonly status: FieldRef<"CpIncident", 'String'>
    readonly createdBy: FieldRef<"CpIncident", 'String'>
    readonly createdAt: FieldRef<"CpIncident", 'DateTime'>
    readonly resolvedAt: FieldRef<"CpIncident", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CpIncident findUnique
   */
  export type CpIncidentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpIncident
     */
    select?: CpIncidentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpIncidentInclude<ExtArgs> | null
    /**
     * Filter, which CpIncident to fetch.
     */
    where: CpIncidentWhereUniqueInput
  }

  /**
   * CpIncident findUniqueOrThrow
   */
  export type CpIncidentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpIncident
     */
    select?: CpIncidentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpIncidentInclude<ExtArgs> | null
    /**
     * Filter, which CpIncident to fetch.
     */
    where: CpIncidentWhereUniqueInput
  }

  /**
   * CpIncident findFirst
   */
  export type CpIncidentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpIncident
     */
    select?: CpIncidentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpIncidentInclude<ExtArgs> | null
    /**
     * Filter, which CpIncident to fetch.
     */
    where?: CpIncidentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CpIncidents to fetch.
     */
    orderBy?: CpIncidentOrderByWithRelationInput | CpIncidentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CpIncidents.
     */
    cursor?: CpIncidentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CpIncidents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CpIncidents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CpIncidents.
     */
    distinct?: CpIncidentScalarFieldEnum | CpIncidentScalarFieldEnum[]
  }

  /**
   * CpIncident findFirstOrThrow
   */
  export type CpIncidentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpIncident
     */
    select?: CpIncidentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpIncidentInclude<ExtArgs> | null
    /**
     * Filter, which CpIncident to fetch.
     */
    where?: CpIncidentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CpIncidents to fetch.
     */
    orderBy?: CpIncidentOrderByWithRelationInput | CpIncidentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CpIncidents.
     */
    cursor?: CpIncidentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CpIncidents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CpIncidents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CpIncidents.
     */
    distinct?: CpIncidentScalarFieldEnum | CpIncidentScalarFieldEnum[]
  }

  /**
   * CpIncident findMany
   */
  export type CpIncidentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpIncident
     */
    select?: CpIncidentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpIncidentInclude<ExtArgs> | null
    /**
     * Filter, which CpIncidents to fetch.
     */
    where?: CpIncidentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CpIncidents to fetch.
     */
    orderBy?: CpIncidentOrderByWithRelationInput | CpIncidentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CpIncidents.
     */
    cursor?: CpIncidentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CpIncidents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CpIncidents.
     */
    skip?: number
    distinct?: CpIncidentScalarFieldEnum | CpIncidentScalarFieldEnum[]
  }

  /**
   * CpIncident create
   */
  export type CpIncidentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpIncident
     */
    select?: CpIncidentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpIncidentInclude<ExtArgs> | null
    /**
     * The data needed to create a CpIncident.
     */
    data: XOR<CpIncidentCreateInput, CpIncidentUncheckedCreateInput>
  }

  /**
   * CpIncident createMany
   */
  export type CpIncidentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CpIncidents.
     */
    data: CpIncidentCreateManyInput | CpIncidentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CpIncident createManyAndReturn
   */
  export type CpIncidentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpIncident
     */
    select?: CpIncidentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many CpIncidents.
     */
    data: CpIncidentCreateManyInput | CpIncidentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpIncidentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CpIncident update
   */
  export type CpIncidentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpIncident
     */
    select?: CpIncidentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpIncidentInclude<ExtArgs> | null
    /**
     * The data needed to update a CpIncident.
     */
    data: XOR<CpIncidentUpdateInput, CpIncidentUncheckedUpdateInput>
    /**
     * Choose, which CpIncident to update.
     */
    where: CpIncidentWhereUniqueInput
  }

  /**
   * CpIncident updateMany
   */
  export type CpIncidentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CpIncidents.
     */
    data: XOR<CpIncidentUpdateManyMutationInput, CpIncidentUncheckedUpdateManyInput>
    /**
     * Filter which CpIncidents to update
     */
    where?: CpIncidentWhereInput
  }

  /**
   * CpIncident upsert
   */
  export type CpIncidentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpIncident
     */
    select?: CpIncidentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpIncidentInclude<ExtArgs> | null
    /**
     * The filter to search for the CpIncident to update in case it exists.
     */
    where: CpIncidentWhereUniqueInput
    /**
     * In case the CpIncident found by the `where` argument doesn't exist, create a new CpIncident with this data.
     */
    create: XOR<CpIncidentCreateInput, CpIncidentUncheckedCreateInput>
    /**
     * In case the CpIncident was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CpIncidentUpdateInput, CpIncidentUncheckedUpdateInput>
  }

  /**
   * CpIncident delete
   */
  export type CpIncidentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpIncident
     */
    select?: CpIncidentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpIncidentInclude<ExtArgs> | null
    /**
     * Filter which CpIncident to delete.
     */
    where: CpIncidentWhereUniqueInput
  }

  /**
   * CpIncident deleteMany
   */
  export type CpIncidentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CpIncidents to delete
     */
    where?: CpIncidentWhereInput
  }

  /**
   * CpIncident.organization
   */
  export type CpIncident$organizationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpOrganization
     */
    select?: CpOrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpOrganizationInclude<ExtArgs> | null
    where?: CpOrganizationWhereInput
  }

  /**
   * CpIncident without action
   */
  export type CpIncidentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpIncident
     */
    select?: CpIncidentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpIncidentInclude<ExtArgs> | null
  }


  /**
   * Model CpMigration
   */

  export type AggregateCpMigration = {
    _count: CpMigrationCountAggregateOutputType | null
    _avg: CpMigrationAvgAggregateOutputType | null
    _sum: CpMigrationSumAggregateOutputType | null
    _min: CpMigrationMinAggregateOutputType | null
    _max: CpMigrationMaxAggregateOutputType | null
  }

  export type CpMigrationAvgAggregateOutputType = {
    totalRecords: number | null
    successCount: number | null
    failedCount: number | null
  }

  export type CpMigrationSumAggregateOutputType = {
    totalRecords: number | null
    successCount: number | null
    failedCount: number | null
  }

  export type CpMigrationMinAggregateOutputType = {
    id: string | null
    orgId: string | null
    sourceSystem: string | null
    status: string | null
    totalRecords: number | null
    successCount: number | null
    failedCount: number | null
    runBy: string | null
    runAt: Date | null
    notes: string | null
  }

  export type CpMigrationMaxAggregateOutputType = {
    id: string | null
    orgId: string | null
    sourceSystem: string | null
    status: string | null
    totalRecords: number | null
    successCount: number | null
    failedCount: number | null
    runBy: string | null
    runAt: Date | null
    notes: string | null
  }

  export type CpMigrationCountAggregateOutputType = {
    id: number
    orgId: number
    sourceSystem: number
    status: number
    totalRecords: number
    successCount: number
    failedCount: number
    runBy: number
    runAt: number
    notes: number
    _all: number
  }


  export type CpMigrationAvgAggregateInputType = {
    totalRecords?: true
    successCount?: true
    failedCount?: true
  }

  export type CpMigrationSumAggregateInputType = {
    totalRecords?: true
    successCount?: true
    failedCount?: true
  }

  export type CpMigrationMinAggregateInputType = {
    id?: true
    orgId?: true
    sourceSystem?: true
    status?: true
    totalRecords?: true
    successCount?: true
    failedCount?: true
    runBy?: true
    runAt?: true
    notes?: true
  }

  export type CpMigrationMaxAggregateInputType = {
    id?: true
    orgId?: true
    sourceSystem?: true
    status?: true
    totalRecords?: true
    successCount?: true
    failedCount?: true
    runBy?: true
    runAt?: true
    notes?: true
  }

  export type CpMigrationCountAggregateInputType = {
    id?: true
    orgId?: true
    sourceSystem?: true
    status?: true
    totalRecords?: true
    successCount?: true
    failedCount?: true
    runBy?: true
    runAt?: true
    notes?: true
    _all?: true
  }

  export type CpMigrationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CpMigration to aggregate.
     */
    where?: CpMigrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CpMigrations to fetch.
     */
    orderBy?: CpMigrationOrderByWithRelationInput | CpMigrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CpMigrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CpMigrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CpMigrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CpMigrations
    **/
    _count?: true | CpMigrationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CpMigrationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CpMigrationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CpMigrationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CpMigrationMaxAggregateInputType
  }

  export type GetCpMigrationAggregateType<T extends CpMigrationAggregateArgs> = {
        [P in keyof T & keyof AggregateCpMigration]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCpMigration[P]>
      : GetScalarType<T[P], AggregateCpMigration[P]>
  }




  export type CpMigrationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CpMigrationWhereInput
    orderBy?: CpMigrationOrderByWithAggregationInput | CpMigrationOrderByWithAggregationInput[]
    by: CpMigrationScalarFieldEnum[] | CpMigrationScalarFieldEnum
    having?: CpMigrationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CpMigrationCountAggregateInputType | true
    _avg?: CpMigrationAvgAggregateInputType
    _sum?: CpMigrationSumAggregateInputType
    _min?: CpMigrationMinAggregateInputType
    _max?: CpMigrationMaxAggregateInputType
  }

  export type CpMigrationGroupByOutputType = {
    id: string
    orgId: string
    sourceSystem: string
    status: string
    totalRecords: number | null
    successCount: number | null
    failedCount: number | null
    runBy: string | null
    runAt: Date
    notes: string | null
    _count: CpMigrationCountAggregateOutputType | null
    _avg: CpMigrationAvgAggregateOutputType | null
    _sum: CpMigrationSumAggregateOutputType | null
    _min: CpMigrationMinAggregateOutputType | null
    _max: CpMigrationMaxAggregateOutputType | null
  }

  type GetCpMigrationGroupByPayload<T extends CpMigrationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CpMigrationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CpMigrationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CpMigrationGroupByOutputType[P]>
            : GetScalarType<T[P], CpMigrationGroupByOutputType[P]>
        }
      >
    >


  export type CpMigrationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    sourceSystem?: boolean
    status?: boolean
    totalRecords?: boolean
    successCount?: boolean
    failedCount?: boolean
    runBy?: boolean
    runAt?: boolean
    notes?: boolean
    organization?: boolean | CpOrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cpMigration"]>

  export type CpMigrationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    sourceSystem?: boolean
    status?: boolean
    totalRecords?: boolean
    successCount?: boolean
    failedCount?: boolean
    runBy?: boolean
    runAt?: boolean
    notes?: boolean
    organization?: boolean | CpOrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cpMigration"]>

  export type CpMigrationSelectScalar = {
    id?: boolean
    orgId?: boolean
    sourceSystem?: boolean
    status?: boolean
    totalRecords?: boolean
    successCount?: boolean
    failedCount?: boolean
    runBy?: boolean
    runAt?: boolean
    notes?: boolean
  }

  export type CpMigrationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | CpOrganizationDefaultArgs<ExtArgs>
  }
  export type CpMigrationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | CpOrganizationDefaultArgs<ExtArgs>
  }

  export type $CpMigrationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CpMigration"
    objects: {
      organization: Prisma.$CpOrganizationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orgId: string
      sourceSystem: string
      status: string
      totalRecords: number | null
      successCount: number | null
      failedCount: number | null
      runBy: string | null
      runAt: Date
      notes: string | null
    }, ExtArgs["result"]["cpMigration"]>
    composites: {}
  }

  type CpMigrationGetPayload<S extends boolean | null | undefined | CpMigrationDefaultArgs> = $Result.GetResult<Prisma.$CpMigrationPayload, S>

  type CpMigrationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CpMigrationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CpMigrationCountAggregateInputType | true
    }

  export interface CpMigrationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CpMigration'], meta: { name: 'CpMigration' } }
    /**
     * Find zero or one CpMigration that matches the filter.
     * @param {CpMigrationFindUniqueArgs} args - Arguments to find a CpMigration
     * @example
     * // Get one CpMigration
     * const cpMigration = await prisma.cpMigration.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CpMigrationFindUniqueArgs>(args: SelectSubset<T, CpMigrationFindUniqueArgs<ExtArgs>>): Prisma__CpMigrationClient<$Result.GetResult<Prisma.$CpMigrationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CpMigration that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CpMigrationFindUniqueOrThrowArgs} args - Arguments to find a CpMigration
     * @example
     * // Get one CpMigration
     * const cpMigration = await prisma.cpMigration.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CpMigrationFindUniqueOrThrowArgs>(args: SelectSubset<T, CpMigrationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CpMigrationClient<$Result.GetResult<Prisma.$CpMigrationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CpMigration that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpMigrationFindFirstArgs} args - Arguments to find a CpMigration
     * @example
     * // Get one CpMigration
     * const cpMigration = await prisma.cpMigration.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CpMigrationFindFirstArgs>(args?: SelectSubset<T, CpMigrationFindFirstArgs<ExtArgs>>): Prisma__CpMigrationClient<$Result.GetResult<Prisma.$CpMigrationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CpMigration that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpMigrationFindFirstOrThrowArgs} args - Arguments to find a CpMigration
     * @example
     * // Get one CpMigration
     * const cpMigration = await prisma.cpMigration.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CpMigrationFindFirstOrThrowArgs>(args?: SelectSubset<T, CpMigrationFindFirstOrThrowArgs<ExtArgs>>): Prisma__CpMigrationClient<$Result.GetResult<Prisma.$CpMigrationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CpMigrations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpMigrationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CpMigrations
     * const cpMigrations = await prisma.cpMigration.findMany()
     * 
     * // Get first 10 CpMigrations
     * const cpMigrations = await prisma.cpMigration.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cpMigrationWithIdOnly = await prisma.cpMigration.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CpMigrationFindManyArgs>(args?: SelectSubset<T, CpMigrationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CpMigrationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CpMigration.
     * @param {CpMigrationCreateArgs} args - Arguments to create a CpMigration.
     * @example
     * // Create one CpMigration
     * const CpMigration = await prisma.cpMigration.create({
     *   data: {
     *     // ... data to create a CpMigration
     *   }
     * })
     * 
     */
    create<T extends CpMigrationCreateArgs>(args: SelectSubset<T, CpMigrationCreateArgs<ExtArgs>>): Prisma__CpMigrationClient<$Result.GetResult<Prisma.$CpMigrationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CpMigrations.
     * @param {CpMigrationCreateManyArgs} args - Arguments to create many CpMigrations.
     * @example
     * // Create many CpMigrations
     * const cpMigration = await prisma.cpMigration.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CpMigrationCreateManyArgs>(args?: SelectSubset<T, CpMigrationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CpMigrations and returns the data saved in the database.
     * @param {CpMigrationCreateManyAndReturnArgs} args - Arguments to create many CpMigrations.
     * @example
     * // Create many CpMigrations
     * const cpMigration = await prisma.cpMigration.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CpMigrations and only return the `id`
     * const cpMigrationWithIdOnly = await prisma.cpMigration.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CpMigrationCreateManyAndReturnArgs>(args?: SelectSubset<T, CpMigrationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CpMigrationPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a CpMigration.
     * @param {CpMigrationDeleteArgs} args - Arguments to delete one CpMigration.
     * @example
     * // Delete one CpMigration
     * const CpMigration = await prisma.cpMigration.delete({
     *   where: {
     *     // ... filter to delete one CpMigration
     *   }
     * })
     * 
     */
    delete<T extends CpMigrationDeleteArgs>(args: SelectSubset<T, CpMigrationDeleteArgs<ExtArgs>>): Prisma__CpMigrationClient<$Result.GetResult<Prisma.$CpMigrationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CpMigration.
     * @param {CpMigrationUpdateArgs} args - Arguments to update one CpMigration.
     * @example
     * // Update one CpMigration
     * const cpMigration = await prisma.cpMigration.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CpMigrationUpdateArgs>(args: SelectSubset<T, CpMigrationUpdateArgs<ExtArgs>>): Prisma__CpMigrationClient<$Result.GetResult<Prisma.$CpMigrationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CpMigrations.
     * @param {CpMigrationDeleteManyArgs} args - Arguments to filter CpMigrations to delete.
     * @example
     * // Delete a few CpMigrations
     * const { count } = await prisma.cpMigration.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CpMigrationDeleteManyArgs>(args?: SelectSubset<T, CpMigrationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CpMigrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpMigrationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CpMigrations
     * const cpMigration = await prisma.cpMigration.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CpMigrationUpdateManyArgs>(args: SelectSubset<T, CpMigrationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CpMigration.
     * @param {CpMigrationUpsertArgs} args - Arguments to update or create a CpMigration.
     * @example
     * // Update or create a CpMigration
     * const cpMigration = await prisma.cpMigration.upsert({
     *   create: {
     *     // ... data to create a CpMigration
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CpMigration we want to update
     *   }
     * })
     */
    upsert<T extends CpMigrationUpsertArgs>(args: SelectSubset<T, CpMigrationUpsertArgs<ExtArgs>>): Prisma__CpMigrationClient<$Result.GetResult<Prisma.$CpMigrationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CpMigrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpMigrationCountArgs} args - Arguments to filter CpMigrations to count.
     * @example
     * // Count the number of CpMigrations
     * const count = await prisma.cpMigration.count({
     *   where: {
     *     // ... the filter for the CpMigrations we want to count
     *   }
     * })
    **/
    count<T extends CpMigrationCountArgs>(
      args?: Subset<T, CpMigrationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CpMigrationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CpMigration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpMigrationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CpMigrationAggregateArgs>(args: Subset<T, CpMigrationAggregateArgs>): Prisma.PrismaPromise<GetCpMigrationAggregateType<T>>

    /**
     * Group by CpMigration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpMigrationGroupByArgs} args - Group by arguments.
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
      T extends CpMigrationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CpMigrationGroupByArgs['orderBy'] }
        : { orderBy?: CpMigrationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CpMigrationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCpMigrationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CpMigration model
   */
  readonly fields: CpMigrationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CpMigration.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CpMigrationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organization<T extends CpOrganizationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CpOrganizationDefaultArgs<ExtArgs>>): Prisma__CpOrganizationClient<$Result.GetResult<Prisma.$CpOrganizationPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the CpMigration model
   */ 
  interface CpMigrationFieldRefs {
    readonly id: FieldRef<"CpMigration", 'String'>
    readonly orgId: FieldRef<"CpMigration", 'String'>
    readonly sourceSystem: FieldRef<"CpMigration", 'String'>
    readonly status: FieldRef<"CpMigration", 'String'>
    readonly totalRecords: FieldRef<"CpMigration", 'Int'>
    readonly successCount: FieldRef<"CpMigration", 'Int'>
    readonly failedCount: FieldRef<"CpMigration", 'Int'>
    readonly runBy: FieldRef<"CpMigration", 'String'>
    readonly runAt: FieldRef<"CpMigration", 'DateTime'>
    readonly notes: FieldRef<"CpMigration", 'String'>
  }
    

  // Custom InputTypes
  /**
   * CpMigration findUnique
   */
  export type CpMigrationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpMigration
     */
    select?: CpMigrationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpMigrationInclude<ExtArgs> | null
    /**
     * Filter, which CpMigration to fetch.
     */
    where: CpMigrationWhereUniqueInput
  }

  /**
   * CpMigration findUniqueOrThrow
   */
  export type CpMigrationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpMigration
     */
    select?: CpMigrationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpMigrationInclude<ExtArgs> | null
    /**
     * Filter, which CpMigration to fetch.
     */
    where: CpMigrationWhereUniqueInput
  }

  /**
   * CpMigration findFirst
   */
  export type CpMigrationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpMigration
     */
    select?: CpMigrationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpMigrationInclude<ExtArgs> | null
    /**
     * Filter, which CpMigration to fetch.
     */
    where?: CpMigrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CpMigrations to fetch.
     */
    orderBy?: CpMigrationOrderByWithRelationInput | CpMigrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CpMigrations.
     */
    cursor?: CpMigrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CpMigrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CpMigrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CpMigrations.
     */
    distinct?: CpMigrationScalarFieldEnum | CpMigrationScalarFieldEnum[]
  }

  /**
   * CpMigration findFirstOrThrow
   */
  export type CpMigrationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpMigration
     */
    select?: CpMigrationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpMigrationInclude<ExtArgs> | null
    /**
     * Filter, which CpMigration to fetch.
     */
    where?: CpMigrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CpMigrations to fetch.
     */
    orderBy?: CpMigrationOrderByWithRelationInput | CpMigrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CpMigrations.
     */
    cursor?: CpMigrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CpMigrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CpMigrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CpMigrations.
     */
    distinct?: CpMigrationScalarFieldEnum | CpMigrationScalarFieldEnum[]
  }

  /**
   * CpMigration findMany
   */
  export type CpMigrationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpMigration
     */
    select?: CpMigrationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpMigrationInclude<ExtArgs> | null
    /**
     * Filter, which CpMigrations to fetch.
     */
    where?: CpMigrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CpMigrations to fetch.
     */
    orderBy?: CpMigrationOrderByWithRelationInput | CpMigrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CpMigrations.
     */
    cursor?: CpMigrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CpMigrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CpMigrations.
     */
    skip?: number
    distinct?: CpMigrationScalarFieldEnum | CpMigrationScalarFieldEnum[]
  }

  /**
   * CpMigration create
   */
  export type CpMigrationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpMigration
     */
    select?: CpMigrationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpMigrationInclude<ExtArgs> | null
    /**
     * The data needed to create a CpMigration.
     */
    data: XOR<CpMigrationCreateInput, CpMigrationUncheckedCreateInput>
  }

  /**
   * CpMigration createMany
   */
  export type CpMigrationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CpMigrations.
     */
    data: CpMigrationCreateManyInput | CpMigrationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CpMigration createManyAndReturn
   */
  export type CpMigrationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpMigration
     */
    select?: CpMigrationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many CpMigrations.
     */
    data: CpMigrationCreateManyInput | CpMigrationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpMigrationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CpMigration update
   */
  export type CpMigrationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpMigration
     */
    select?: CpMigrationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpMigrationInclude<ExtArgs> | null
    /**
     * The data needed to update a CpMigration.
     */
    data: XOR<CpMigrationUpdateInput, CpMigrationUncheckedUpdateInput>
    /**
     * Choose, which CpMigration to update.
     */
    where: CpMigrationWhereUniqueInput
  }

  /**
   * CpMigration updateMany
   */
  export type CpMigrationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CpMigrations.
     */
    data: XOR<CpMigrationUpdateManyMutationInput, CpMigrationUncheckedUpdateManyInput>
    /**
     * Filter which CpMigrations to update
     */
    where?: CpMigrationWhereInput
  }

  /**
   * CpMigration upsert
   */
  export type CpMigrationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpMigration
     */
    select?: CpMigrationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpMigrationInclude<ExtArgs> | null
    /**
     * The filter to search for the CpMigration to update in case it exists.
     */
    where: CpMigrationWhereUniqueInput
    /**
     * In case the CpMigration found by the `where` argument doesn't exist, create a new CpMigration with this data.
     */
    create: XOR<CpMigrationCreateInput, CpMigrationUncheckedCreateInput>
    /**
     * In case the CpMigration was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CpMigrationUpdateInput, CpMigrationUncheckedUpdateInput>
  }

  /**
   * CpMigration delete
   */
  export type CpMigrationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpMigration
     */
    select?: CpMigrationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpMigrationInclude<ExtArgs> | null
    /**
     * Filter which CpMigration to delete.
     */
    where: CpMigrationWhereUniqueInput
  }

  /**
   * CpMigration deleteMany
   */
  export type CpMigrationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CpMigrations to delete
     */
    where?: CpMigrationWhereInput
  }

  /**
   * CpMigration without action
   */
  export type CpMigrationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpMigration
     */
    select?: CpMigrationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpMigrationInclude<ExtArgs> | null
  }


  /**
   * Model CpUser
   */

  export type AggregateCpUser = {
    _count: CpUserCountAggregateOutputType | null
    _min: CpUserMinAggregateOutputType | null
    _max: CpUserMaxAggregateOutputType | null
  }

  export type CpUserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    emailVerified: boolean | null
    image: string | null
    passwordHash: string | null
    mfaEnabled: boolean | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CpUserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    emailVerified: boolean | null
    image: string | null
    passwordHash: string | null
    mfaEnabled: boolean | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CpUserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    emailVerified: number
    image: number
    passwordHash: number
    mfaEnabled: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CpUserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    emailVerified?: true
    image?: true
    passwordHash?: true
    mfaEnabled?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CpUserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    emailVerified?: true
    image?: true
    passwordHash?: true
    mfaEnabled?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CpUserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    emailVerified?: true
    image?: true
    passwordHash?: true
    mfaEnabled?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CpUserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CpUser to aggregate.
     */
    where?: CpUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CpUsers to fetch.
     */
    orderBy?: CpUserOrderByWithRelationInput | CpUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CpUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CpUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CpUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CpUsers
    **/
    _count?: true | CpUserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CpUserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CpUserMaxAggregateInputType
  }

  export type GetCpUserAggregateType<T extends CpUserAggregateArgs> = {
        [P in keyof T & keyof AggregateCpUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCpUser[P]>
      : GetScalarType<T[P], AggregateCpUser[P]>
  }




  export type CpUserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CpUserWhereInput
    orderBy?: CpUserOrderByWithAggregationInput | CpUserOrderByWithAggregationInput[]
    by: CpUserScalarFieldEnum[] | CpUserScalarFieldEnum
    having?: CpUserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CpUserCountAggregateInputType | true
    _min?: CpUserMinAggregateInputType
    _max?: CpUserMaxAggregateInputType
  }

  export type CpUserGroupByOutputType = {
    id: string
    email: string
    name: string | null
    emailVerified: boolean
    image: string | null
    passwordHash: string | null
    mfaEnabled: boolean
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: CpUserCountAggregateOutputType | null
    _min: CpUserMinAggregateOutputType | null
    _max: CpUserMaxAggregateOutputType | null
  }

  type GetCpUserGroupByPayload<T extends CpUserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CpUserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CpUserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CpUserGroupByOutputType[P]>
            : GetScalarType<T[P], CpUserGroupByOutputType[P]>
        }
      >
    >


  export type CpUserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    emailVerified?: boolean
    image?: boolean
    passwordHash?: boolean
    mfaEnabled?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sessions?: boolean | CpUser$sessionsArgs<ExtArgs>
    accounts?: boolean | CpUser$accountsArgs<ExtArgs>
    _count?: boolean | CpUserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cpUser"]>

  export type CpUserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    emailVerified?: boolean
    image?: boolean
    passwordHash?: boolean
    mfaEnabled?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["cpUser"]>

  export type CpUserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    emailVerified?: boolean
    image?: boolean
    passwordHash?: boolean
    mfaEnabled?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CpUserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | CpUser$sessionsArgs<ExtArgs>
    accounts?: boolean | CpUser$accountsArgs<ExtArgs>
    _count?: boolean | CpUserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CpUserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CpUserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CpUser"
    objects: {
      sessions: Prisma.$CpSessionPayload<ExtArgs>[]
      accounts: Prisma.$CpAccountPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string | null
      emailVerified: boolean
      image: string | null
      passwordHash: string | null
      mfaEnabled: boolean
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["cpUser"]>
    composites: {}
  }

  type CpUserGetPayload<S extends boolean | null | undefined | CpUserDefaultArgs> = $Result.GetResult<Prisma.$CpUserPayload, S>

  type CpUserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CpUserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CpUserCountAggregateInputType | true
    }

  export interface CpUserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CpUser'], meta: { name: 'CpUser' } }
    /**
     * Find zero or one CpUser that matches the filter.
     * @param {CpUserFindUniqueArgs} args - Arguments to find a CpUser
     * @example
     * // Get one CpUser
     * const cpUser = await prisma.cpUser.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CpUserFindUniqueArgs>(args: SelectSubset<T, CpUserFindUniqueArgs<ExtArgs>>): Prisma__CpUserClient<$Result.GetResult<Prisma.$CpUserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CpUser that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CpUserFindUniqueOrThrowArgs} args - Arguments to find a CpUser
     * @example
     * // Get one CpUser
     * const cpUser = await prisma.cpUser.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CpUserFindUniqueOrThrowArgs>(args: SelectSubset<T, CpUserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CpUserClient<$Result.GetResult<Prisma.$CpUserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CpUser that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpUserFindFirstArgs} args - Arguments to find a CpUser
     * @example
     * // Get one CpUser
     * const cpUser = await prisma.cpUser.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CpUserFindFirstArgs>(args?: SelectSubset<T, CpUserFindFirstArgs<ExtArgs>>): Prisma__CpUserClient<$Result.GetResult<Prisma.$CpUserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CpUser that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpUserFindFirstOrThrowArgs} args - Arguments to find a CpUser
     * @example
     * // Get one CpUser
     * const cpUser = await prisma.cpUser.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CpUserFindFirstOrThrowArgs>(args?: SelectSubset<T, CpUserFindFirstOrThrowArgs<ExtArgs>>): Prisma__CpUserClient<$Result.GetResult<Prisma.$CpUserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CpUsers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpUserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CpUsers
     * const cpUsers = await prisma.cpUser.findMany()
     * 
     * // Get first 10 CpUsers
     * const cpUsers = await prisma.cpUser.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cpUserWithIdOnly = await prisma.cpUser.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CpUserFindManyArgs>(args?: SelectSubset<T, CpUserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CpUserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CpUser.
     * @param {CpUserCreateArgs} args - Arguments to create a CpUser.
     * @example
     * // Create one CpUser
     * const CpUser = await prisma.cpUser.create({
     *   data: {
     *     // ... data to create a CpUser
     *   }
     * })
     * 
     */
    create<T extends CpUserCreateArgs>(args: SelectSubset<T, CpUserCreateArgs<ExtArgs>>): Prisma__CpUserClient<$Result.GetResult<Prisma.$CpUserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CpUsers.
     * @param {CpUserCreateManyArgs} args - Arguments to create many CpUsers.
     * @example
     * // Create many CpUsers
     * const cpUser = await prisma.cpUser.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CpUserCreateManyArgs>(args?: SelectSubset<T, CpUserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CpUsers and returns the data saved in the database.
     * @param {CpUserCreateManyAndReturnArgs} args - Arguments to create many CpUsers.
     * @example
     * // Create many CpUsers
     * const cpUser = await prisma.cpUser.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CpUsers and only return the `id`
     * const cpUserWithIdOnly = await prisma.cpUser.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CpUserCreateManyAndReturnArgs>(args?: SelectSubset<T, CpUserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CpUserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a CpUser.
     * @param {CpUserDeleteArgs} args - Arguments to delete one CpUser.
     * @example
     * // Delete one CpUser
     * const CpUser = await prisma.cpUser.delete({
     *   where: {
     *     // ... filter to delete one CpUser
     *   }
     * })
     * 
     */
    delete<T extends CpUserDeleteArgs>(args: SelectSubset<T, CpUserDeleteArgs<ExtArgs>>): Prisma__CpUserClient<$Result.GetResult<Prisma.$CpUserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CpUser.
     * @param {CpUserUpdateArgs} args - Arguments to update one CpUser.
     * @example
     * // Update one CpUser
     * const cpUser = await prisma.cpUser.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CpUserUpdateArgs>(args: SelectSubset<T, CpUserUpdateArgs<ExtArgs>>): Prisma__CpUserClient<$Result.GetResult<Prisma.$CpUserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CpUsers.
     * @param {CpUserDeleteManyArgs} args - Arguments to filter CpUsers to delete.
     * @example
     * // Delete a few CpUsers
     * const { count } = await prisma.cpUser.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CpUserDeleteManyArgs>(args?: SelectSubset<T, CpUserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CpUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpUserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CpUsers
     * const cpUser = await prisma.cpUser.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CpUserUpdateManyArgs>(args: SelectSubset<T, CpUserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CpUser.
     * @param {CpUserUpsertArgs} args - Arguments to update or create a CpUser.
     * @example
     * // Update or create a CpUser
     * const cpUser = await prisma.cpUser.upsert({
     *   create: {
     *     // ... data to create a CpUser
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CpUser we want to update
     *   }
     * })
     */
    upsert<T extends CpUserUpsertArgs>(args: SelectSubset<T, CpUserUpsertArgs<ExtArgs>>): Prisma__CpUserClient<$Result.GetResult<Prisma.$CpUserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CpUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpUserCountArgs} args - Arguments to filter CpUsers to count.
     * @example
     * // Count the number of CpUsers
     * const count = await prisma.cpUser.count({
     *   where: {
     *     // ... the filter for the CpUsers we want to count
     *   }
     * })
    **/
    count<T extends CpUserCountArgs>(
      args?: Subset<T, CpUserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CpUserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CpUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpUserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CpUserAggregateArgs>(args: Subset<T, CpUserAggregateArgs>): Prisma.PrismaPromise<GetCpUserAggregateType<T>>

    /**
     * Group by CpUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpUserGroupByArgs} args - Group by arguments.
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
      T extends CpUserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CpUserGroupByArgs['orderBy'] }
        : { orderBy?: CpUserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CpUserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCpUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CpUser model
   */
  readonly fields: CpUserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CpUser.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CpUserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sessions<T extends CpUser$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, CpUser$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CpSessionPayload<ExtArgs>, T, "findMany"> | Null>
    accounts<T extends CpUser$accountsArgs<ExtArgs> = {}>(args?: Subset<T, CpUser$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CpAccountPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the CpUser model
   */ 
  interface CpUserFieldRefs {
    readonly id: FieldRef<"CpUser", 'String'>
    readonly email: FieldRef<"CpUser", 'String'>
    readonly name: FieldRef<"CpUser", 'String'>
    readonly emailVerified: FieldRef<"CpUser", 'Boolean'>
    readonly image: FieldRef<"CpUser", 'String'>
    readonly passwordHash: FieldRef<"CpUser", 'String'>
    readonly mfaEnabled: FieldRef<"CpUser", 'Boolean'>
    readonly isActive: FieldRef<"CpUser", 'Boolean'>
    readonly createdAt: FieldRef<"CpUser", 'DateTime'>
    readonly updatedAt: FieldRef<"CpUser", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CpUser findUnique
   */
  export type CpUserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpUser
     */
    select?: CpUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpUserInclude<ExtArgs> | null
    /**
     * Filter, which CpUser to fetch.
     */
    where: CpUserWhereUniqueInput
  }

  /**
   * CpUser findUniqueOrThrow
   */
  export type CpUserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpUser
     */
    select?: CpUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpUserInclude<ExtArgs> | null
    /**
     * Filter, which CpUser to fetch.
     */
    where: CpUserWhereUniqueInput
  }

  /**
   * CpUser findFirst
   */
  export type CpUserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpUser
     */
    select?: CpUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpUserInclude<ExtArgs> | null
    /**
     * Filter, which CpUser to fetch.
     */
    where?: CpUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CpUsers to fetch.
     */
    orderBy?: CpUserOrderByWithRelationInput | CpUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CpUsers.
     */
    cursor?: CpUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CpUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CpUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CpUsers.
     */
    distinct?: CpUserScalarFieldEnum | CpUserScalarFieldEnum[]
  }

  /**
   * CpUser findFirstOrThrow
   */
  export type CpUserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpUser
     */
    select?: CpUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpUserInclude<ExtArgs> | null
    /**
     * Filter, which CpUser to fetch.
     */
    where?: CpUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CpUsers to fetch.
     */
    orderBy?: CpUserOrderByWithRelationInput | CpUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CpUsers.
     */
    cursor?: CpUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CpUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CpUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CpUsers.
     */
    distinct?: CpUserScalarFieldEnum | CpUserScalarFieldEnum[]
  }

  /**
   * CpUser findMany
   */
  export type CpUserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpUser
     */
    select?: CpUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpUserInclude<ExtArgs> | null
    /**
     * Filter, which CpUsers to fetch.
     */
    where?: CpUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CpUsers to fetch.
     */
    orderBy?: CpUserOrderByWithRelationInput | CpUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CpUsers.
     */
    cursor?: CpUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CpUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CpUsers.
     */
    skip?: number
    distinct?: CpUserScalarFieldEnum | CpUserScalarFieldEnum[]
  }

  /**
   * CpUser create
   */
  export type CpUserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpUser
     */
    select?: CpUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpUserInclude<ExtArgs> | null
    /**
     * The data needed to create a CpUser.
     */
    data: XOR<CpUserCreateInput, CpUserUncheckedCreateInput>
  }

  /**
   * CpUser createMany
   */
  export type CpUserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CpUsers.
     */
    data: CpUserCreateManyInput | CpUserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CpUser createManyAndReturn
   */
  export type CpUserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpUser
     */
    select?: CpUserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many CpUsers.
     */
    data: CpUserCreateManyInput | CpUserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CpUser update
   */
  export type CpUserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpUser
     */
    select?: CpUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpUserInclude<ExtArgs> | null
    /**
     * The data needed to update a CpUser.
     */
    data: XOR<CpUserUpdateInput, CpUserUncheckedUpdateInput>
    /**
     * Choose, which CpUser to update.
     */
    where: CpUserWhereUniqueInput
  }

  /**
   * CpUser updateMany
   */
  export type CpUserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CpUsers.
     */
    data: XOR<CpUserUpdateManyMutationInput, CpUserUncheckedUpdateManyInput>
    /**
     * Filter which CpUsers to update
     */
    where?: CpUserWhereInput
  }

  /**
   * CpUser upsert
   */
  export type CpUserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpUser
     */
    select?: CpUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpUserInclude<ExtArgs> | null
    /**
     * The filter to search for the CpUser to update in case it exists.
     */
    where: CpUserWhereUniqueInput
    /**
     * In case the CpUser found by the `where` argument doesn't exist, create a new CpUser with this data.
     */
    create: XOR<CpUserCreateInput, CpUserUncheckedCreateInput>
    /**
     * In case the CpUser was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CpUserUpdateInput, CpUserUncheckedUpdateInput>
  }

  /**
   * CpUser delete
   */
  export type CpUserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpUser
     */
    select?: CpUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpUserInclude<ExtArgs> | null
    /**
     * Filter which CpUser to delete.
     */
    where: CpUserWhereUniqueInput
  }

  /**
   * CpUser deleteMany
   */
  export type CpUserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CpUsers to delete
     */
    where?: CpUserWhereInput
  }

  /**
   * CpUser.sessions
   */
  export type CpUser$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpSession
     */
    select?: CpSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpSessionInclude<ExtArgs> | null
    where?: CpSessionWhereInput
    orderBy?: CpSessionOrderByWithRelationInput | CpSessionOrderByWithRelationInput[]
    cursor?: CpSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CpSessionScalarFieldEnum | CpSessionScalarFieldEnum[]
  }

  /**
   * CpUser.accounts
   */
  export type CpUser$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpAccount
     */
    select?: CpAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpAccountInclude<ExtArgs> | null
    where?: CpAccountWhereInput
    orderBy?: CpAccountOrderByWithRelationInput | CpAccountOrderByWithRelationInput[]
    cursor?: CpAccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CpAccountScalarFieldEnum | CpAccountScalarFieldEnum[]
  }

  /**
   * CpUser without action
   */
  export type CpUserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpUser
     */
    select?: CpUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpUserInclude<ExtArgs> | null
  }


  /**
   * Model CpSession
   */

  export type AggregateCpSession = {
    _count: CpSessionCountAggregateOutputType | null
    _min: CpSessionMinAggregateOutputType | null
    _max: CpSessionMaxAggregateOutputType | null
  }

  export type CpSessionMinAggregateOutputType = {
    id: string | null
    expiresAt: Date | null
    token: string | null
    createdAt: Date | null
    updatedAt: Date | null
    ipAddress: string | null
    userAgent: string | null
    userId: string | null
  }

  export type CpSessionMaxAggregateOutputType = {
    id: string | null
    expiresAt: Date | null
    token: string | null
    createdAt: Date | null
    updatedAt: Date | null
    ipAddress: string | null
    userAgent: string | null
    userId: string | null
  }

  export type CpSessionCountAggregateOutputType = {
    id: number
    expiresAt: number
    token: number
    createdAt: number
    updatedAt: number
    ipAddress: number
    userAgent: number
    userId: number
    _all: number
  }


  export type CpSessionMinAggregateInputType = {
    id?: true
    expiresAt?: true
    token?: true
    createdAt?: true
    updatedAt?: true
    ipAddress?: true
    userAgent?: true
    userId?: true
  }

  export type CpSessionMaxAggregateInputType = {
    id?: true
    expiresAt?: true
    token?: true
    createdAt?: true
    updatedAt?: true
    ipAddress?: true
    userAgent?: true
    userId?: true
  }

  export type CpSessionCountAggregateInputType = {
    id?: true
    expiresAt?: true
    token?: true
    createdAt?: true
    updatedAt?: true
    ipAddress?: true
    userAgent?: true
    userId?: true
    _all?: true
  }

  export type CpSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CpSession to aggregate.
     */
    where?: CpSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CpSessions to fetch.
     */
    orderBy?: CpSessionOrderByWithRelationInput | CpSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CpSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CpSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CpSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CpSessions
    **/
    _count?: true | CpSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CpSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CpSessionMaxAggregateInputType
  }

  export type GetCpSessionAggregateType<T extends CpSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateCpSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCpSession[P]>
      : GetScalarType<T[P], AggregateCpSession[P]>
  }




  export type CpSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CpSessionWhereInput
    orderBy?: CpSessionOrderByWithAggregationInput | CpSessionOrderByWithAggregationInput[]
    by: CpSessionScalarFieldEnum[] | CpSessionScalarFieldEnum
    having?: CpSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CpSessionCountAggregateInputType | true
    _min?: CpSessionMinAggregateInputType
    _max?: CpSessionMaxAggregateInputType
  }

  export type CpSessionGroupByOutputType = {
    id: string
    expiresAt: Date
    token: string
    createdAt: Date
    updatedAt: Date
    ipAddress: string | null
    userAgent: string | null
    userId: string
    _count: CpSessionCountAggregateOutputType | null
    _min: CpSessionMinAggregateOutputType | null
    _max: CpSessionMaxAggregateOutputType | null
  }

  type GetCpSessionGroupByPayload<T extends CpSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CpSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CpSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CpSessionGroupByOutputType[P]>
            : GetScalarType<T[P], CpSessionGroupByOutputType[P]>
        }
      >
    >


  export type CpSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
    user?: boolean | CpUserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cpSession"]>

  export type CpSessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
    user?: boolean | CpUserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cpSession"]>

  export type CpSessionSelectScalar = {
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
  }

  export type CpSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | CpUserDefaultArgs<ExtArgs>
  }
  export type CpSessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | CpUserDefaultArgs<ExtArgs>
  }

  export type $CpSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CpSession"
    objects: {
      user: Prisma.$CpUserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      expiresAt: Date
      token: string
      createdAt: Date
      updatedAt: Date
      ipAddress: string | null
      userAgent: string | null
      userId: string
    }, ExtArgs["result"]["cpSession"]>
    composites: {}
  }

  type CpSessionGetPayload<S extends boolean | null | undefined | CpSessionDefaultArgs> = $Result.GetResult<Prisma.$CpSessionPayload, S>

  type CpSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CpSessionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CpSessionCountAggregateInputType | true
    }

  export interface CpSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CpSession'], meta: { name: 'CpSession' } }
    /**
     * Find zero or one CpSession that matches the filter.
     * @param {CpSessionFindUniqueArgs} args - Arguments to find a CpSession
     * @example
     * // Get one CpSession
     * const cpSession = await prisma.cpSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CpSessionFindUniqueArgs>(args: SelectSubset<T, CpSessionFindUniqueArgs<ExtArgs>>): Prisma__CpSessionClient<$Result.GetResult<Prisma.$CpSessionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CpSession that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CpSessionFindUniqueOrThrowArgs} args - Arguments to find a CpSession
     * @example
     * // Get one CpSession
     * const cpSession = await prisma.cpSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CpSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, CpSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CpSessionClient<$Result.GetResult<Prisma.$CpSessionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CpSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpSessionFindFirstArgs} args - Arguments to find a CpSession
     * @example
     * // Get one CpSession
     * const cpSession = await prisma.cpSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CpSessionFindFirstArgs>(args?: SelectSubset<T, CpSessionFindFirstArgs<ExtArgs>>): Prisma__CpSessionClient<$Result.GetResult<Prisma.$CpSessionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CpSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpSessionFindFirstOrThrowArgs} args - Arguments to find a CpSession
     * @example
     * // Get one CpSession
     * const cpSession = await prisma.cpSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CpSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, CpSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__CpSessionClient<$Result.GetResult<Prisma.$CpSessionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CpSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CpSessions
     * const cpSessions = await prisma.cpSession.findMany()
     * 
     * // Get first 10 CpSessions
     * const cpSessions = await prisma.cpSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cpSessionWithIdOnly = await prisma.cpSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CpSessionFindManyArgs>(args?: SelectSubset<T, CpSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CpSessionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CpSession.
     * @param {CpSessionCreateArgs} args - Arguments to create a CpSession.
     * @example
     * // Create one CpSession
     * const CpSession = await prisma.cpSession.create({
     *   data: {
     *     // ... data to create a CpSession
     *   }
     * })
     * 
     */
    create<T extends CpSessionCreateArgs>(args: SelectSubset<T, CpSessionCreateArgs<ExtArgs>>): Prisma__CpSessionClient<$Result.GetResult<Prisma.$CpSessionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CpSessions.
     * @param {CpSessionCreateManyArgs} args - Arguments to create many CpSessions.
     * @example
     * // Create many CpSessions
     * const cpSession = await prisma.cpSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CpSessionCreateManyArgs>(args?: SelectSubset<T, CpSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CpSessions and returns the data saved in the database.
     * @param {CpSessionCreateManyAndReturnArgs} args - Arguments to create many CpSessions.
     * @example
     * // Create many CpSessions
     * const cpSession = await prisma.cpSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CpSessions and only return the `id`
     * const cpSessionWithIdOnly = await prisma.cpSession.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CpSessionCreateManyAndReturnArgs>(args?: SelectSubset<T, CpSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CpSessionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a CpSession.
     * @param {CpSessionDeleteArgs} args - Arguments to delete one CpSession.
     * @example
     * // Delete one CpSession
     * const CpSession = await prisma.cpSession.delete({
     *   where: {
     *     // ... filter to delete one CpSession
     *   }
     * })
     * 
     */
    delete<T extends CpSessionDeleteArgs>(args: SelectSubset<T, CpSessionDeleteArgs<ExtArgs>>): Prisma__CpSessionClient<$Result.GetResult<Prisma.$CpSessionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CpSession.
     * @param {CpSessionUpdateArgs} args - Arguments to update one CpSession.
     * @example
     * // Update one CpSession
     * const cpSession = await prisma.cpSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CpSessionUpdateArgs>(args: SelectSubset<T, CpSessionUpdateArgs<ExtArgs>>): Prisma__CpSessionClient<$Result.GetResult<Prisma.$CpSessionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CpSessions.
     * @param {CpSessionDeleteManyArgs} args - Arguments to filter CpSessions to delete.
     * @example
     * // Delete a few CpSessions
     * const { count } = await prisma.cpSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CpSessionDeleteManyArgs>(args?: SelectSubset<T, CpSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CpSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CpSessions
     * const cpSession = await prisma.cpSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CpSessionUpdateManyArgs>(args: SelectSubset<T, CpSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CpSession.
     * @param {CpSessionUpsertArgs} args - Arguments to update or create a CpSession.
     * @example
     * // Update or create a CpSession
     * const cpSession = await prisma.cpSession.upsert({
     *   create: {
     *     // ... data to create a CpSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CpSession we want to update
     *   }
     * })
     */
    upsert<T extends CpSessionUpsertArgs>(args: SelectSubset<T, CpSessionUpsertArgs<ExtArgs>>): Prisma__CpSessionClient<$Result.GetResult<Prisma.$CpSessionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CpSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpSessionCountArgs} args - Arguments to filter CpSessions to count.
     * @example
     * // Count the number of CpSessions
     * const count = await prisma.cpSession.count({
     *   where: {
     *     // ... the filter for the CpSessions we want to count
     *   }
     * })
    **/
    count<T extends CpSessionCountArgs>(
      args?: Subset<T, CpSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CpSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CpSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CpSessionAggregateArgs>(args: Subset<T, CpSessionAggregateArgs>): Prisma.PrismaPromise<GetCpSessionAggregateType<T>>

    /**
     * Group by CpSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpSessionGroupByArgs} args - Group by arguments.
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
      T extends CpSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CpSessionGroupByArgs['orderBy'] }
        : { orderBy?: CpSessionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CpSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCpSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CpSession model
   */
  readonly fields: CpSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CpSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CpSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends CpUserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CpUserDefaultArgs<ExtArgs>>): Prisma__CpUserClient<$Result.GetResult<Prisma.$CpUserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the CpSession model
   */ 
  interface CpSessionFieldRefs {
    readonly id: FieldRef<"CpSession", 'String'>
    readonly expiresAt: FieldRef<"CpSession", 'DateTime'>
    readonly token: FieldRef<"CpSession", 'String'>
    readonly createdAt: FieldRef<"CpSession", 'DateTime'>
    readonly updatedAt: FieldRef<"CpSession", 'DateTime'>
    readonly ipAddress: FieldRef<"CpSession", 'String'>
    readonly userAgent: FieldRef<"CpSession", 'String'>
    readonly userId: FieldRef<"CpSession", 'String'>
  }
    

  // Custom InputTypes
  /**
   * CpSession findUnique
   */
  export type CpSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpSession
     */
    select?: CpSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpSessionInclude<ExtArgs> | null
    /**
     * Filter, which CpSession to fetch.
     */
    where: CpSessionWhereUniqueInput
  }

  /**
   * CpSession findUniqueOrThrow
   */
  export type CpSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpSession
     */
    select?: CpSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpSessionInclude<ExtArgs> | null
    /**
     * Filter, which CpSession to fetch.
     */
    where: CpSessionWhereUniqueInput
  }

  /**
   * CpSession findFirst
   */
  export type CpSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpSession
     */
    select?: CpSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpSessionInclude<ExtArgs> | null
    /**
     * Filter, which CpSession to fetch.
     */
    where?: CpSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CpSessions to fetch.
     */
    orderBy?: CpSessionOrderByWithRelationInput | CpSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CpSessions.
     */
    cursor?: CpSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CpSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CpSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CpSessions.
     */
    distinct?: CpSessionScalarFieldEnum | CpSessionScalarFieldEnum[]
  }

  /**
   * CpSession findFirstOrThrow
   */
  export type CpSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpSession
     */
    select?: CpSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpSessionInclude<ExtArgs> | null
    /**
     * Filter, which CpSession to fetch.
     */
    where?: CpSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CpSessions to fetch.
     */
    orderBy?: CpSessionOrderByWithRelationInput | CpSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CpSessions.
     */
    cursor?: CpSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CpSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CpSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CpSessions.
     */
    distinct?: CpSessionScalarFieldEnum | CpSessionScalarFieldEnum[]
  }

  /**
   * CpSession findMany
   */
  export type CpSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpSession
     */
    select?: CpSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpSessionInclude<ExtArgs> | null
    /**
     * Filter, which CpSessions to fetch.
     */
    where?: CpSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CpSessions to fetch.
     */
    orderBy?: CpSessionOrderByWithRelationInput | CpSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CpSessions.
     */
    cursor?: CpSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CpSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CpSessions.
     */
    skip?: number
    distinct?: CpSessionScalarFieldEnum | CpSessionScalarFieldEnum[]
  }

  /**
   * CpSession create
   */
  export type CpSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpSession
     */
    select?: CpSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a CpSession.
     */
    data: XOR<CpSessionCreateInput, CpSessionUncheckedCreateInput>
  }

  /**
   * CpSession createMany
   */
  export type CpSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CpSessions.
     */
    data: CpSessionCreateManyInput | CpSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CpSession createManyAndReturn
   */
  export type CpSessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpSession
     */
    select?: CpSessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many CpSessions.
     */
    data: CpSessionCreateManyInput | CpSessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpSessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CpSession update
   */
  export type CpSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpSession
     */
    select?: CpSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a CpSession.
     */
    data: XOR<CpSessionUpdateInput, CpSessionUncheckedUpdateInput>
    /**
     * Choose, which CpSession to update.
     */
    where: CpSessionWhereUniqueInput
  }

  /**
   * CpSession updateMany
   */
  export type CpSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CpSessions.
     */
    data: XOR<CpSessionUpdateManyMutationInput, CpSessionUncheckedUpdateManyInput>
    /**
     * Filter which CpSessions to update
     */
    where?: CpSessionWhereInput
  }

  /**
   * CpSession upsert
   */
  export type CpSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpSession
     */
    select?: CpSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the CpSession to update in case it exists.
     */
    where: CpSessionWhereUniqueInput
    /**
     * In case the CpSession found by the `where` argument doesn't exist, create a new CpSession with this data.
     */
    create: XOR<CpSessionCreateInput, CpSessionUncheckedCreateInput>
    /**
     * In case the CpSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CpSessionUpdateInput, CpSessionUncheckedUpdateInput>
  }

  /**
   * CpSession delete
   */
  export type CpSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpSession
     */
    select?: CpSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpSessionInclude<ExtArgs> | null
    /**
     * Filter which CpSession to delete.
     */
    where: CpSessionWhereUniqueInput
  }

  /**
   * CpSession deleteMany
   */
  export type CpSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CpSessions to delete
     */
    where?: CpSessionWhereInput
  }

  /**
   * CpSession without action
   */
  export type CpSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpSession
     */
    select?: CpSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpSessionInclude<ExtArgs> | null
  }


  /**
   * Model CpAccount
   */

  export type AggregateCpAccount = {
    _count: CpAccountCountAggregateOutputType | null
    _min: CpAccountMinAggregateOutputType | null
    _max: CpAccountMaxAggregateOutputType | null
  }

  export type CpAccountMinAggregateOutputType = {
    id: string | null
    accountId: string | null
    providerId: string | null
    userId: string | null
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    expiresAt: Date | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CpAccountMaxAggregateOutputType = {
    id: string | null
    accountId: string | null
    providerId: string | null
    userId: string | null
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    expiresAt: Date | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CpAccountCountAggregateOutputType = {
    id: number
    accountId: number
    providerId: number
    userId: number
    accessToken: number
    refreshToken: number
    idToken: number
    expiresAt: number
    password: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CpAccountMinAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    expiresAt?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CpAccountMaxAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    expiresAt?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CpAccountCountAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    expiresAt?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CpAccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CpAccount to aggregate.
     */
    where?: CpAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CpAccounts to fetch.
     */
    orderBy?: CpAccountOrderByWithRelationInput | CpAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CpAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CpAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CpAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CpAccounts
    **/
    _count?: true | CpAccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CpAccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CpAccountMaxAggregateInputType
  }

  export type GetCpAccountAggregateType<T extends CpAccountAggregateArgs> = {
        [P in keyof T & keyof AggregateCpAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCpAccount[P]>
      : GetScalarType<T[P], AggregateCpAccount[P]>
  }




  export type CpAccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CpAccountWhereInput
    orderBy?: CpAccountOrderByWithAggregationInput | CpAccountOrderByWithAggregationInput[]
    by: CpAccountScalarFieldEnum[] | CpAccountScalarFieldEnum
    having?: CpAccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CpAccountCountAggregateInputType | true
    _min?: CpAccountMinAggregateInputType
    _max?: CpAccountMaxAggregateInputType
  }

  export type CpAccountGroupByOutputType = {
    id: string
    accountId: string
    providerId: string
    userId: string
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    expiresAt: Date | null
    password: string | null
    createdAt: Date
    updatedAt: Date
    _count: CpAccountCountAggregateOutputType | null
    _min: CpAccountMinAggregateOutputType | null
    _max: CpAccountMaxAggregateOutputType | null
  }

  type GetCpAccountGroupByPayload<T extends CpAccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CpAccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CpAccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CpAccountGroupByOutputType[P]>
            : GetScalarType<T[P], CpAccountGroupByOutputType[P]>
        }
      >
    >


  export type CpAccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    expiresAt?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | CpUserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cpAccount"]>

  export type CpAccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    expiresAt?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | CpUserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cpAccount"]>

  export type CpAccountSelectScalar = {
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    expiresAt?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CpAccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | CpUserDefaultArgs<ExtArgs>
  }
  export type CpAccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | CpUserDefaultArgs<ExtArgs>
  }

  export type $CpAccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CpAccount"
    objects: {
      user: Prisma.$CpUserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      accountId: string
      providerId: string
      userId: string
      accessToken: string | null
      refreshToken: string | null
      idToken: string | null
      expiresAt: Date | null
      password: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["cpAccount"]>
    composites: {}
  }

  type CpAccountGetPayload<S extends boolean | null | undefined | CpAccountDefaultArgs> = $Result.GetResult<Prisma.$CpAccountPayload, S>

  type CpAccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CpAccountFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CpAccountCountAggregateInputType | true
    }

  export interface CpAccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CpAccount'], meta: { name: 'CpAccount' } }
    /**
     * Find zero or one CpAccount that matches the filter.
     * @param {CpAccountFindUniqueArgs} args - Arguments to find a CpAccount
     * @example
     * // Get one CpAccount
     * const cpAccount = await prisma.cpAccount.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CpAccountFindUniqueArgs>(args: SelectSubset<T, CpAccountFindUniqueArgs<ExtArgs>>): Prisma__CpAccountClient<$Result.GetResult<Prisma.$CpAccountPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CpAccount that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CpAccountFindUniqueOrThrowArgs} args - Arguments to find a CpAccount
     * @example
     * // Get one CpAccount
     * const cpAccount = await prisma.cpAccount.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CpAccountFindUniqueOrThrowArgs>(args: SelectSubset<T, CpAccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CpAccountClient<$Result.GetResult<Prisma.$CpAccountPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CpAccount that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpAccountFindFirstArgs} args - Arguments to find a CpAccount
     * @example
     * // Get one CpAccount
     * const cpAccount = await prisma.cpAccount.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CpAccountFindFirstArgs>(args?: SelectSubset<T, CpAccountFindFirstArgs<ExtArgs>>): Prisma__CpAccountClient<$Result.GetResult<Prisma.$CpAccountPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CpAccount that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpAccountFindFirstOrThrowArgs} args - Arguments to find a CpAccount
     * @example
     * // Get one CpAccount
     * const cpAccount = await prisma.cpAccount.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CpAccountFindFirstOrThrowArgs>(args?: SelectSubset<T, CpAccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__CpAccountClient<$Result.GetResult<Prisma.$CpAccountPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CpAccounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpAccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CpAccounts
     * const cpAccounts = await prisma.cpAccount.findMany()
     * 
     * // Get first 10 CpAccounts
     * const cpAccounts = await prisma.cpAccount.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cpAccountWithIdOnly = await prisma.cpAccount.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CpAccountFindManyArgs>(args?: SelectSubset<T, CpAccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CpAccountPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CpAccount.
     * @param {CpAccountCreateArgs} args - Arguments to create a CpAccount.
     * @example
     * // Create one CpAccount
     * const CpAccount = await prisma.cpAccount.create({
     *   data: {
     *     // ... data to create a CpAccount
     *   }
     * })
     * 
     */
    create<T extends CpAccountCreateArgs>(args: SelectSubset<T, CpAccountCreateArgs<ExtArgs>>): Prisma__CpAccountClient<$Result.GetResult<Prisma.$CpAccountPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CpAccounts.
     * @param {CpAccountCreateManyArgs} args - Arguments to create many CpAccounts.
     * @example
     * // Create many CpAccounts
     * const cpAccount = await prisma.cpAccount.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CpAccountCreateManyArgs>(args?: SelectSubset<T, CpAccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CpAccounts and returns the data saved in the database.
     * @param {CpAccountCreateManyAndReturnArgs} args - Arguments to create many CpAccounts.
     * @example
     * // Create many CpAccounts
     * const cpAccount = await prisma.cpAccount.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CpAccounts and only return the `id`
     * const cpAccountWithIdOnly = await prisma.cpAccount.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CpAccountCreateManyAndReturnArgs>(args?: SelectSubset<T, CpAccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CpAccountPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a CpAccount.
     * @param {CpAccountDeleteArgs} args - Arguments to delete one CpAccount.
     * @example
     * // Delete one CpAccount
     * const CpAccount = await prisma.cpAccount.delete({
     *   where: {
     *     // ... filter to delete one CpAccount
     *   }
     * })
     * 
     */
    delete<T extends CpAccountDeleteArgs>(args: SelectSubset<T, CpAccountDeleteArgs<ExtArgs>>): Prisma__CpAccountClient<$Result.GetResult<Prisma.$CpAccountPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CpAccount.
     * @param {CpAccountUpdateArgs} args - Arguments to update one CpAccount.
     * @example
     * // Update one CpAccount
     * const cpAccount = await prisma.cpAccount.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CpAccountUpdateArgs>(args: SelectSubset<T, CpAccountUpdateArgs<ExtArgs>>): Prisma__CpAccountClient<$Result.GetResult<Prisma.$CpAccountPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CpAccounts.
     * @param {CpAccountDeleteManyArgs} args - Arguments to filter CpAccounts to delete.
     * @example
     * // Delete a few CpAccounts
     * const { count } = await prisma.cpAccount.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CpAccountDeleteManyArgs>(args?: SelectSubset<T, CpAccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CpAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpAccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CpAccounts
     * const cpAccount = await prisma.cpAccount.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CpAccountUpdateManyArgs>(args: SelectSubset<T, CpAccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CpAccount.
     * @param {CpAccountUpsertArgs} args - Arguments to update or create a CpAccount.
     * @example
     * // Update or create a CpAccount
     * const cpAccount = await prisma.cpAccount.upsert({
     *   create: {
     *     // ... data to create a CpAccount
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CpAccount we want to update
     *   }
     * })
     */
    upsert<T extends CpAccountUpsertArgs>(args: SelectSubset<T, CpAccountUpsertArgs<ExtArgs>>): Prisma__CpAccountClient<$Result.GetResult<Prisma.$CpAccountPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CpAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpAccountCountArgs} args - Arguments to filter CpAccounts to count.
     * @example
     * // Count the number of CpAccounts
     * const count = await prisma.cpAccount.count({
     *   where: {
     *     // ... the filter for the CpAccounts we want to count
     *   }
     * })
    **/
    count<T extends CpAccountCountArgs>(
      args?: Subset<T, CpAccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CpAccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CpAccount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpAccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CpAccountAggregateArgs>(args: Subset<T, CpAccountAggregateArgs>): Prisma.PrismaPromise<GetCpAccountAggregateType<T>>

    /**
     * Group by CpAccount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpAccountGroupByArgs} args - Group by arguments.
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
      T extends CpAccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CpAccountGroupByArgs['orderBy'] }
        : { orderBy?: CpAccountGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CpAccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCpAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CpAccount model
   */
  readonly fields: CpAccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CpAccount.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CpAccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends CpUserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CpUserDefaultArgs<ExtArgs>>): Prisma__CpUserClient<$Result.GetResult<Prisma.$CpUserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the CpAccount model
   */ 
  interface CpAccountFieldRefs {
    readonly id: FieldRef<"CpAccount", 'String'>
    readonly accountId: FieldRef<"CpAccount", 'String'>
    readonly providerId: FieldRef<"CpAccount", 'String'>
    readonly userId: FieldRef<"CpAccount", 'String'>
    readonly accessToken: FieldRef<"CpAccount", 'String'>
    readonly refreshToken: FieldRef<"CpAccount", 'String'>
    readonly idToken: FieldRef<"CpAccount", 'String'>
    readonly expiresAt: FieldRef<"CpAccount", 'DateTime'>
    readonly password: FieldRef<"CpAccount", 'String'>
    readonly createdAt: FieldRef<"CpAccount", 'DateTime'>
    readonly updatedAt: FieldRef<"CpAccount", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CpAccount findUnique
   */
  export type CpAccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpAccount
     */
    select?: CpAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpAccountInclude<ExtArgs> | null
    /**
     * Filter, which CpAccount to fetch.
     */
    where: CpAccountWhereUniqueInput
  }

  /**
   * CpAccount findUniqueOrThrow
   */
  export type CpAccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpAccount
     */
    select?: CpAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpAccountInclude<ExtArgs> | null
    /**
     * Filter, which CpAccount to fetch.
     */
    where: CpAccountWhereUniqueInput
  }

  /**
   * CpAccount findFirst
   */
  export type CpAccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpAccount
     */
    select?: CpAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpAccountInclude<ExtArgs> | null
    /**
     * Filter, which CpAccount to fetch.
     */
    where?: CpAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CpAccounts to fetch.
     */
    orderBy?: CpAccountOrderByWithRelationInput | CpAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CpAccounts.
     */
    cursor?: CpAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CpAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CpAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CpAccounts.
     */
    distinct?: CpAccountScalarFieldEnum | CpAccountScalarFieldEnum[]
  }

  /**
   * CpAccount findFirstOrThrow
   */
  export type CpAccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpAccount
     */
    select?: CpAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpAccountInclude<ExtArgs> | null
    /**
     * Filter, which CpAccount to fetch.
     */
    where?: CpAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CpAccounts to fetch.
     */
    orderBy?: CpAccountOrderByWithRelationInput | CpAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CpAccounts.
     */
    cursor?: CpAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CpAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CpAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CpAccounts.
     */
    distinct?: CpAccountScalarFieldEnum | CpAccountScalarFieldEnum[]
  }

  /**
   * CpAccount findMany
   */
  export type CpAccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpAccount
     */
    select?: CpAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpAccountInclude<ExtArgs> | null
    /**
     * Filter, which CpAccounts to fetch.
     */
    where?: CpAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CpAccounts to fetch.
     */
    orderBy?: CpAccountOrderByWithRelationInput | CpAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CpAccounts.
     */
    cursor?: CpAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CpAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CpAccounts.
     */
    skip?: number
    distinct?: CpAccountScalarFieldEnum | CpAccountScalarFieldEnum[]
  }

  /**
   * CpAccount create
   */
  export type CpAccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpAccount
     */
    select?: CpAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpAccountInclude<ExtArgs> | null
    /**
     * The data needed to create a CpAccount.
     */
    data: XOR<CpAccountCreateInput, CpAccountUncheckedCreateInput>
  }

  /**
   * CpAccount createMany
   */
  export type CpAccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CpAccounts.
     */
    data: CpAccountCreateManyInput | CpAccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CpAccount createManyAndReturn
   */
  export type CpAccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpAccount
     */
    select?: CpAccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many CpAccounts.
     */
    data: CpAccountCreateManyInput | CpAccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpAccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CpAccount update
   */
  export type CpAccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpAccount
     */
    select?: CpAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpAccountInclude<ExtArgs> | null
    /**
     * The data needed to update a CpAccount.
     */
    data: XOR<CpAccountUpdateInput, CpAccountUncheckedUpdateInput>
    /**
     * Choose, which CpAccount to update.
     */
    where: CpAccountWhereUniqueInput
  }

  /**
   * CpAccount updateMany
   */
  export type CpAccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CpAccounts.
     */
    data: XOR<CpAccountUpdateManyMutationInput, CpAccountUncheckedUpdateManyInput>
    /**
     * Filter which CpAccounts to update
     */
    where?: CpAccountWhereInput
  }

  /**
   * CpAccount upsert
   */
  export type CpAccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpAccount
     */
    select?: CpAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpAccountInclude<ExtArgs> | null
    /**
     * The filter to search for the CpAccount to update in case it exists.
     */
    where: CpAccountWhereUniqueInput
    /**
     * In case the CpAccount found by the `where` argument doesn't exist, create a new CpAccount with this data.
     */
    create: XOR<CpAccountCreateInput, CpAccountUncheckedCreateInput>
    /**
     * In case the CpAccount was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CpAccountUpdateInput, CpAccountUncheckedUpdateInput>
  }

  /**
   * CpAccount delete
   */
  export type CpAccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpAccount
     */
    select?: CpAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpAccountInclude<ExtArgs> | null
    /**
     * Filter which CpAccount to delete.
     */
    where: CpAccountWhereUniqueInput
  }

  /**
   * CpAccount deleteMany
   */
  export type CpAccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CpAccounts to delete
     */
    where?: CpAccountWhereInput
  }

  /**
   * CpAccount without action
   */
  export type CpAccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpAccount
     */
    select?: CpAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpAccountInclude<ExtArgs> | null
  }


  /**
   * Model CpVerification
   */

  export type AggregateCpVerification = {
    _count: CpVerificationCountAggregateOutputType | null
    _min: CpVerificationMinAggregateOutputType | null
    _max: CpVerificationMaxAggregateOutputType | null
  }

  export type CpVerificationMinAggregateOutputType = {
    id: string | null
    identifier: string | null
    value: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CpVerificationMaxAggregateOutputType = {
    id: string | null
    identifier: string | null
    value: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CpVerificationCountAggregateOutputType = {
    id: number
    identifier: number
    value: number
    expiresAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CpVerificationMinAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CpVerificationMaxAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CpVerificationCountAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CpVerificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CpVerification to aggregate.
     */
    where?: CpVerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CpVerifications to fetch.
     */
    orderBy?: CpVerificationOrderByWithRelationInput | CpVerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CpVerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CpVerifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CpVerifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CpVerifications
    **/
    _count?: true | CpVerificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CpVerificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CpVerificationMaxAggregateInputType
  }

  export type GetCpVerificationAggregateType<T extends CpVerificationAggregateArgs> = {
        [P in keyof T & keyof AggregateCpVerification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCpVerification[P]>
      : GetScalarType<T[P], AggregateCpVerification[P]>
  }




  export type CpVerificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CpVerificationWhereInput
    orderBy?: CpVerificationOrderByWithAggregationInput | CpVerificationOrderByWithAggregationInput[]
    by: CpVerificationScalarFieldEnum[] | CpVerificationScalarFieldEnum
    having?: CpVerificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CpVerificationCountAggregateInputType | true
    _min?: CpVerificationMinAggregateInputType
    _max?: CpVerificationMaxAggregateInputType
  }

  export type CpVerificationGroupByOutputType = {
    id: string
    identifier: string
    value: string
    expiresAt: Date
    createdAt: Date | null
    updatedAt: Date | null
    _count: CpVerificationCountAggregateOutputType | null
    _min: CpVerificationMinAggregateOutputType | null
    _max: CpVerificationMaxAggregateOutputType | null
  }

  type GetCpVerificationGroupByPayload<T extends CpVerificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CpVerificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CpVerificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CpVerificationGroupByOutputType[P]>
            : GetScalarType<T[P], CpVerificationGroupByOutputType[P]>
        }
      >
    >


  export type CpVerificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["cpVerification"]>

  export type CpVerificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["cpVerification"]>

  export type CpVerificationSelectScalar = {
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $CpVerificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CpVerification"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      identifier: string
      value: string
      expiresAt: Date
      createdAt: Date | null
      updatedAt: Date | null
    }, ExtArgs["result"]["cpVerification"]>
    composites: {}
  }

  type CpVerificationGetPayload<S extends boolean | null | undefined | CpVerificationDefaultArgs> = $Result.GetResult<Prisma.$CpVerificationPayload, S>

  type CpVerificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CpVerificationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CpVerificationCountAggregateInputType | true
    }

  export interface CpVerificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CpVerification'], meta: { name: 'CpVerification' } }
    /**
     * Find zero or one CpVerification that matches the filter.
     * @param {CpVerificationFindUniqueArgs} args - Arguments to find a CpVerification
     * @example
     * // Get one CpVerification
     * const cpVerification = await prisma.cpVerification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CpVerificationFindUniqueArgs>(args: SelectSubset<T, CpVerificationFindUniqueArgs<ExtArgs>>): Prisma__CpVerificationClient<$Result.GetResult<Prisma.$CpVerificationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CpVerification that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CpVerificationFindUniqueOrThrowArgs} args - Arguments to find a CpVerification
     * @example
     * // Get one CpVerification
     * const cpVerification = await prisma.cpVerification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CpVerificationFindUniqueOrThrowArgs>(args: SelectSubset<T, CpVerificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CpVerificationClient<$Result.GetResult<Prisma.$CpVerificationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CpVerification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpVerificationFindFirstArgs} args - Arguments to find a CpVerification
     * @example
     * // Get one CpVerification
     * const cpVerification = await prisma.cpVerification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CpVerificationFindFirstArgs>(args?: SelectSubset<T, CpVerificationFindFirstArgs<ExtArgs>>): Prisma__CpVerificationClient<$Result.GetResult<Prisma.$CpVerificationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CpVerification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpVerificationFindFirstOrThrowArgs} args - Arguments to find a CpVerification
     * @example
     * // Get one CpVerification
     * const cpVerification = await prisma.cpVerification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CpVerificationFindFirstOrThrowArgs>(args?: SelectSubset<T, CpVerificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__CpVerificationClient<$Result.GetResult<Prisma.$CpVerificationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CpVerifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpVerificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CpVerifications
     * const cpVerifications = await prisma.cpVerification.findMany()
     * 
     * // Get first 10 CpVerifications
     * const cpVerifications = await prisma.cpVerification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cpVerificationWithIdOnly = await prisma.cpVerification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CpVerificationFindManyArgs>(args?: SelectSubset<T, CpVerificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CpVerificationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CpVerification.
     * @param {CpVerificationCreateArgs} args - Arguments to create a CpVerification.
     * @example
     * // Create one CpVerification
     * const CpVerification = await prisma.cpVerification.create({
     *   data: {
     *     // ... data to create a CpVerification
     *   }
     * })
     * 
     */
    create<T extends CpVerificationCreateArgs>(args: SelectSubset<T, CpVerificationCreateArgs<ExtArgs>>): Prisma__CpVerificationClient<$Result.GetResult<Prisma.$CpVerificationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CpVerifications.
     * @param {CpVerificationCreateManyArgs} args - Arguments to create many CpVerifications.
     * @example
     * // Create many CpVerifications
     * const cpVerification = await prisma.cpVerification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CpVerificationCreateManyArgs>(args?: SelectSubset<T, CpVerificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CpVerifications and returns the data saved in the database.
     * @param {CpVerificationCreateManyAndReturnArgs} args - Arguments to create many CpVerifications.
     * @example
     * // Create many CpVerifications
     * const cpVerification = await prisma.cpVerification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CpVerifications and only return the `id`
     * const cpVerificationWithIdOnly = await prisma.cpVerification.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CpVerificationCreateManyAndReturnArgs>(args?: SelectSubset<T, CpVerificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CpVerificationPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a CpVerification.
     * @param {CpVerificationDeleteArgs} args - Arguments to delete one CpVerification.
     * @example
     * // Delete one CpVerification
     * const CpVerification = await prisma.cpVerification.delete({
     *   where: {
     *     // ... filter to delete one CpVerification
     *   }
     * })
     * 
     */
    delete<T extends CpVerificationDeleteArgs>(args: SelectSubset<T, CpVerificationDeleteArgs<ExtArgs>>): Prisma__CpVerificationClient<$Result.GetResult<Prisma.$CpVerificationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CpVerification.
     * @param {CpVerificationUpdateArgs} args - Arguments to update one CpVerification.
     * @example
     * // Update one CpVerification
     * const cpVerification = await prisma.cpVerification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CpVerificationUpdateArgs>(args: SelectSubset<T, CpVerificationUpdateArgs<ExtArgs>>): Prisma__CpVerificationClient<$Result.GetResult<Prisma.$CpVerificationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CpVerifications.
     * @param {CpVerificationDeleteManyArgs} args - Arguments to filter CpVerifications to delete.
     * @example
     * // Delete a few CpVerifications
     * const { count } = await prisma.cpVerification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CpVerificationDeleteManyArgs>(args?: SelectSubset<T, CpVerificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CpVerifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpVerificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CpVerifications
     * const cpVerification = await prisma.cpVerification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CpVerificationUpdateManyArgs>(args: SelectSubset<T, CpVerificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CpVerification.
     * @param {CpVerificationUpsertArgs} args - Arguments to update or create a CpVerification.
     * @example
     * // Update or create a CpVerification
     * const cpVerification = await prisma.cpVerification.upsert({
     *   create: {
     *     // ... data to create a CpVerification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CpVerification we want to update
     *   }
     * })
     */
    upsert<T extends CpVerificationUpsertArgs>(args: SelectSubset<T, CpVerificationUpsertArgs<ExtArgs>>): Prisma__CpVerificationClient<$Result.GetResult<Prisma.$CpVerificationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CpVerifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpVerificationCountArgs} args - Arguments to filter CpVerifications to count.
     * @example
     * // Count the number of CpVerifications
     * const count = await prisma.cpVerification.count({
     *   where: {
     *     // ... the filter for the CpVerifications we want to count
     *   }
     * })
    **/
    count<T extends CpVerificationCountArgs>(
      args?: Subset<T, CpVerificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CpVerificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CpVerification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpVerificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CpVerificationAggregateArgs>(args: Subset<T, CpVerificationAggregateArgs>): Prisma.PrismaPromise<GetCpVerificationAggregateType<T>>

    /**
     * Group by CpVerification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpVerificationGroupByArgs} args - Group by arguments.
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
      T extends CpVerificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CpVerificationGroupByArgs['orderBy'] }
        : { orderBy?: CpVerificationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CpVerificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCpVerificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CpVerification model
   */
  readonly fields: CpVerificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CpVerification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CpVerificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the CpVerification model
   */ 
  interface CpVerificationFieldRefs {
    readonly id: FieldRef<"CpVerification", 'String'>
    readonly identifier: FieldRef<"CpVerification", 'String'>
    readonly value: FieldRef<"CpVerification", 'String'>
    readonly expiresAt: FieldRef<"CpVerification", 'DateTime'>
    readonly createdAt: FieldRef<"CpVerification", 'DateTime'>
    readonly updatedAt: FieldRef<"CpVerification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CpVerification findUnique
   */
  export type CpVerificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpVerification
     */
    select?: CpVerificationSelect<ExtArgs> | null
    /**
     * Filter, which CpVerification to fetch.
     */
    where: CpVerificationWhereUniqueInput
  }

  /**
   * CpVerification findUniqueOrThrow
   */
  export type CpVerificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpVerification
     */
    select?: CpVerificationSelect<ExtArgs> | null
    /**
     * Filter, which CpVerification to fetch.
     */
    where: CpVerificationWhereUniqueInput
  }

  /**
   * CpVerification findFirst
   */
  export type CpVerificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpVerification
     */
    select?: CpVerificationSelect<ExtArgs> | null
    /**
     * Filter, which CpVerification to fetch.
     */
    where?: CpVerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CpVerifications to fetch.
     */
    orderBy?: CpVerificationOrderByWithRelationInput | CpVerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CpVerifications.
     */
    cursor?: CpVerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CpVerifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CpVerifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CpVerifications.
     */
    distinct?: CpVerificationScalarFieldEnum | CpVerificationScalarFieldEnum[]
  }

  /**
   * CpVerification findFirstOrThrow
   */
  export type CpVerificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpVerification
     */
    select?: CpVerificationSelect<ExtArgs> | null
    /**
     * Filter, which CpVerification to fetch.
     */
    where?: CpVerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CpVerifications to fetch.
     */
    orderBy?: CpVerificationOrderByWithRelationInput | CpVerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CpVerifications.
     */
    cursor?: CpVerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CpVerifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CpVerifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CpVerifications.
     */
    distinct?: CpVerificationScalarFieldEnum | CpVerificationScalarFieldEnum[]
  }

  /**
   * CpVerification findMany
   */
  export type CpVerificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpVerification
     */
    select?: CpVerificationSelect<ExtArgs> | null
    /**
     * Filter, which CpVerifications to fetch.
     */
    where?: CpVerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CpVerifications to fetch.
     */
    orderBy?: CpVerificationOrderByWithRelationInput | CpVerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CpVerifications.
     */
    cursor?: CpVerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CpVerifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CpVerifications.
     */
    skip?: number
    distinct?: CpVerificationScalarFieldEnum | CpVerificationScalarFieldEnum[]
  }

  /**
   * CpVerification create
   */
  export type CpVerificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpVerification
     */
    select?: CpVerificationSelect<ExtArgs> | null
    /**
     * The data needed to create a CpVerification.
     */
    data: XOR<CpVerificationCreateInput, CpVerificationUncheckedCreateInput>
  }

  /**
   * CpVerification createMany
   */
  export type CpVerificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CpVerifications.
     */
    data: CpVerificationCreateManyInput | CpVerificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CpVerification createManyAndReturn
   */
  export type CpVerificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpVerification
     */
    select?: CpVerificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many CpVerifications.
     */
    data: CpVerificationCreateManyInput | CpVerificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CpVerification update
   */
  export type CpVerificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpVerification
     */
    select?: CpVerificationSelect<ExtArgs> | null
    /**
     * The data needed to update a CpVerification.
     */
    data: XOR<CpVerificationUpdateInput, CpVerificationUncheckedUpdateInput>
    /**
     * Choose, which CpVerification to update.
     */
    where: CpVerificationWhereUniqueInput
  }

  /**
   * CpVerification updateMany
   */
  export type CpVerificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CpVerifications.
     */
    data: XOR<CpVerificationUpdateManyMutationInput, CpVerificationUncheckedUpdateManyInput>
    /**
     * Filter which CpVerifications to update
     */
    where?: CpVerificationWhereInput
  }

  /**
   * CpVerification upsert
   */
  export type CpVerificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpVerification
     */
    select?: CpVerificationSelect<ExtArgs> | null
    /**
     * The filter to search for the CpVerification to update in case it exists.
     */
    where: CpVerificationWhereUniqueInput
    /**
     * In case the CpVerification found by the `where` argument doesn't exist, create a new CpVerification with this data.
     */
    create: XOR<CpVerificationCreateInput, CpVerificationUncheckedCreateInput>
    /**
     * In case the CpVerification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CpVerificationUpdateInput, CpVerificationUncheckedUpdateInput>
  }

  /**
   * CpVerification delete
   */
  export type CpVerificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpVerification
     */
    select?: CpVerificationSelect<ExtArgs> | null
    /**
     * Filter which CpVerification to delete.
     */
    where: CpVerificationWhereUniqueInput
  }

  /**
   * CpVerification deleteMany
   */
  export type CpVerificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CpVerifications to delete
     */
    where?: CpVerificationWhereInput
  }

  /**
   * CpVerification without action
   */
  export type CpVerificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpVerification
     */
    select?: CpVerificationSelect<ExtArgs> | null
  }


  /**
   * Model CpPatientIndex
   */

  export type AggregateCpPatientIndex = {
    _count: CpPatientIndexCountAggregateOutputType | null
    _min: CpPatientIndexMinAggregateOutputType | null
    _max: CpPatientIndexMaxAggregateOutputType | null
  }

  export type CpPatientIndexMinAggregateOutputType = {
    id: string | null
    patientPin: string | null
    firstName: string | null
    lastName: string | null
    birthDate: Date | null
    sex: string | null
    orgId: string | null
    orgSlug: string | null
    createdAt: Date | null
  }

  export type CpPatientIndexMaxAggregateOutputType = {
    id: string | null
    patientPin: string | null
    firstName: string | null
    lastName: string | null
    birthDate: Date | null
    sex: string | null
    orgId: string | null
    orgSlug: string | null
    createdAt: Date | null
  }

  export type CpPatientIndexCountAggregateOutputType = {
    id: number
    patientPin: number
    firstName: number
    lastName: number
    birthDate: number
    sex: number
    orgId: number
    orgSlug: number
    createdAt: number
    _all: number
  }


  export type CpPatientIndexMinAggregateInputType = {
    id?: true
    patientPin?: true
    firstName?: true
    lastName?: true
    birthDate?: true
    sex?: true
    orgId?: true
    orgSlug?: true
    createdAt?: true
  }

  export type CpPatientIndexMaxAggregateInputType = {
    id?: true
    patientPin?: true
    firstName?: true
    lastName?: true
    birthDate?: true
    sex?: true
    orgId?: true
    orgSlug?: true
    createdAt?: true
  }

  export type CpPatientIndexCountAggregateInputType = {
    id?: true
    patientPin?: true
    firstName?: true
    lastName?: true
    birthDate?: true
    sex?: true
    orgId?: true
    orgSlug?: true
    createdAt?: true
    _all?: true
  }

  export type CpPatientIndexAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CpPatientIndex to aggregate.
     */
    where?: CpPatientIndexWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CpPatientIndices to fetch.
     */
    orderBy?: CpPatientIndexOrderByWithRelationInput | CpPatientIndexOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CpPatientIndexWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CpPatientIndices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CpPatientIndices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CpPatientIndices
    **/
    _count?: true | CpPatientIndexCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CpPatientIndexMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CpPatientIndexMaxAggregateInputType
  }

  export type GetCpPatientIndexAggregateType<T extends CpPatientIndexAggregateArgs> = {
        [P in keyof T & keyof AggregateCpPatientIndex]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCpPatientIndex[P]>
      : GetScalarType<T[P], AggregateCpPatientIndex[P]>
  }




  export type CpPatientIndexGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CpPatientIndexWhereInput
    orderBy?: CpPatientIndexOrderByWithAggregationInput | CpPatientIndexOrderByWithAggregationInput[]
    by: CpPatientIndexScalarFieldEnum[] | CpPatientIndexScalarFieldEnum
    having?: CpPatientIndexScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CpPatientIndexCountAggregateInputType | true
    _min?: CpPatientIndexMinAggregateInputType
    _max?: CpPatientIndexMaxAggregateInputType
  }

  export type CpPatientIndexGroupByOutputType = {
    id: string
    patientPin: string
    firstName: string
    lastName: string
    birthDate: Date
    sex: string
    orgId: string
    orgSlug: string
    createdAt: Date
    _count: CpPatientIndexCountAggregateOutputType | null
    _min: CpPatientIndexMinAggregateOutputType | null
    _max: CpPatientIndexMaxAggregateOutputType | null
  }

  type GetCpPatientIndexGroupByPayload<T extends CpPatientIndexGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CpPatientIndexGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CpPatientIndexGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CpPatientIndexGroupByOutputType[P]>
            : GetScalarType<T[P], CpPatientIndexGroupByOutputType[P]>
        }
      >
    >


  export type CpPatientIndexSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patientPin?: boolean
    firstName?: boolean
    lastName?: boolean
    birthDate?: boolean
    sex?: boolean
    orgId?: boolean
    orgSlug?: boolean
    createdAt?: boolean
    organization?: boolean | CpOrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cpPatientIndex"]>

  export type CpPatientIndexSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patientPin?: boolean
    firstName?: boolean
    lastName?: boolean
    birthDate?: boolean
    sex?: boolean
    orgId?: boolean
    orgSlug?: boolean
    createdAt?: boolean
    organization?: boolean | CpOrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cpPatientIndex"]>

  export type CpPatientIndexSelectScalar = {
    id?: boolean
    patientPin?: boolean
    firstName?: boolean
    lastName?: boolean
    birthDate?: boolean
    sex?: boolean
    orgId?: boolean
    orgSlug?: boolean
    createdAt?: boolean
  }

  export type CpPatientIndexInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | CpOrganizationDefaultArgs<ExtArgs>
  }
  export type CpPatientIndexIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | CpOrganizationDefaultArgs<ExtArgs>
  }

  export type $CpPatientIndexPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CpPatientIndex"
    objects: {
      organization: Prisma.$CpOrganizationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      patientPin: string
      firstName: string
      lastName: string
      birthDate: Date
      sex: string
      orgId: string
      orgSlug: string
      createdAt: Date
    }, ExtArgs["result"]["cpPatientIndex"]>
    composites: {}
  }

  type CpPatientIndexGetPayload<S extends boolean | null | undefined | CpPatientIndexDefaultArgs> = $Result.GetResult<Prisma.$CpPatientIndexPayload, S>

  type CpPatientIndexCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CpPatientIndexFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CpPatientIndexCountAggregateInputType | true
    }

  export interface CpPatientIndexDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CpPatientIndex'], meta: { name: 'CpPatientIndex' } }
    /**
     * Find zero or one CpPatientIndex that matches the filter.
     * @param {CpPatientIndexFindUniqueArgs} args - Arguments to find a CpPatientIndex
     * @example
     * // Get one CpPatientIndex
     * const cpPatientIndex = await prisma.cpPatientIndex.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CpPatientIndexFindUniqueArgs>(args: SelectSubset<T, CpPatientIndexFindUniqueArgs<ExtArgs>>): Prisma__CpPatientIndexClient<$Result.GetResult<Prisma.$CpPatientIndexPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CpPatientIndex that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CpPatientIndexFindUniqueOrThrowArgs} args - Arguments to find a CpPatientIndex
     * @example
     * // Get one CpPatientIndex
     * const cpPatientIndex = await prisma.cpPatientIndex.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CpPatientIndexFindUniqueOrThrowArgs>(args: SelectSubset<T, CpPatientIndexFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CpPatientIndexClient<$Result.GetResult<Prisma.$CpPatientIndexPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CpPatientIndex that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpPatientIndexFindFirstArgs} args - Arguments to find a CpPatientIndex
     * @example
     * // Get one CpPatientIndex
     * const cpPatientIndex = await prisma.cpPatientIndex.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CpPatientIndexFindFirstArgs>(args?: SelectSubset<T, CpPatientIndexFindFirstArgs<ExtArgs>>): Prisma__CpPatientIndexClient<$Result.GetResult<Prisma.$CpPatientIndexPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CpPatientIndex that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpPatientIndexFindFirstOrThrowArgs} args - Arguments to find a CpPatientIndex
     * @example
     * // Get one CpPatientIndex
     * const cpPatientIndex = await prisma.cpPatientIndex.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CpPatientIndexFindFirstOrThrowArgs>(args?: SelectSubset<T, CpPatientIndexFindFirstOrThrowArgs<ExtArgs>>): Prisma__CpPatientIndexClient<$Result.GetResult<Prisma.$CpPatientIndexPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CpPatientIndices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpPatientIndexFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CpPatientIndices
     * const cpPatientIndices = await prisma.cpPatientIndex.findMany()
     * 
     * // Get first 10 CpPatientIndices
     * const cpPatientIndices = await prisma.cpPatientIndex.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cpPatientIndexWithIdOnly = await prisma.cpPatientIndex.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CpPatientIndexFindManyArgs>(args?: SelectSubset<T, CpPatientIndexFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CpPatientIndexPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CpPatientIndex.
     * @param {CpPatientIndexCreateArgs} args - Arguments to create a CpPatientIndex.
     * @example
     * // Create one CpPatientIndex
     * const CpPatientIndex = await prisma.cpPatientIndex.create({
     *   data: {
     *     // ... data to create a CpPatientIndex
     *   }
     * })
     * 
     */
    create<T extends CpPatientIndexCreateArgs>(args: SelectSubset<T, CpPatientIndexCreateArgs<ExtArgs>>): Prisma__CpPatientIndexClient<$Result.GetResult<Prisma.$CpPatientIndexPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CpPatientIndices.
     * @param {CpPatientIndexCreateManyArgs} args - Arguments to create many CpPatientIndices.
     * @example
     * // Create many CpPatientIndices
     * const cpPatientIndex = await prisma.cpPatientIndex.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CpPatientIndexCreateManyArgs>(args?: SelectSubset<T, CpPatientIndexCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CpPatientIndices and returns the data saved in the database.
     * @param {CpPatientIndexCreateManyAndReturnArgs} args - Arguments to create many CpPatientIndices.
     * @example
     * // Create many CpPatientIndices
     * const cpPatientIndex = await prisma.cpPatientIndex.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CpPatientIndices and only return the `id`
     * const cpPatientIndexWithIdOnly = await prisma.cpPatientIndex.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CpPatientIndexCreateManyAndReturnArgs>(args?: SelectSubset<T, CpPatientIndexCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CpPatientIndexPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a CpPatientIndex.
     * @param {CpPatientIndexDeleteArgs} args - Arguments to delete one CpPatientIndex.
     * @example
     * // Delete one CpPatientIndex
     * const CpPatientIndex = await prisma.cpPatientIndex.delete({
     *   where: {
     *     // ... filter to delete one CpPatientIndex
     *   }
     * })
     * 
     */
    delete<T extends CpPatientIndexDeleteArgs>(args: SelectSubset<T, CpPatientIndexDeleteArgs<ExtArgs>>): Prisma__CpPatientIndexClient<$Result.GetResult<Prisma.$CpPatientIndexPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CpPatientIndex.
     * @param {CpPatientIndexUpdateArgs} args - Arguments to update one CpPatientIndex.
     * @example
     * // Update one CpPatientIndex
     * const cpPatientIndex = await prisma.cpPatientIndex.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CpPatientIndexUpdateArgs>(args: SelectSubset<T, CpPatientIndexUpdateArgs<ExtArgs>>): Prisma__CpPatientIndexClient<$Result.GetResult<Prisma.$CpPatientIndexPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CpPatientIndices.
     * @param {CpPatientIndexDeleteManyArgs} args - Arguments to filter CpPatientIndices to delete.
     * @example
     * // Delete a few CpPatientIndices
     * const { count } = await prisma.cpPatientIndex.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CpPatientIndexDeleteManyArgs>(args?: SelectSubset<T, CpPatientIndexDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CpPatientIndices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpPatientIndexUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CpPatientIndices
     * const cpPatientIndex = await prisma.cpPatientIndex.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CpPatientIndexUpdateManyArgs>(args: SelectSubset<T, CpPatientIndexUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CpPatientIndex.
     * @param {CpPatientIndexUpsertArgs} args - Arguments to update or create a CpPatientIndex.
     * @example
     * // Update or create a CpPatientIndex
     * const cpPatientIndex = await prisma.cpPatientIndex.upsert({
     *   create: {
     *     // ... data to create a CpPatientIndex
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CpPatientIndex we want to update
     *   }
     * })
     */
    upsert<T extends CpPatientIndexUpsertArgs>(args: SelectSubset<T, CpPatientIndexUpsertArgs<ExtArgs>>): Prisma__CpPatientIndexClient<$Result.GetResult<Prisma.$CpPatientIndexPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CpPatientIndices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpPatientIndexCountArgs} args - Arguments to filter CpPatientIndices to count.
     * @example
     * // Count the number of CpPatientIndices
     * const count = await prisma.cpPatientIndex.count({
     *   where: {
     *     // ... the filter for the CpPatientIndices we want to count
     *   }
     * })
    **/
    count<T extends CpPatientIndexCountArgs>(
      args?: Subset<T, CpPatientIndexCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CpPatientIndexCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CpPatientIndex.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpPatientIndexAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CpPatientIndexAggregateArgs>(args: Subset<T, CpPatientIndexAggregateArgs>): Prisma.PrismaPromise<GetCpPatientIndexAggregateType<T>>

    /**
     * Group by CpPatientIndex.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CpPatientIndexGroupByArgs} args - Group by arguments.
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
      T extends CpPatientIndexGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CpPatientIndexGroupByArgs['orderBy'] }
        : { orderBy?: CpPatientIndexGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CpPatientIndexGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCpPatientIndexGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CpPatientIndex model
   */
  readonly fields: CpPatientIndexFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CpPatientIndex.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CpPatientIndexClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organization<T extends CpOrganizationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CpOrganizationDefaultArgs<ExtArgs>>): Prisma__CpOrganizationClient<$Result.GetResult<Prisma.$CpOrganizationPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the CpPatientIndex model
   */ 
  interface CpPatientIndexFieldRefs {
    readonly id: FieldRef<"CpPatientIndex", 'String'>
    readonly patientPin: FieldRef<"CpPatientIndex", 'String'>
    readonly firstName: FieldRef<"CpPatientIndex", 'String'>
    readonly lastName: FieldRef<"CpPatientIndex", 'String'>
    readonly birthDate: FieldRef<"CpPatientIndex", 'DateTime'>
    readonly sex: FieldRef<"CpPatientIndex", 'String'>
    readonly orgId: FieldRef<"CpPatientIndex", 'String'>
    readonly orgSlug: FieldRef<"CpPatientIndex", 'String'>
    readonly createdAt: FieldRef<"CpPatientIndex", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CpPatientIndex findUnique
   */
  export type CpPatientIndexFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpPatientIndex
     */
    select?: CpPatientIndexSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpPatientIndexInclude<ExtArgs> | null
    /**
     * Filter, which CpPatientIndex to fetch.
     */
    where: CpPatientIndexWhereUniqueInput
  }

  /**
   * CpPatientIndex findUniqueOrThrow
   */
  export type CpPatientIndexFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpPatientIndex
     */
    select?: CpPatientIndexSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpPatientIndexInclude<ExtArgs> | null
    /**
     * Filter, which CpPatientIndex to fetch.
     */
    where: CpPatientIndexWhereUniqueInput
  }

  /**
   * CpPatientIndex findFirst
   */
  export type CpPatientIndexFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpPatientIndex
     */
    select?: CpPatientIndexSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpPatientIndexInclude<ExtArgs> | null
    /**
     * Filter, which CpPatientIndex to fetch.
     */
    where?: CpPatientIndexWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CpPatientIndices to fetch.
     */
    orderBy?: CpPatientIndexOrderByWithRelationInput | CpPatientIndexOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CpPatientIndices.
     */
    cursor?: CpPatientIndexWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CpPatientIndices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CpPatientIndices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CpPatientIndices.
     */
    distinct?: CpPatientIndexScalarFieldEnum | CpPatientIndexScalarFieldEnum[]
  }

  /**
   * CpPatientIndex findFirstOrThrow
   */
  export type CpPatientIndexFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpPatientIndex
     */
    select?: CpPatientIndexSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpPatientIndexInclude<ExtArgs> | null
    /**
     * Filter, which CpPatientIndex to fetch.
     */
    where?: CpPatientIndexWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CpPatientIndices to fetch.
     */
    orderBy?: CpPatientIndexOrderByWithRelationInput | CpPatientIndexOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CpPatientIndices.
     */
    cursor?: CpPatientIndexWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CpPatientIndices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CpPatientIndices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CpPatientIndices.
     */
    distinct?: CpPatientIndexScalarFieldEnum | CpPatientIndexScalarFieldEnum[]
  }

  /**
   * CpPatientIndex findMany
   */
  export type CpPatientIndexFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpPatientIndex
     */
    select?: CpPatientIndexSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpPatientIndexInclude<ExtArgs> | null
    /**
     * Filter, which CpPatientIndices to fetch.
     */
    where?: CpPatientIndexWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CpPatientIndices to fetch.
     */
    orderBy?: CpPatientIndexOrderByWithRelationInput | CpPatientIndexOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CpPatientIndices.
     */
    cursor?: CpPatientIndexWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CpPatientIndices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CpPatientIndices.
     */
    skip?: number
    distinct?: CpPatientIndexScalarFieldEnum | CpPatientIndexScalarFieldEnum[]
  }

  /**
   * CpPatientIndex create
   */
  export type CpPatientIndexCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpPatientIndex
     */
    select?: CpPatientIndexSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpPatientIndexInclude<ExtArgs> | null
    /**
     * The data needed to create a CpPatientIndex.
     */
    data: XOR<CpPatientIndexCreateInput, CpPatientIndexUncheckedCreateInput>
  }

  /**
   * CpPatientIndex createMany
   */
  export type CpPatientIndexCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CpPatientIndices.
     */
    data: CpPatientIndexCreateManyInput | CpPatientIndexCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CpPatientIndex createManyAndReturn
   */
  export type CpPatientIndexCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpPatientIndex
     */
    select?: CpPatientIndexSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many CpPatientIndices.
     */
    data: CpPatientIndexCreateManyInput | CpPatientIndexCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpPatientIndexIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CpPatientIndex update
   */
  export type CpPatientIndexUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpPatientIndex
     */
    select?: CpPatientIndexSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpPatientIndexInclude<ExtArgs> | null
    /**
     * The data needed to update a CpPatientIndex.
     */
    data: XOR<CpPatientIndexUpdateInput, CpPatientIndexUncheckedUpdateInput>
    /**
     * Choose, which CpPatientIndex to update.
     */
    where: CpPatientIndexWhereUniqueInput
  }

  /**
   * CpPatientIndex updateMany
   */
  export type CpPatientIndexUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CpPatientIndices.
     */
    data: XOR<CpPatientIndexUpdateManyMutationInput, CpPatientIndexUncheckedUpdateManyInput>
    /**
     * Filter which CpPatientIndices to update
     */
    where?: CpPatientIndexWhereInput
  }

  /**
   * CpPatientIndex upsert
   */
  export type CpPatientIndexUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpPatientIndex
     */
    select?: CpPatientIndexSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpPatientIndexInclude<ExtArgs> | null
    /**
     * The filter to search for the CpPatientIndex to update in case it exists.
     */
    where: CpPatientIndexWhereUniqueInput
    /**
     * In case the CpPatientIndex found by the `where` argument doesn't exist, create a new CpPatientIndex with this data.
     */
    create: XOR<CpPatientIndexCreateInput, CpPatientIndexUncheckedCreateInput>
    /**
     * In case the CpPatientIndex was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CpPatientIndexUpdateInput, CpPatientIndexUncheckedUpdateInput>
  }

  /**
   * CpPatientIndex delete
   */
  export type CpPatientIndexDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpPatientIndex
     */
    select?: CpPatientIndexSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpPatientIndexInclude<ExtArgs> | null
    /**
     * Filter which CpPatientIndex to delete.
     */
    where: CpPatientIndexWhereUniqueInput
  }

  /**
   * CpPatientIndex deleteMany
   */
  export type CpPatientIndexDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CpPatientIndices to delete
     */
    where?: CpPatientIndexWhereInput
  }

  /**
   * CpPatientIndex without action
   */
  export type CpPatientIndexDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CpPatientIndex
     */
    select?: CpPatientIndexSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CpPatientIndexInclude<ExtArgs> | null
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


  export const CpOrganizationScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    type: 'type',
    status: 'status',
    billingEmail: 'billingEmail',
    billingPlan: 'billingPlan',
    stripeCustomerId: 'stripeCustomerId',
    stripeSubscriptionId: 'stripeSubscriptionId',
    maxStaffSeats: 'maxStaffSeats',
    maxPatientRecords: 'maxPatientRecords',
    maxStorageMb: 'maxStorageMb',
    customDomain: 'customDomain',
    customDomainStatus: 'customDomainStatus',
    dnsVerificationToken: 'dnsVerificationToken',
    sslStatus: 'sslStatus',
    primaryColor: 'primaryColor',
    secondaryColor: 'secondaryColor',
    logoUrl: 'logoUrl',
    deploymentUrl: 'deploymentUrl',
    dbConnectionUri: 'dbConnectionUri',
    dbSchemaVersion: 'dbSchemaVersion',
    trialEndsAt: 'trialEndsAt',
    contractStart: 'contractStart',
    contractEnd: 'contractEnd',
    createdAt: 'createdAt',
    allowCrossOrgReferrals: 'allowCrossOrgReferrals',
    referralCapacityStatus: 'referralCapacityStatus',
    referralGeographicScope: 'referralGeographicScope',
    acceptedReferralTypes: 'acceptedReferralTypes'
  };

  export type CpOrganizationScalarFieldEnum = (typeof CpOrganizationScalarFieldEnum)[keyof typeof CpOrganizationScalarFieldEnum]


  export const CpFeatureFlagScalarFieldEnum: {
    orgId: 'orgId',
    featureKey: 'featureKey',
    isEnabled: 'isEnabled',
    configuredAt: 'configuredAt',
    configuredBy: 'configuredBy'
  };

  export type CpFeatureFlagScalarFieldEnum = (typeof CpFeatureFlagScalarFieldEnum)[keyof typeof CpFeatureFlagScalarFieldEnum]


  export const CpUsageMetricScalarFieldEnum: {
    id: 'id',
    orgId: 'orgId',
    recordedAt: 'recordedAt',
    activeStaffCount: 'activeStaffCount',
    patientRecordsCount: 'patientRecordsCount',
    storageBytesUsed: 'storageBytesUsed',
    smsSentThisMonth: 'smsSentThisMonth',
    apiRequestsCount: 'apiRequestsCount'
  };

  export type CpUsageMetricScalarFieldEnum = (typeof CpUsageMetricScalarFieldEnum)[keyof typeof CpUsageMetricScalarFieldEnum]


  export const CpPluginDirectoryScalarFieldEnum: {
    id: 'id',
    pluginId: 'pluginId',
    name: 'name',
    description: 'description',
    version: 'version',
    isPublished: 'isPublished',
    publishedAt: 'publishedAt',
    createdAt: 'createdAt'
  };

  export type CpPluginDirectoryScalarFieldEnum = (typeof CpPluginDirectoryScalarFieldEnum)[keyof typeof CpPluginDirectoryScalarFieldEnum]


  export const CpTempAccessGrantScalarFieldEnum: {
    id: 'id',
    orgId: 'orgId',
    requestedBy: 'requestedBy',
    reason: 'reason',
    scope: 'scope',
    durationHours: 'durationHours',
    status: 'status',
    requestedAt: 'requestedAt',
    approvedAt: 'approvedAt',
    approvedBy: 'approvedBy',
    expiresAt: 'expiresAt',
    revokedAt: 'revokedAt',
    revokedBy: 'revokedBy'
  };

  export type CpTempAccessGrantScalarFieldEnum = (typeof CpTempAccessGrantScalarFieldEnum)[keyof typeof CpTempAccessGrantScalarFieldEnum]


  export const CpTenantDbUpgradeScalarFieldEnum: {
    id: 'id',
    orgId: 'orgId',
    schemaVersion: 'schemaVersion',
    status: 'status',
    startedAt: 'startedAt',
    completedAt: 'completedAt',
    errorLog: 'errorLog'
  };

  export type CpTenantDbUpgradeScalarFieldEnum = (typeof CpTenantDbUpgradeScalarFieldEnum)[keyof typeof CpTenantDbUpgradeScalarFieldEnum]


  export const CpIncidentScalarFieldEnum: {
    id: 'id',
    orgId: 'orgId',
    title: 'title',
    description: 'description',
    severity: 'severity',
    status: 'status',
    createdBy: 'createdBy',
    createdAt: 'createdAt',
    resolvedAt: 'resolvedAt'
  };

  export type CpIncidentScalarFieldEnum = (typeof CpIncidentScalarFieldEnum)[keyof typeof CpIncidentScalarFieldEnum]


  export const CpMigrationScalarFieldEnum: {
    id: 'id',
    orgId: 'orgId',
    sourceSystem: 'sourceSystem',
    status: 'status',
    totalRecords: 'totalRecords',
    successCount: 'successCount',
    failedCount: 'failedCount',
    runBy: 'runBy',
    runAt: 'runAt',
    notes: 'notes'
  };

  export type CpMigrationScalarFieldEnum = (typeof CpMigrationScalarFieldEnum)[keyof typeof CpMigrationScalarFieldEnum]


  export const CpUserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    emailVerified: 'emailVerified',
    image: 'image',
    passwordHash: 'passwordHash',
    mfaEnabled: 'mfaEnabled',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CpUserScalarFieldEnum = (typeof CpUserScalarFieldEnum)[keyof typeof CpUserScalarFieldEnum]


  export const CpSessionScalarFieldEnum: {
    id: 'id',
    expiresAt: 'expiresAt',
    token: 'token',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    userId: 'userId'
  };

  export type CpSessionScalarFieldEnum = (typeof CpSessionScalarFieldEnum)[keyof typeof CpSessionScalarFieldEnum]


  export const CpAccountScalarFieldEnum: {
    id: 'id',
    accountId: 'accountId',
    providerId: 'providerId',
    userId: 'userId',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    idToken: 'idToken',
    expiresAt: 'expiresAt',
    password: 'password',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CpAccountScalarFieldEnum = (typeof CpAccountScalarFieldEnum)[keyof typeof CpAccountScalarFieldEnum]


  export const CpVerificationScalarFieldEnum: {
    id: 'id',
    identifier: 'identifier',
    value: 'value',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CpVerificationScalarFieldEnum = (typeof CpVerificationScalarFieldEnum)[keyof typeof CpVerificationScalarFieldEnum]


  export const CpPatientIndexScalarFieldEnum: {
    id: 'id',
    patientPin: 'patientPin',
    firstName: 'firstName',
    lastName: 'lastName',
    birthDate: 'birthDate',
    sex: 'sex',
    orgId: 'orgId',
    orgSlug: 'orgSlug',
    createdAt: 'createdAt'
  };

  export type CpPatientIndexScalarFieldEnum = (typeof CpPatientIndexScalarFieldEnum)[keyof typeof CpPatientIndexScalarFieldEnum]


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
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


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


  export type CpOrganizationWhereInput = {
    AND?: CpOrganizationWhereInput | CpOrganizationWhereInput[]
    OR?: CpOrganizationWhereInput[]
    NOT?: CpOrganizationWhereInput | CpOrganizationWhereInput[]
    id?: UuidFilter<"CpOrganization"> | string
    name?: StringFilter<"CpOrganization"> | string
    slug?: StringFilter<"CpOrganization"> | string
    type?: StringFilter<"CpOrganization"> | string
    status?: StringFilter<"CpOrganization"> | string
    billingEmail?: StringNullableFilter<"CpOrganization"> | string | null
    billingPlan?: StringFilter<"CpOrganization"> | string
    stripeCustomerId?: StringNullableFilter<"CpOrganization"> | string | null
    stripeSubscriptionId?: StringNullableFilter<"CpOrganization"> | string | null
    maxStaffSeats?: IntFilter<"CpOrganization"> | number
    maxPatientRecords?: IntFilter<"CpOrganization"> | number
    maxStorageMb?: BigIntFilter<"CpOrganization"> | bigint | number
    customDomain?: StringNullableFilter<"CpOrganization"> | string | null
    customDomainStatus?: StringFilter<"CpOrganization"> | string
    dnsVerificationToken?: StringNullableFilter<"CpOrganization"> | string | null
    sslStatus?: StringFilter<"CpOrganization"> | string
    primaryColor?: StringFilter<"CpOrganization"> | string
    secondaryColor?: StringFilter<"CpOrganization"> | string
    logoUrl?: StringNullableFilter<"CpOrganization"> | string | null
    deploymentUrl?: StringNullableFilter<"CpOrganization"> | string | null
    dbConnectionUri?: StringNullableFilter<"CpOrganization"> | string | null
    dbSchemaVersion?: StringNullableFilter<"CpOrganization"> | string | null
    trialEndsAt?: DateTimeNullableFilter<"CpOrganization"> | Date | string | null
    contractStart?: DateTimeNullableFilter<"CpOrganization"> | Date | string | null
    contractEnd?: DateTimeNullableFilter<"CpOrganization"> | Date | string | null
    createdAt?: DateTimeFilter<"CpOrganization"> | Date | string
    allowCrossOrgReferrals?: BoolFilter<"CpOrganization"> | boolean
    referralCapacityStatus?: StringFilter<"CpOrganization"> | string
    referralGeographicScope?: StringFilter<"CpOrganization"> | string
    acceptedReferralTypes?: StringFilter<"CpOrganization"> | string
    featureFlags?: CpFeatureFlagListRelationFilter
    usageMetrics?: CpUsageMetricListRelationFilter
    tempAccessGrants?: CpTempAccessGrantListRelationFilter
    tenantDbUpgrades?: CpTenantDbUpgradeListRelationFilter
    incidents?: CpIncidentListRelationFilter
    migrations?: CpMigrationListRelationFilter
    patientIndexes?: CpPatientIndexListRelationFilter
  }

  export type CpOrganizationOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    type?: SortOrder
    status?: SortOrder
    billingEmail?: SortOrderInput | SortOrder
    billingPlan?: SortOrder
    stripeCustomerId?: SortOrderInput | SortOrder
    stripeSubscriptionId?: SortOrderInput | SortOrder
    maxStaffSeats?: SortOrder
    maxPatientRecords?: SortOrder
    maxStorageMb?: SortOrder
    customDomain?: SortOrderInput | SortOrder
    customDomainStatus?: SortOrder
    dnsVerificationToken?: SortOrderInput | SortOrder
    sslStatus?: SortOrder
    primaryColor?: SortOrder
    secondaryColor?: SortOrder
    logoUrl?: SortOrderInput | SortOrder
    deploymentUrl?: SortOrderInput | SortOrder
    dbConnectionUri?: SortOrderInput | SortOrder
    dbSchemaVersion?: SortOrderInput | SortOrder
    trialEndsAt?: SortOrderInput | SortOrder
    contractStart?: SortOrderInput | SortOrder
    contractEnd?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    allowCrossOrgReferrals?: SortOrder
    referralCapacityStatus?: SortOrder
    referralGeographicScope?: SortOrder
    acceptedReferralTypes?: SortOrder
    featureFlags?: CpFeatureFlagOrderByRelationAggregateInput
    usageMetrics?: CpUsageMetricOrderByRelationAggregateInput
    tempAccessGrants?: CpTempAccessGrantOrderByRelationAggregateInput
    tenantDbUpgrades?: CpTenantDbUpgradeOrderByRelationAggregateInput
    incidents?: CpIncidentOrderByRelationAggregateInput
    migrations?: CpMigrationOrderByRelationAggregateInput
    patientIndexes?: CpPatientIndexOrderByRelationAggregateInput
  }

  export type CpOrganizationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: CpOrganizationWhereInput | CpOrganizationWhereInput[]
    OR?: CpOrganizationWhereInput[]
    NOT?: CpOrganizationWhereInput | CpOrganizationWhereInput[]
    name?: StringFilter<"CpOrganization"> | string
    type?: StringFilter<"CpOrganization"> | string
    status?: StringFilter<"CpOrganization"> | string
    billingEmail?: StringNullableFilter<"CpOrganization"> | string | null
    billingPlan?: StringFilter<"CpOrganization"> | string
    stripeCustomerId?: StringNullableFilter<"CpOrganization"> | string | null
    stripeSubscriptionId?: StringNullableFilter<"CpOrganization"> | string | null
    maxStaffSeats?: IntFilter<"CpOrganization"> | number
    maxPatientRecords?: IntFilter<"CpOrganization"> | number
    maxStorageMb?: BigIntFilter<"CpOrganization"> | bigint | number
    customDomain?: StringNullableFilter<"CpOrganization"> | string | null
    customDomainStatus?: StringFilter<"CpOrganization"> | string
    dnsVerificationToken?: StringNullableFilter<"CpOrganization"> | string | null
    sslStatus?: StringFilter<"CpOrganization"> | string
    primaryColor?: StringFilter<"CpOrganization"> | string
    secondaryColor?: StringFilter<"CpOrganization"> | string
    logoUrl?: StringNullableFilter<"CpOrganization"> | string | null
    deploymentUrl?: StringNullableFilter<"CpOrganization"> | string | null
    dbConnectionUri?: StringNullableFilter<"CpOrganization"> | string | null
    dbSchemaVersion?: StringNullableFilter<"CpOrganization"> | string | null
    trialEndsAt?: DateTimeNullableFilter<"CpOrganization"> | Date | string | null
    contractStart?: DateTimeNullableFilter<"CpOrganization"> | Date | string | null
    contractEnd?: DateTimeNullableFilter<"CpOrganization"> | Date | string | null
    createdAt?: DateTimeFilter<"CpOrganization"> | Date | string
    allowCrossOrgReferrals?: BoolFilter<"CpOrganization"> | boolean
    referralCapacityStatus?: StringFilter<"CpOrganization"> | string
    referralGeographicScope?: StringFilter<"CpOrganization"> | string
    acceptedReferralTypes?: StringFilter<"CpOrganization"> | string
    featureFlags?: CpFeatureFlagListRelationFilter
    usageMetrics?: CpUsageMetricListRelationFilter
    tempAccessGrants?: CpTempAccessGrantListRelationFilter
    tenantDbUpgrades?: CpTenantDbUpgradeListRelationFilter
    incidents?: CpIncidentListRelationFilter
    migrations?: CpMigrationListRelationFilter
    patientIndexes?: CpPatientIndexListRelationFilter
  }, "id" | "slug">

  export type CpOrganizationOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    type?: SortOrder
    status?: SortOrder
    billingEmail?: SortOrderInput | SortOrder
    billingPlan?: SortOrder
    stripeCustomerId?: SortOrderInput | SortOrder
    stripeSubscriptionId?: SortOrderInput | SortOrder
    maxStaffSeats?: SortOrder
    maxPatientRecords?: SortOrder
    maxStorageMb?: SortOrder
    customDomain?: SortOrderInput | SortOrder
    customDomainStatus?: SortOrder
    dnsVerificationToken?: SortOrderInput | SortOrder
    sslStatus?: SortOrder
    primaryColor?: SortOrder
    secondaryColor?: SortOrder
    logoUrl?: SortOrderInput | SortOrder
    deploymentUrl?: SortOrderInput | SortOrder
    dbConnectionUri?: SortOrderInput | SortOrder
    dbSchemaVersion?: SortOrderInput | SortOrder
    trialEndsAt?: SortOrderInput | SortOrder
    contractStart?: SortOrderInput | SortOrder
    contractEnd?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    allowCrossOrgReferrals?: SortOrder
    referralCapacityStatus?: SortOrder
    referralGeographicScope?: SortOrder
    acceptedReferralTypes?: SortOrder
    _count?: CpOrganizationCountOrderByAggregateInput
    _avg?: CpOrganizationAvgOrderByAggregateInput
    _max?: CpOrganizationMaxOrderByAggregateInput
    _min?: CpOrganizationMinOrderByAggregateInput
    _sum?: CpOrganizationSumOrderByAggregateInput
  }

  export type CpOrganizationScalarWhereWithAggregatesInput = {
    AND?: CpOrganizationScalarWhereWithAggregatesInput | CpOrganizationScalarWhereWithAggregatesInput[]
    OR?: CpOrganizationScalarWhereWithAggregatesInput[]
    NOT?: CpOrganizationScalarWhereWithAggregatesInput | CpOrganizationScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"CpOrganization"> | string
    name?: StringWithAggregatesFilter<"CpOrganization"> | string
    slug?: StringWithAggregatesFilter<"CpOrganization"> | string
    type?: StringWithAggregatesFilter<"CpOrganization"> | string
    status?: StringWithAggregatesFilter<"CpOrganization"> | string
    billingEmail?: StringNullableWithAggregatesFilter<"CpOrganization"> | string | null
    billingPlan?: StringWithAggregatesFilter<"CpOrganization"> | string
    stripeCustomerId?: StringNullableWithAggregatesFilter<"CpOrganization"> | string | null
    stripeSubscriptionId?: StringNullableWithAggregatesFilter<"CpOrganization"> | string | null
    maxStaffSeats?: IntWithAggregatesFilter<"CpOrganization"> | number
    maxPatientRecords?: IntWithAggregatesFilter<"CpOrganization"> | number
    maxStorageMb?: BigIntWithAggregatesFilter<"CpOrganization"> | bigint | number
    customDomain?: StringNullableWithAggregatesFilter<"CpOrganization"> | string | null
    customDomainStatus?: StringWithAggregatesFilter<"CpOrganization"> | string
    dnsVerificationToken?: StringNullableWithAggregatesFilter<"CpOrganization"> | string | null
    sslStatus?: StringWithAggregatesFilter<"CpOrganization"> | string
    primaryColor?: StringWithAggregatesFilter<"CpOrganization"> | string
    secondaryColor?: StringWithAggregatesFilter<"CpOrganization"> | string
    logoUrl?: StringNullableWithAggregatesFilter<"CpOrganization"> | string | null
    deploymentUrl?: StringNullableWithAggregatesFilter<"CpOrganization"> | string | null
    dbConnectionUri?: StringNullableWithAggregatesFilter<"CpOrganization"> | string | null
    dbSchemaVersion?: StringNullableWithAggregatesFilter<"CpOrganization"> | string | null
    trialEndsAt?: DateTimeNullableWithAggregatesFilter<"CpOrganization"> | Date | string | null
    contractStart?: DateTimeNullableWithAggregatesFilter<"CpOrganization"> | Date | string | null
    contractEnd?: DateTimeNullableWithAggregatesFilter<"CpOrganization"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"CpOrganization"> | Date | string
    allowCrossOrgReferrals?: BoolWithAggregatesFilter<"CpOrganization"> | boolean
    referralCapacityStatus?: StringWithAggregatesFilter<"CpOrganization"> | string
    referralGeographicScope?: StringWithAggregatesFilter<"CpOrganization"> | string
    acceptedReferralTypes?: StringWithAggregatesFilter<"CpOrganization"> | string
  }

  export type CpFeatureFlagWhereInput = {
    AND?: CpFeatureFlagWhereInput | CpFeatureFlagWhereInput[]
    OR?: CpFeatureFlagWhereInput[]
    NOT?: CpFeatureFlagWhereInput | CpFeatureFlagWhereInput[]
    orgId?: UuidFilter<"CpFeatureFlag"> | string
    featureKey?: StringFilter<"CpFeatureFlag"> | string
    isEnabled?: BoolFilter<"CpFeatureFlag"> | boolean
    configuredAt?: DateTimeFilter<"CpFeatureFlag"> | Date | string
    configuredBy?: UuidNullableFilter<"CpFeatureFlag"> | string | null
    organization?: XOR<CpOrganizationRelationFilter, CpOrganizationWhereInput>
  }

  export type CpFeatureFlagOrderByWithRelationInput = {
    orgId?: SortOrder
    featureKey?: SortOrder
    isEnabled?: SortOrder
    configuredAt?: SortOrder
    configuredBy?: SortOrderInput | SortOrder
    organization?: CpOrganizationOrderByWithRelationInput
  }

  export type CpFeatureFlagWhereUniqueInput = Prisma.AtLeast<{
    orgId_featureKey?: CpFeatureFlagOrgIdFeatureKeyCompoundUniqueInput
    AND?: CpFeatureFlagWhereInput | CpFeatureFlagWhereInput[]
    OR?: CpFeatureFlagWhereInput[]
    NOT?: CpFeatureFlagWhereInput | CpFeatureFlagWhereInput[]
    orgId?: UuidFilter<"CpFeatureFlag"> | string
    featureKey?: StringFilter<"CpFeatureFlag"> | string
    isEnabled?: BoolFilter<"CpFeatureFlag"> | boolean
    configuredAt?: DateTimeFilter<"CpFeatureFlag"> | Date | string
    configuredBy?: UuidNullableFilter<"CpFeatureFlag"> | string | null
    organization?: XOR<CpOrganizationRelationFilter, CpOrganizationWhereInput>
  }, "orgId_featureKey">

  export type CpFeatureFlagOrderByWithAggregationInput = {
    orgId?: SortOrder
    featureKey?: SortOrder
    isEnabled?: SortOrder
    configuredAt?: SortOrder
    configuredBy?: SortOrderInput | SortOrder
    _count?: CpFeatureFlagCountOrderByAggregateInput
    _max?: CpFeatureFlagMaxOrderByAggregateInput
    _min?: CpFeatureFlagMinOrderByAggregateInput
  }

  export type CpFeatureFlagScalarWhereWithAggregatesInput = {
    AND?: CpFeatureFlagScalarWhereWithAggregatesInput | CpFeatureFlagScalarWhereWithAggregatesInput[]
    OR?: CpFeatureFlagScalarWhereWithAggregatesInput[]
    NOT?: CpFeatureFlagScalarWhereWithAggregatesInput | CpFeatureFlagScalarWhereWithAggregatesInput[]
    orgId?: UuidWithAggregatesFilter<"CpFeatureFlag"> | string
    featureKey?: StringWithAggregatesFilter<"CpFeatureFlag"> | string
    isEnabled?: BoolWithAggregatesFilter<"CpFeatureFlag"> | boolean
    configuredAt?: DateTimeWithAggregatesFilter<"CpFeatureFlag"> | Date | string
    configuredBy?: UuidNullableWithAggregatesFilter<"CpFeatureFlag"> | string | null
  }

  export type CpUsageMetricWhereInput = {
    AND?: CpUsageMetricWhereInput | CpUsageMetricWhereInput[]
    OR?: CpUsageMetricWhereInput[]
    NOT?: CpUsageMetricWhereInput | CpUsageMetricWhereInput[]
    id?: UuidFilter<"CpUsageMetric"> | string
    orgId?: UuidFilter<"CpUsageMetric"> | string
    recordedAt?: DateTimeFilter<"CpUsageMetric"> | Date | string
    activeStaffCount?: IntFilter<"CpUsageMetric"> | number
    patientRecordsCount?: IntFilter<"CpUsageMetric"> | number
    storageBytesUsed?: BigIntFilter<"CpUsageMetric"> | bigint | number
    smsSentThisMonth?: IntFilter<"CpUsageMetric"> | number
    apiRequestsCount?: IntFilter<"CpUsageMetric"> | number
    organization?: XOR<CpOrganizationRelationFilter, CpOrganizationWhereInput>
  }

  export type CpUsageMetricOrderByWithRelationInput = {
    id?: SortOrder
    orgId?: SortOrder
    recordedAt?: SortOrder
    activeStaffCount?: SortOrder
    patientRecordsCount?: SortOrder
    storageBytesUsed?: SortOrder
    smsSentThisMonth?: SortOrder
    apiRequestsCount?: SortOrder
    organization?: CpOrganizationOrderByWithRelationInput
  }

  export type CpUsageMetricWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CpUsageMetricWhereInput | CpUsageMetricWhereInput[]
    OR?: CpUsageMetricWhereInput[]
    NOT?: CpUsageMetricWhereInput | CpUsageMetricWhereInput[]
    orgId?: UuidFilter<"CpUsageMetric"> | string
    recordedAt?: DateTimeFilter<"CpUsageMetric"> | Date | string
    activeStaffCount?: IntFilter<"CpUsageMetric"> | number
    patientRecordsCount?: IntFilter<"CpUsageMetric"> | number
    storageBytesUsed?: BigIntFilter<"CpUsageMetric"> | bigint | number
    smsSentThisMonth?: IntFilter<"CpUsageMetric"> | number
    apiRequestsCount?: IntFilter<"CpUsageMetric"> | number
    organization?: XOR<CpOrganizationRelationFilter, CpOrganizationWhereInput>
  }, "id">

  export type CpUsageMetricOrderByWithAggregationInput = {
    id?: SortOrder
    orgId?: SortOrder
    recordedAt?: SortOrder
    activeStaffCount?: SortOrder
    patientRecordsCount?: SortOrder
    storageBytesUsed?: SortOrder
    smsSentThisMonth?: SortOrder
    apiRequestsCount?: SortOrder
    _count?: CpUsageMetricCountOrderByAggregateInput
    _avg?: CpUsageMetricAvgOrderByAggregateInput
    _max?: CpUsageMetricMaxOrderByAggregateInput
    _min?: CpUsageMetricMinOrderByAggregateInput
    _sum?: CpUsageMetricSumOrderByAggregateInput
  }

  export type CpUsageMetricScalarWhereWithAggregatesInput = {
    AND?: CpUsageMetricScalarWhereWithAggregatesInput | CpUsageMetricScalarWhereWithAggregatesInput[]
    OR?: CpUsageMetricScalarWhereWithAggregatesInput[]
    NOT?: CpUsageMetricScalarWhereWithAggregatesInput | CpUsageMetricScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"CpUsageMetric"> | string
    orgId?: UuidWithAggregatesFilter<"CpUsageMetric"> | string
    recordedAt?: DateTimeWithAggregatesFilter<"CpUsageMetric"> | Date | string
    activeStaffCount?: IntWithAggregatesFilter<"CpUsageMetric"> | number
    patientRecordsCount?: IntWithAggregatesFilter<"CpUsageMetric"> | number
    storageBytesUsed?: BigIntWithAggregatesFilter<"CpUsageMetric"> | bigint | number
    smsSentThisMonth?: IntWithAggregatesFilter<"CpUsageMetric"> | number
    apiRequestsCount?: IntWithAggregatesFilter<"CpUsageMetric"> | number
  }

  export type CpPluginDirectoryWhereInput = {
    AND?: CpPluginDirectoryWhereInput | CpPluginDirectoryWhereInput[]
    OR?: CpPluginDirectoryWhereInput[]
    NOT?: CpPluginDirectoryWhereInput | CpPluginDirectoryWhereInput[]
    id?: UuidFilter<"CpPluginDirectory"> | string
    pluginId?: StringFilter<"CpPluginDirectory"> | string
    name?: StringFilter<"CpPluginDirectory"> | string
    description?: StringNullableFilter<"CpPluginDirectory"> | string | null
    version?: StringFilter<"CpPluginDirectory"> | string
    isPublished?: BoolFilter<"CpPluginDirectory"> | boolean
    publishedAt?: DateTimeNullableFilter<"CpPluginDirectory"> | Date | string | null
    createdAt?: DateTimeFilter<"CpPluginDirectory"> | Date | string
  }

  export type CpPluginDirectoryOrderByWithRelationInput = {
    id?: SortOrder
    pluginId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    version?: SortOrder
    isPublished?: SortOrder
    publishedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type CpPluginDirectoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    pluginId?: string
    AND?: CpPluginDirectoryWhereInput | CpPluginDirectoryWhereInput[]
    OR?: CpPluginDirectoryWhereInput[]
    NOT?: CpPluginDirectoryWhereInput | CpPluginDirectoryWhereInput[]
    name?: StringFilter<"CpPluginDirectory"> | string
    description?: StringNullableFilter<"CpPluginDirectory"> | string | null
    version?: StringFilter<"CpPluginDirectory"> | string
    isPublished?: BoolFilter<"CpPluginDirectory"> | boolean
    publishedAt?: DateTimeNullableFilter<"CpPluginDirectory"> | Date | string | null
    createdAt?: DateTimeFilter<"CpPluginDirectory"> | Date | string
  }, "id" | "pluginId">

  export type CpPluginDirectoryOrderByWithAggregationInput = {
    id?: SortOrder
    pluginId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    version?: SortOrder
    isPublished?: SortOrder
    publishedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: CpPluginDirectoryCountOrderByAggregateInput
    _max?: CpPluginDirectoryMaxOrderByAggregateInput
    _min?: CpPluginDirectoryMinOrderByAggregateInput
  }

  export type CpPluginDirectoryScalarWhereWithAggregatesInput = {
    AND?: CpPluginDirectoryScalarWhereWithAggregatesInput | CpPluginDirectoryScalarWhereWithAggregatesInput[]
    OR?: CpPluginDirectoryScalarWhereWithAggregatesInput[]
    NOT?: CpPluginDirectoryScalarWhereWithAggregatesInput | CpPluginDirectoryScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"CpPluginDirectory"> | string
    pluginId?: StringWithAggregatesFilter<"CpPluginDirectory"> | string
    name?: StringWithAggregatesFilter<"CpPluginDirectory"> | string
    description?: StringNullableWithAggregatesFilter<"CpPluginDirectory"> | string | null
    version?: StringWithAggregatesFilter<"CpPluginDirectory"> | string
    isPublished?: BoolWithAggregatesFilter<"CpPluginDirectory"> | boolean
    publishedAt?: DateTimeNullableWithAggregatesFilter<"CpPluginDirectory"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"CpPluginDirectory"> | Date | string
  }

  export type CpTempAccessGrantWhereInput = {
    AND?: CpTempAccessGrantWhereInput | CpTempAccessGrantWhereInput[]
    OR?: CpTempAccessGrantWhereInput[]
    NOT?: CpTempAccessGrantWhereInput | CpTempAccessGrantWhereInput[]
    id?: UuidFilter<"CpTempAccessGrant"> | string
    orgId?: UuidFilter<"CpTempAccessGrant"> | string
    requestedBy?: UuidFilter<"CpTempAccessGrant"> | string
    reason?: StringFilter<"CpTempAccessGrant"> | string
    scope?: StringFilter<"CpTempAccessGrant"> | string
    durationHours?: IntFilter<"CpTempAccessGrant"> | number
    status?: StringFilter<"CpTempAccessGrant"> | string
    requestedAt?: DateTimeFilter<"CpTempAccessGrant"> | Date | string
    approvedAt?: DateTimeNullableFilter<"CpTempAccessGrant"> | Date | string | null
    approvedBy?: StringNullableFilter<"CpTempAccessGrant"> | string | null
    expiresAt?: DateTimeNullableFilter<"CpTempAccessGrant"> | Date | string | null
    revokedAt?: DateTimeNullableFilter<"CpTempAccessGrant"> | Date | string | null
    revokedBy?: StringNullableFilter<"CpTempAccessGrant"> | string | null
    organization?: XOR<CpOrganizationRelationFilter, CpOrganizationWhereInput>
  }

  export type CpTempAccessGrantOrderByWithRelationInput = {
    id?: SortOrder
    orgId?: SortOrder
    requestedBy?: SortOrder
    reason?: SortOrder
    scope?: SortOrder
    durationHours?: SortOrder
    status?: SortOrder
    requestedAt?: SortOrder
    approvedAt?: SortOrderInput | SortOrder
    approvedBy?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    revokedAt?: SortOrderInput | SortOrder
    revokedBy?: SortOrderInput | SortOrder
    organization?: CpOrganizationOrderByWithRelationInput
  }

  export type CpTempAccessGrantWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CpTempAccessGrantWhereInput | CpTempAccessGrantWhereInput[]
    OR?: CpTempAccessGrantWhereInput[]
    NOT?: CpTempAccessGrantWhereInput | CpTempAccessGrantWhereInput[]
    orgId?: UuidFilter<"CpTempAccessGrant"> | string
    requestedBy?: UuidFilter<"CpTempAccessGrant"> | string
    reason?: StringFilter<"CpTempAccessGrant"> | string
    scope?: StringFilter<"CpTempAccessGrant"> | string
    durationHours?: IntFilter<"CpTempAccessGrant"> | number
    status?: StringFilter<"CpTempAccessGrant"> | string
    requestedAt?: DateTimeFilter<"CpTempAccessGrant"> | Date | string
    approvedAt?: DateTimeNullableFilter<"CpTempAccessGrant"> | Date | string | null
    approvedBy?: StringNullableFilter<"CpTempAccessGrant"> | string | null
    expiresAt?: DateTimeNullableFilter<"CpTempAccessGrant"> | Date | string | null
    revokedAt?: DateTimeNullableFilter<"CpTempAccessGrant"> | Date | string | null
    revokedBy?: StringNullableFilter<"CpTempAccessGrant"> | string | null
    organization?: XOR<CpOrganizationRelationFilter, CpOrganizationWhereInput>
  }, "id">

  export type CpTempAccessGrantOrderByWithAggregationInput = {
    id?: SortOrder
    orgId?: SortOrder
    requestedBy?: SortOrder
    reason?: SortOrder
    scope?: SortOrder
    durationHours?: SortOrder
    status?: SortOrder
    requestedAt?: SortOrder
    approvedAt?: SortOrderInput | SortOrder
    approvedBy?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    revokedAt?: SortOrderInput | SortOrder
    revokedBy?: SortOrderInput | SortOrder
    _count?: CpTempAccessGrantCountOrderByAggregateInput
    _avg?: CpTempAccessGrantAvgOrderByAggregateInput
    _max?: CpTempAccessGrantMaxOrderByAggregateInput
    _min?: CpTempAccessGrantMinOrderByAggregateInput
    _sum?: CpTempAccessGrantSumOrderByAggregateInput
  }

  export type CpTempAccessGrantScalarWhereWithAggregatesInput = {
    AND?: CpTempAccessGrantScalarWhereWithAggregatesInput | CpTempAccessGrantScalarWhereWithAggregatesInput[]
    OR?: CpTempAccessGrantScalarWhereWithAggregatesInput[]
    NOT?: CpTempAccessGrantScalarWhereWithAggregatesInput | CpTempAccessGrantScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"CpTempAccessGrant"> | string
    orgId?: UuidWithAggregatesFilter<"CpTempAccessGrant"> | string
    requestedBy?: UuidWithAggregatesFilter<"CpTempAccessGrant"> | string
    reason?: StringWithAggregatesFilter<"CpTempAccessGrant"> | string
    scope?: StringWithAggregatesFilter<"CpTempAccessGrant"> | string
    durationHours?: IntWithAggregatesFilter<"CpTempAccessGrant"> | number
    status?: StringWithAggregatesFilter<"CpTempAccessGrant"> | string
    requestedAt?: DateTimeWithAggregatesFilter<"CpTempAccessGrant"> | Date | string
    approvedAt?: DateTimeNullableWithAggregatesFilter<"CpTempAccessGrant"> | Date | string | null
    approvedBy?: StringNullableWithAggregatesFilter<"CpTempAccessGrant"> | string | null
    expiresAt?: DateTimeNullableWithAggregatesFilter<"CpTempAccessGrant"> | Date | string | null
    revokedAt?: DateTimeNullableWithAggregatesFilter<"CpTempAccessGrant"> | Date | string | null
    revokedBy?: StringNullableWithAggregatesFilter<"CpTempAccessGrant"> | string | null
  }

  export type CpTenantDbUpgradeWhereInput = {
    AND?: CpTenantDbUpgradeWhereInput | CpTenantDbUpgradeWhereInput[]
    OR?: CpTenantDbUpgradeWhereInput[]
    NOT?: CpTenantDbUpgradeWhereInput | CpTenantDbUpgradeWhereInput[]
    id?: UuidFilter<"CpTenantDbUpgrade"> | string
    orgId?: UuidFilter<"CpTenantDbUpgrade"> | string
    schemaVersion?: StringFilter<"CpTenantDbUpgrade"> | string
    status?: StringFilter<"CpTenantDbUpgrade"> | string
    startedAt?: DateTimeNullableFilter<"CpTenantDbUpgrade"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"CpTenantDbUpgrade"> | Date | string | null
    errorLog?: StringNullableFilter<"CpTenantDbUpgrade"> | string | null
    organization?: XOR<CpOrganizationRelationFilter, CpOrganizationWhereInput>
  }

  export type CpTenantDbUpgradeOrderByWithRelationInput = {
    id?: SortOrder
    orgId?: SortOrder
    schemaVersion?: SortOrder
    status?: SortOrder
    startedAt?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    errorLog?: SortOrderInput | SortOrder
    organization?: CpOrganizationOrderByWithRelationInput
  }

  export type CpTenantDbUpgradeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CpTenantDbUpgradeWhereInput | CpTenantDbUpgradeWhereInput[]
    OR?: CpTenantDbUpgradeWhereInput[]
    NOT?: CpTenantDbUpgradeWhereInput | CpTenantDbUpgradeWhereInput[]
    orgId?: UuidFilter<"CpTenantDbUpgrade"> | string
    schemaVersion?: StringFilter<"CpTenantDbUpgrade"> | string
    status?: StringFilter<"CpTenantDbUpgrade"> | string
    startedAt?: DateTimeNullableFilter<"CpTenantDbUpgrade"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"CpTenantDbUpgrade"> | Date | string | null
    errorLog?: StringNullableFilter<"CpTenantDbUpgrade"> | string | null
    organization?: XOR<CpOrganizationRelationFilter, CpOrganizationWhereInput>
  }, "id">

  export type CpTenantDbUpgradeOrderByWithAggregationInput = {
    id?: SortOrder
    orgId?: SortOrder
    schemaVersion?: SortOrder
    status?: SortOrder
    startedAt?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    errorLog?: SortOrderInput | SortOrder
    _count?: CpTenantDbUpgradeCountOrderByAggregateInput
    _max?: CpTenantDbUpgradeMaxOrderByAggregateInput
    _min?: CpTenantDbUpgradeMinOrderByAggregateInput
  }

  export type CpTenantDbUpgradeScalarWhereWithAggregatesInput = {
    AND?: CpTenantDbUpgradeScalarWhereWithAggregatesInput | CpTenantDbUpgradeScalarWhereWithAggregatesInput[]
    OR?: CpTenantDbUpgradeScalarWhereWithAggregatesInput[]
    NOT?: CpTenantDbUpgradeScalarWhereWithAggregatesInput | CpTenantDbUpgradeScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"CpTenantDbUpgrade"> | string
    orgId?: UuidWithAggregatesFilter<"CpTenantDbUpgrade"> | string
    schemaVersion?: StringWithAggregatesFilter<"CpTenantDbUpgrade"> | string
    status?: StringWithAggregatesFilter<"CpTenantDbUpgrade"> | string
    startedAt?: DateTimeNullableWithAggregatesFilter<"CpTenantDbUpgrade"> | Date | string | null
    completedAt?: DateTimeNullableWithAggregatesFilter<"CpTenantDbUpgrade"> | Date | string | null
    errorLog?: StringNullableWithAggregatesFilter<"CpTenantDbUpgrade"> | string | null
  }

  export type CpIncidentWhereInput = {
    AND?: CpIncidentWhereInput | CpIncidentWhereInput[]
    OR?: CpIncidentWhereInput[]
    NOT?: CpIncidentWhereInput | CpIncidentWhereInput[]
    id?: UuidFilter<"CpIncident"> | string
    orgId?: UuidNullableFilter<"CpIncident"> | string | null
    title?: StringFilter<"CpIncident"> | string
    description?: StringNullableFilter<"CpIncident"> | string | null
    severity?: StringNullableFilter<"CpIncident"> | string | null
    status?: StringFilter<"CpIncident"> | string
    createdBy?: UuidNullableFilter<"CpIncident"> | string | null
    createdAt?: DateTimeFilter<"CpIncident"> | Date | string
    resolvedAt?: DateTimeNullableFilter<"CpIncident"> | Date | string | null
    organization?: XOR<CpOrganizationNullableRelationFilter, CpOrganizationWhereInput> | null
  }

  export type CpIncidentOrderByWithRelationInput = {
    id?: SortOrder
    orgId?: SortOrderInput | SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    severity?: SortOrderInput | SortOrder
    status?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    resolvedAt?: SortOrderInput | SortOrder
    organization?: CpOrganizationOrderByWithRelationInput
  }

  export type CpIncidentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CpIncidentWhereInput | CpIncidentWhereInput[]
    OR?: CpIncidentWhereInput[]
    NOT?: CpIncidentWhereInput | CpIncidentWhereInput[]
    orgId?: UuidNullableFilter<"CpIncident"> | string | null
    title?: StringFilter<"CpIncident"> | string
    description?: StringNullableFilter<"CpIncident"> | string | null
    severity?: StringNullableFilter<"CpIncident"> | string | null
    status?: StringFilter<"CpIncident"> | string
    createdBy?: UuidNullableFilter<"CpIncident"> | string | null
    createdAt?: DateTimeFilter<"CpIncident"> | Date | string
    resolvedAt?: DateTimeNullableFilter<"CpIncident"> | Date | string | null
    organization?: XOR<CpOrganizationNullableRelationFilter, CpOrganizationWhereInput> | null
  }, "id">

  export type CpIncidentOrderByWithAggregationInput = {
    id?: SortOrder
    orgId?: SortOrderInput | SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    severity?: SortOrderInput | SortOrder
    status?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    resolvedAt?: SortOrderInput | SortOrder
    _count?: CpIncidentCountOrderByAggregateInput
    _max?: CpIncidentMaxOrderByAggregateInput
    _min?: CpIncidentMinOrderByAggregateInput
  }

  export type CpIncidentScalarWhereWithAggregatesInput = {
    AND?: CpIncidentScalarWhereWithAggregatesInput | CpIncidentScalarWhereWithAggregatesInput[]
    OR?: CpIncidentScalarWhereWithAggregatesInput[]
    NOT?: CpIncidentScalarWhereWithAggregatesInput | CpIncidentScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"CpIncident"> | string
    orgId?: UuidNullableWithAggregatesFilter<"CpIncident"> | string | null
    title?: StringWithAggregatesFilter<"CpIncident"> | string
    description?: StringNullableWithAggregatesFilter<"CpIncident"> | string | null
    severity?: StringNullableWithAggregatesFilter<"CpIncident"> | string | null
    status?: StringWithAggregatesFilter<"CpIncident"> | string
    createdBy?: UuidNullableWithAggregatesFilter<"CpIncident"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"CpIncident"> | Date | string
    resolvedAt?: DateTimeNullableWithAggregatesFilter<"CpIncident"> | Date | string | null
  }

  export type CpMigrationWhereInput = {
    AND?: CpMigrationWhereInput | CpMigrationWhereInput[]
    OR?: CpMigrationWhereInput[]
    NOT?: CpMigrationWhereInput | CpMigrationWhereInput[]
    id?: UuidFilter<"CpMigration"> | string
    orgId?: UuidFilter<"CpMigration"> | string
    sourceSystem?: StringFilter<"CpMigration"> | string
    status?: StringFilter<"CpMigration"> | string
    totalRecords?: IntNullableFilter<"CpMigration"> | number | null
    successCount?: IntNullableFilter<"CpMigration"> | number | null
    failedCount?: IntNullableFilter<"CpMigration"> | number | null
    runBy?: StringNullableFilter<"CpMigration"> | string | null
    runAt?: DateTimeFilter<"CpMigration"> | Date | string
    notes?: StringNullableFilter<"CpMigration"> | string | null
    organization?: XOR<CpOrganizationRelationFilter, CpOrganizationWhereInput>
  }

  export type CpMigrationOrderByWithRelationInput = {
    id?: SortOrder
    orgId?: SortOrder
    sourceSystem?: SortOrder
    status?: SortOrder
    totalRecords?: SortOrderInput | SortOrder
    successCount?: SortOrderInput | SortOrder
    failedCount?: SortOrderInput | SortOrder
    runBy?: SortOrderInput | SortOrder
    runAt?: SortOrder
    notes?: SortOrderInput | SortOrder
    organization?: CpOrganizationOrderByWithRelationInput
  }

  export type CpMigrationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CpMigrationWhereInput | CpMigrationWhereInput[]
    OR?: CpMigrationWhereInput[]
    NOT?: CpMigrationWhereInput | CpMigrationWhereInput[]
    orgId?: UuidFilter<"CpMigration"> | string
    sourceSystem?: StringFilter<"CpMigration"> | string
    status?: StringFilter<"CpMigration"> | string
    totalRecords?: IntNullableFilter<"CpMigration"> | number | null
    successCount?: IntNullableFilter<"CpMigration"> | number | null
    failedCount?: IntNullableFilter<"CpMigration"> | number | null
    runBy?: StringNullableFilter<"CpMigration"> | string | null
    runAt?: DateTimeFilter<"CpMigration"> | Date | string
    notes?: StringNullableFilter<"CpMigration"> | string | null
    organization?: XOR<CpOrganizationRelationFilter, CpOrganizationWhereInput>
  }, "id">

  export type CpMigrationOrderByWithAggregationInput = {
    id?: SortOrder
    orgId?: SortOrder
    sourceSystem?: SortOrder
    status?: SortOrder
    totalRecords?: SortOrderInput | SortOrder
    successCount?: SortOrderInput | SortOrder
    failedCount?: SortOrderInput | SortOrder
    runBy?: SortOrderInput | SortOrder
    runAt?: SortOrder
    notes?: SortOrderInput | SortOrder
    _count?: CpMigrationCountOrderByAggregateInput
    _avg?: CpMigrationAvgOrderByAggregateInput
    _max?: CpMigrationMaxOrderByAggregateInput
    _min?: CpMigrationMinOrderByAggregateInput
    _sum?: CpMigrationSumOrderByAggregateInput
  }

  export type CpMigrationScalarWhereWithAggregatesInput = {
    AND?: CpMigrationScalarWhereWithAggregatesInput | CpMigrationScalarWhereWithAggregatesInput[]
    OR?: CpMigrationScalarWhereWithAggregatesInput[]
    NOT?: CpMigrationScalarWhereWithAggregatesInput | CpMigrationScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"CpMigration"> | string
    orgId?: UuidWithAggregatesFilter<"CpMigration"> | string
    sourceSystem?: StringWithAggregatesFilter<"CpMigration"> | string
    status?: StringWithAggregatesFilter<"CpMigration"> | string
    totalRecords?: IntNullableWithAggregatesFilter<"CpMigration"> | number | null
    successCount?: IntNullableWithAggregatesFilter<"CpMigration"> | number | null
    failedCount?: IntNullableWithAggregatesFilter<"CpMigration"> | number | null
    runBy?: StringNullableWithAggregatesFilter<"CpMigration"> | string | null
    runAt?: DateTimeWithAggregatesFilter<"CpMigration"> | Date | string
    notes?: StringNullableWithAggregatesFilter<"CpMigration"> | string | null
  }

  export type CpUserWhereInput = {
    AND?: CpUserWhereInput | CpUserWhereInput[]
    OR?: CpUserWhereInput[]
    NOT?: CpUserWhereInput | CpUserWhereInput[]
    id?: UuidFilter<"CpUser"> | string
    email?: StringFilter<"CpUser"> | string
    name?: StringNullableFilter<"CpUser"> | string | null
    emailVerified?: BoolFilter<"CpUser"> | boolean
    image?: StringNullableFilter<"CpUser"> | string | null
    passwordHash?: StringNullableFilter<"CpUser"> | string | null
    mfaEnabled?: BoolFilter<"CpUser"> | boolean
    isActive?: BoolFilter<"CpUser"> | boolean
    createdAt?: DateTimeFilter<"CpUser"> | Date | string
    updatedAt?: DateTimeFilter<"CpUser"> | Date | string
    sessions?: CpSessionListRelationFilter
    accounts?: CpAccountListRelationFilter
  }

  export type CpUserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    emailVerified?: SortOrder
    image?: SortOrderInput | SortOrder
    passwordHash?: SortOrderInput | SortOrder
    mfaEnabled?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sessions?: CpSessionOrderByRelationAggregateInput
    accounts?: CpAccountOrderByRelationAggregateInput
  }

  export type CpUserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: CpUserWhereInput | CpUserWhereInput[]
    OR?: CpUserWhereInput[]
    NOT?: CpUserWhereInput | CpUserWhereInput[]
    name?: StringNullableFilter<"CpUser"> | string | null
    emailVerified?: BoolFilter<"CpUser"> | boolean
    image?: StringNullableFilter<"CpUser"> | string | null
    passwordHash?: StringNullableFilter<"CpUser"> | string | null
    mfaEnabled?: BoolFilter<"CpUser"> | boolean
    isActive?: BoolFilter<"CpUser"> | boolean
    createdAt?: DateTimeFilter<"CpUser"> | Date | string
    updatedAt?: DateTimeFilter<"CpUser"> | Date | string
    sessions?: CpSessionListRelationFilter
    accounts?: CpAccountListRelationFilter
  }, "id" | "email">

  export type CpUserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    emailVerified?: SortOrder
    image?: SortOrderInput | SortOrder
    passwordHash?: SortOrderInput | SortOrder
    mfaEnabled?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CpUserCountOrderByAggregateInput
    _max?: CpUserMaxOrderByAggregateInput
    _min?: CpUserMinOrderByAggregateInput
  }

  export type CpUserScalarWhereWithAggregatesInput = {
    AND?: CpUserScalarWhereWithAggregatesInput | CpUserScalarWhereWithAggregatesInput[]
    OR?: CpUserScalarWhereWithAggregatesInput[]
    NOT?: CpUserScalarWhereWithAggregatesInput | CpUserScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"CpUser"> | string
    email?: StringWithAggregatesFilter<"CpUser"> | string
    name?: StringNullableWithAggregatesFilter<"CpUser"> | string | null
    emailVerified?: BoolWithAggregatesFilter<"CpUser"> | boolean
    image?: StringNullableWithAggregatesFilter<"CpUser"> | string | null
    passwordHash?: StringNullableWithAggregatesFilter<"CpUser"> | string | null
    mfaEnabled?: BoolWithAggregatesFilter<"CpUser"> | boolean
    isActive?: BoolWithAggregatesFilter<"CpUser"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"CpUser"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CpUser"> | Date | string
  }

  export type CpSessionWhereInput = {
    AND?: CpSessionWhereInput | CpSessionWhereInput[]
    OR?: CpSessionWhereInput[]
    NOT?: CpSessionWhereInput | CpSessionWhereInput[]
    id?: UuidFilter<"CpSession"> | string
    expiresAt?: DateTimeFilter<"CpSession"> | Date | string
    token?: StringFilter<"CpSession"> | string
    createdAt?: DateTimeFilter<"CpSession"> | Date | string
    updatedAt?: DateTimeFilter<"CpSession"> | Date | string
    ipAddress?: StringNullableFilter<"CpSession"> | string | null
    userAgent?: StringNullableFilter<"CpSession"> | string | null
    userId?: UuidFilter<"CpSession"> | string
    user?: XOR<CpUserRelationFilter, CpUserWhereInput>
  }

  export type CpSessionOrderByWithRelationInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    userId?: SortOrder
    user?: CpUserOrderByWithRelationInput
  }

  export type CpSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: CpSessionWhereInput | CpSessionWhereInput[]
    OR?: CpSessionWhereInput[]
    NOT?: CpSessionWhereInput | CpSessionWhereInput[]
    expiresAt?: DateTimeFilter<"CpSession"> | Date | string
    createdAt?: DateTimeFilter<"CpSession"> | Date | string
    updatedAt?: DateTimeFilter<"CpSession"> | Date | string
    ipAddress?: StringNullableFilter<"CpSession"> | string | null
    userAgent?: StringNullableFilter<"CpSession"> | string | null
    userId?: UuidFilter<"CpSession"> | string
    user?: XOR<CpUserRelationFilter, CpUserWhereInput>
  }, "id" | "token">

  export type CpSessionOrderByWithAggregationInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    userId?: SortOrder
    _count?: CpSessionCountOrderByAggregateInput
    _max?: CpSessionMaxOrderByAggregateInput
    _min?: CpSessionMinOrderByAggregateInput
  }

  export type CpSessionScalarWhereWithAggregatesInput = {
    AND?: CpSessionScalarWhereWithAggregatesInput | CpSessionScalarWhereWithAggregatesInput[]
    OR?: CpSessionScalarWhereWithAggregatesInput[]
    NOT?: CpSessionScalarWhereWithAggregatesInput | CpSessionScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"CpSession"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"CpSession"> | Date | string
    token?: StringWithAggregatesFilter<"CpSession"> | string
    createdAt?: DateTimeWithAggregatesFilter<"CpSession"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CpSession"> | Date | string
    ipAddress?: StringNullableWithAggregatesFilter<"CpSession"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"CpSession"> | string | null
    userId?: UuidWithAggregatesFilter<"CpSession"> | string
  }

  export type CpAccountWhereInput = {
    AND?: CpAccountWhereInput | CpAccountWhereInput[]
    OR?: CpAccountWhereInput[]
    NOT?: CpAccountWhereInput | CpAccountWhereInput[]
    id?: UuidFilter<"CpAccount"> | string
    accountId?: StringFilter<"CpAccount"> | string
    providerId?: StringFilter<"CpAccount"> | string
    userId?: UuidFilter<"CpAccount"> | string
    accessToken?: StringNullableFilter<"CpAccount"> | string | null
    refreshToken?: StringNullableFilter<"CpAccount"> | string | null
    idToken?: StringNullableFilter<"CpAccount"> | string | null
    expiresAt?: DateTimeNullableFilter<"CpAccount"> | Date | string | null
    password?: StringNullableFilter<"CpAccount"> | string | null
    createdAt?: DateTimeFilter<"CpAccount"> | Date | string
    updatedAt?: DateTimeFilter<"CpAccount"> | Date | string
    user?: XOR<CpUserRelationFilter, CpUserWhereInput>
  }

  export type CpAccountOrderByWithRelationInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    idToken?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: CpUserOrderByWithRelationInput
  }

  export type CpAccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    providerId_accountId?: CpAccountProviderIdAccountIdCompoundUniqueInput
    AND?: CpAccountWhereInput | CpAccountWhereInput[]
    OR?: CpAccountWhereInput[]
    NOT?: CpAccountWhereInput | CpAccountWhereInput[]
    accountId?: StringFilter<"CpAccount"> | string
    providerId?: StringFilter<"CpAccount"> | string
    userId?: UuidFilter<"CpAccount"> | string
    accessToken?: StringNullableFilter<"CpAccount"> | string | null
    refreshToken?: StringNullableFilter<"CpAccount"> | string | null
    idToken?: StringNullableFilter<"CpAccount"> | string | null
    expiresAt?: DateTimeNullableFilter<"CpAccount"> | Date | string | null
    password?: StringNullableFilter<"CpAccount"> | string | null
    createdAt?: DateTimeFilter<"CpAccount"> | Date | string
    updatedAt?: DateTimeFilter<"CpAccount"> | Date | string
    user?: XOR<CpUserRelationFilter, CpUserWhereInput>
  }, "id" | "providerId_accountId">

  export type CpAccountOrderByWithAggregationInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    idToken?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CpAccountCountOrderByAggregateInput
    _max?: CpAccountMaxOrderByAggregateInput
    _min?: CpAccountMinOrderByAggregateInput
  }

  export type CpAccountScalarWhereWithAggregatesInput = {
    AND?: CpAccountScalarWhereWithAggregatesInput | CpAccountScalarWhereWithAggregatesInput[]
    OR?: CpAccountScalarWhereWithAggregatesInput[]
    NOT?: CpAccountScalarWhereWithAggregatesInput | CpAccountScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"CpAccount"> | string
    accountId?: StringWithAggregatesFilter<"CpAccount"> | string
    providerId?: StringWithAggregatesFilter<"CpAccount"> | string
    userId?: UuidWithAggregatesFilter<"CpAccount"> | string
    accessToken?: StringNullableWithAggregatesFilter<"CpAccount"> | string | null
    refreshToken?: StringNullableWithAggregatesFilter<"CpAccount"> | string | null
    idToken?: StringNullableWithAggregatesFilter<"CpAccount"> | string | null
    expiresAt?: DateTimeNullableWithAggregatesFilter<"CpAccount"> | Date | string | null
    password?: StringNullableWithAggregatesFilter<"CpAccount"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"CpAccount"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CpAccount"> | Date | string
  }

  export type CpVerificationWhereInput = {
    AND?: CpVerificationWhereInput | CpVerificationWhereInput[]
    OR?: CpVerificationWhereInput[]
    NOT?: CpVerificationWhereInput | CpVerificationWhereInput[]
    id?: UuidFilter<"CpVerification"> | string
    identifier?: StringFilter<"CpVerification"> | string
    value?: StringFilter<"CpVerification"> | string
    expiresAt?: DateTimeFilter<"CpVerification"> | Date | string
    createdAt?: DateTimeNullableFilter<"CpVerification"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"CpVerification"> | Date | string | null
  }

  export type CpVerificationOrderByWithRelationInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
  }

  export type CpVerificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CpVerificationWhereInput | CpVerificationWhereInput[]
    OR?: CpVerificationWhereInput[]
    NOT?: CpVerificationWhereInput | CpVerificationWhereInput[]
    identifier?: StringFilter<"CpVerification"> | string
    value?: StringFilter<"CpVerification"> | string
    expiresAt?: DateTimeFilter<"CpVerification"> | Date | string
    createdAt?: DateTimeNullableFilter<"CpVerification"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"CpVerification"> | Date | string | null
  }, "id">

  export type CpVerificationOrderByWithAggregationInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _count?: CpVerificationCountOrderByAggregateInput
    _max?: CpVerificationMaxOrderByAggregateInput
    _min?: CpVerificationMinOrderByAggregateInput
  }

  export type CpVerificationScalarWhereWithAggregatesInput = {
    AND?: CpVerificationScalarWhereWithAggregatesInput | CpVerificationScalarWhereWithAggregatesInput[]
    OR?: CpVerificationScalarWhereWithAggregatesInput[]
    NOT?: CpVerificationScalarWhereWithAggregatesInput | CpVerificationScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"CpVerification"> | string
    identifier?: StringWithAggregatesFilter<"CpVerification"> | string
    value?: StringWithAggregatesFilter<"CpVerification"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"CpVerification"> | Date | string
    createdAt?: DateTimeNullableWithAggregatesFilter<"CpVerification"> | Date | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"CpVerification"> | Date | string | null
  }

  export type CpPatientIndexWhereInput = {
    AND?: CpPatientIndexWhereInput | CpPatientIndexWhereInput[]
    OR?: CpPatientIndexWhereInput[]
    NOT?: CpPatientIndexWhereInput | CpPatientIndexWhereInput[]
    id?: UuidFilter<"CpPatientIndex"> | string
    patientPin?: StringFilter<"CpPatientIndex"> | string
    firstName?: StringFilter<"CpPatientIndex"> | string
    lastName?: StringFilter<"CpPatientIndex"> | string
    birthDate?: DateTimeFilter<"CpPatientIndex"> | Date | string
    sex?: StringFilter<"CpPatientIndex"> | string
    orgId?: UuidFilter<"CpPatientIndex"> | string
    orgSlug?: StringFilter<"CpPatientIndex"> | string
    createdAt?: DateTimeFilter<"CpPatientIndex"> | Date | string
    organization?: XOR<CpOrganizationRelationFilter, CpOrganizationWhereInput>
  }

  export type CpPatientIndexOrderByWithRelationInput = {
    id?: SortOrder
    patientPin?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    birthDate?: SortOrder
    sex?: SortOrder
    orgId?: SortOrder
    orgSlug?: SortOrder
    createdAt?: SortOrder
    organization?: CpOrganizationOrderByWithRelationInput
  }

  export type CpPatientIndexWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    patientPin?: string
    AND?: CpPatientIndexWhereInput | CpPatientIndexWhereInput[]
    OR?: CpPatientIndexWhereInput[]
    NOT?: CpPatientIndexWhereInput | CpPatientIndexWhereInput[]
    firstName?: StringFilter<"CpPatientIndex"> | string
    lastName?: StringFilter<"CpPatientIndex"> | string
    birthDate?: DateTimeFilter<"CpPatientIndex"> | Date | string
    sex?: StringFilter<"CpPatientIndex"> | string
    orgId?: UuidFilter<"CpPatientIndex"> | string
    orgSlug?: StringFilter<"CpPatientIndex"> | string
    createdAt?: DateTimeFilter<"CpPatientIndex"> | Date | string
    organization?: XOR<CpOrganizationRelationFilter, CpOrganizationWhereInput>
  }, "id" | "patientPin">

  export type CpPatientIndexOrderByWithAggregationInput = {
    id?: SortOrder
    patientPin?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    birthDate?: SortOrder
    sex?: SortOrder
    orgId?: SortOrder
    orgSlug?: SortOrder
    createdAt?: SortOrder
    _count?: CpPatientIndexCountOrderByAggregateInput
    _max?: CpPatientIndexMaxOrderByAggregateInput
    _min?: CpPatientIndexMinOrderByAggregateInput
  }

  export type CpPatientIndexScalarWhereWithAggregatesInput = {
    AND?: CpPatientIndexScalarWhereWithAggregatesInput | CpPatientIndexScalarWhereWithAggregatesInput[]
    OR?: CpPatientIndexScalarWhereWithAggregatesInput[]
    NOT?: CpPatientIndexScalarWhereWithAggregatesInput | CpPatientIndexScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"CpPatientIndex"> | string
    patientPin?: StringWithAggregatesFilter<"CpPatientIndex"> | string
    firstName?: StringWithAggregatesFilter<"CpPatientIndex"> | string
    lastName?: StringWithAggregatesFilter<"CpPatientIndex"> | string
    birthDate?: DateTimeWithAggregatesFilter<"CpPatientIndex"> | Date | string
    sex?: StringWithAggregatesFilter<"CpPatientIndex"> | string
    orgId?: UuidWithAggregatesFilter<"CpPatientIndex"> | string
    orgSlug?: StringWithAggregatesFilter<"CpPatientIndex"> | string
    createdAt?: DateTimeWithAggregatesFilter<"CpPatientIndex"> | Date | string
  }

  export type CpOrganizationCreateInput = {
    id?: string
    name: string
    slug: string
    type: string
    status?: string
    billingEmail?: string | null
    billingPlan?: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    maxStaffSeats?: number
    maxPatientRecords?: number
    maxStorageMb?: bigint | number
    customDomain?: string | null
    customDomainStatus?: string
    dnsVerificationToken?: string | null
    sslStatus?: string
    primaryColor?: string
    secondaryColor?: string
    logoUrl?: string | null
    deploymentUrl?: string | null
    dbConnectionUri?: string | null
    dbSchemaVersion?: string | null
    trialEndsAt?: Date | string | null
    contractStart?: Date | string | null
    contractEnd?: Date | string | null
    createdAt?: Date | string
    allowCrossOrgReferrals?: boolean
    referralCapacityStatus?: string
    referralGeographicScope?: string
    acceptedReferralTypes?: string
    featureFlags?: CpFeatureFlagCreateNestedManyWithoutOrganizationInput
    usageMetrics?: CpUsageMetricCreateNestedManyWithoutOrganizationInput
    tempAccessGrants?: CpTempAccessGrantCreateNestedManyWithoutOrganizationInput
    tenantDbUpgrades?: CpTenantDbUpgradeCreateNestedManyWithoutOrganizationInput
    incidents?: CpIncidentCreateNestedManyWithoutOrganizationInput
    migrations?: CpMigrationCreateNestedManyWithoutOrganizationInput
    patientIndexes?: CpPatientIndexCreateNestedManyWithoutOrganizationInput
  }

  export type CpOrganizationUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    type: string
    status?: string
    billingEmail?: string | null
    billingPlan?: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    maxStaffSeats?: number
    maxPatientRecords?: number
    maxStorageMb?: bigint | number
    customDomain?: string | null
    customDomainStatus?: string
    dnsVerificationToken?: string | null
    sslStatus?: string
    primaryColor?: string
    secondaryColor?: string
    logoUrl?: string | null
    deploymentUrl?: string | null
    dbConnectionUri?: string | null
    dbSchemaVersion?: string | null
    trialEndsAt?: Date | string | null
    contractStart?: Date | string | null
    contractEnd?: Date | string | null
    createdAt?: Date | string
    allowCrossOrgReferrals?: boolean
    referralCapacityStatus?: string
    referralGeographicScope?: string
    acceptedReferralTypes?: string
    featureFlags?: CpFeatureFlagUncheckedCreateNestedManyWithoutOrganizationInput
    usageMetrics?: CpUsageMetricUncheckedCreateNestedManyWithoutOrganizationInput
    tempAccessGrants?: CpTempAccessGrantUncheckedCreateNestedManyWithoutOrganizationInput
    tenantDbUpgrades?: CpTenantDbUpgradeUncheckedCreateNestedManyWithoutOrganizationInput
    incidents?: CpIncidentUncheckedCreateNestedManyWithoutOrganizationInput
    migrations?: CpMigrationUncheckedCreateNestedManyWithoutOrganizationInput
    patientIndexes?: CpPatientIndexUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type CpOrganizationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    billingEmail?: NullableStringFieldUpdateOperationsInput | string | null
    billingPlan?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    maxStaffSeats?: IntFieldUpdateOperationsInput | number
    maxPatientRecords?: IntFieldUpdateOperationsInput | number
    maxStorageMb?: BigIntFieldUpdateOperationsInput | bigint | number
    customDomain?: NullableStringFieldUpdateOperationsInput | string | null
    customDomainStatus?: StringFieldUpdateOperationsInput | string
    dnsVerificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    sslStatus?: StringFieldUpdateOperationsInput | string
    primaryColor?: StringFieldUpdateOperationsInput | string
    secondaryColor?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    deploymentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    dbConnectionUri?: NullableStringFieldUpdateOperationsInput | string | null
    dbSchemaVersion?: NullableStringFieldUpdateOperationsInput | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    contractStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    contractEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    allowCrossOrgReferrals?: BoolFieldUpdateOperationsInput | boolean
    referralCapacityStatus?: StringFieldUpdateOperationsInput | string
    referralGeographicScope?: StringFieldUpdateOperationsInput | string
    acceptedReferralTypes?: StringFieldUpdateOperationsInput | string
    featureFlags?: CpFeatureFlagUpdateManyWithoutOrganizationNestedInput
    usageMetrics?: CpUsageMetricUpdateManyWithoutOrganizationNestedInput
    tempAccessGrants?: CpTempAccessGrantUpdateManyWithoutOrganizationNestedInput
    tenantDbUpgrades?: CpTenantDbUpgradeUpdateManyWithoutOrganizationNestedInput
    incidents?: CpIncidentUpdateManyWithoutOrganizationNestedInput
    migrations?: CpMigrationUpdateManyWithoutOrganizationNestedInput
    patientIndexes?: CpPatientIndexUpdateManyWithoutOrganizationNestedInput
  }

  export type CpOrganizationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    billingEmail?: NullableStringFieldUpdateOperationsInput | string | null
    billingPlan?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    maxStaffSeats?: IntFieldUpdateOperationsInput | number
    maxPatientRecords?: IntFieldUpdateOperationsInput | number
    maxStorageMb?: BigIntFieldUpdateOperationsInput | bigint | number
    customDomain?: NullableStringFieldUpdateOperationsInput | string | null
    customDomainStatus?: StringFieldUpdateOperationsInput | string
    dnsVerificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    sslStatus?: StringFieldUpdateOperationsInput | string
    primaryColor?: StringFieldUpdateOperationsInput | string
    secondaryColor?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    deploymentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    dbConnectionUri?: NullableStringFieldUpdateOperationsInput | string | null
    dbSchemaVersion?: NullableStringFieldUpdateOperationsInput | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    contractStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    contractEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    allowCrossOrgReferrals?: BoolFieldUpdateOperationsInput | boolean
    referralCapacityStatus?: StringFieldUpdateOperationsInput | string
    referralGeographicScope?: StringFieldUpdateOperationsInput | string
    acceptedReferralTypes?: StringFieldUpdateOperationsInput | string
    featureFlags?: CpFeatureFlagUncheckedUpdateManyWithoutOrganizationNestedInput
    usageMetrics?: CpUsageMetricUncheckedUpdateManyWithoutOrganizationNestedInput
    tempAccessGrants?: CpTempAccessGrantUncheckedUpdateManyWithoutOrganizationNestedInput
    tenantDbUpgrades?: CpTenantDbUpgradeUncheckedUpdateManyWithoutOrganizationNestedInput
    incidents?: CpIncidentUncheckedUpdateManyWithoutOrganizationNestedInput
    migrations?: CpMigrationUncheckedUpdateManyWithoutOrganizationNestedInput
    patientIndexes?: CpPatientIndexUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type CpOrganizationCreateManyInput = {
    id?: string
    name: string
    slug: string
    type: string
    status?: string
    billingEmail?: string | null
    billingPlan?: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    maxStaffSeats?: number
    maxPatientRecords?: number
    maxStorageMb?: bigint | number
    customDomain?: string | null
    customDomainStatus?: string
    dnsVerificationToken?: string | null
    sslStatus?: string
    primaryColor?: string
    secondaryColor?: string
    logoUrl?: string | null
    deploymentUrl?: string | null
    dbConnectionUri?: string | null
    dbSchemaVersion?: string | null
    trialEndsAt?: Date | string | null
    contractStart?: Date | string | null
    contractEnd?: Date | string | null
    createdAt?: Date | string
    allowCrossOrgReferrals?: boolean
    referralCapacityStatus?: string
    referralGeographicScope?: string
    acceptedReferralTypes?: string
  }

  export type CpOrganizationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    billingEmail?: NullableStringFieldUpdateOperationsInput | string | null
    billingPlan?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    maxStaffSeats?: IntFieldUpdateOperationsInput | number
    maxPatientRecords?: IntFieldUpdateOperationsInput | number
    maxStorageMb?: BigIntFieldUpdateOperationsInput | bigint | number
    customDomain?: NullableStringFieldUpdateOperationsInput | string | null
    customDomainStatus?: StringFieldUpdateOperationsInput | string
    dnsVerificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    sslStatus?: StringFieldUpdateOperationsInput | string
    primaryColor?: StringFieldUpdateOperationsInput | string
    secondaryColor?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    deploymentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    dbConnectionUri?: NullableStringFieldUpdateOperationsInput | string | null
    dbSchemaVersion?: NullableStringFieldUpdateOperationsInput | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    contractStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    contractEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    allowCrossOrgReferrals?: BoolFieldUpdateOperationsInput | boolean
    referralCapacityStatus?: StringFieldUpdateOperationsInput | string
    referralGeographicScope?: StringFieldUpdateOperationsInput | string
    acceptedReferralTypes?: StringFieldUpdateOperationsInput | string
  }

  export type CpOrganizationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    billingEmail?: NullableStringFieldUpdateOperationsInput | string | null
    billingPlan?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    maxStaffSeats?: IntFieldUpdateOperationsInput | number
    maxPatientRecords?: IntFieldUpdateOperationsInput | number
    maxStorageMb?: BigIntFieldUpdateOperationsInput | bigint | number
    customDomain?: NullableStringFieldUpdateOperationsInput | string | null
    customDomainStatus?: StringFieldUpdateOperationsInput | string
    dnsVerificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    sslStatus?: StringFieldUpdateOperationsInput | string
    primaryColor?: StringFieldUpdateOperationsInput | string
    secondaryColor?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    deploymentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    dbConnectionUri?: NullableStringFieldUpdateOperationsInput | string | null
    dbSchemaVersion?: NullableStringFieldUpdateOperationsInput | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    contractStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    contractEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    allowCrossOrgReferrals?: BoolFieldUpdateOperationsInput | boolean
    referralCapacityStatus?: StringFieldUpdateOperationsInput | string
    referralGeographicScope?: StringFieldUpdateOperationsInput | string
    acceptedReferralTypes?: StringFieldUpdateOperationsInput | string
  }

  export type CpFeatureFlagCreateInput = {
    featureKey: string
    isEnabled?: boolean
    configuredAt?: Date | string
    configuredBy?: string | null
    organization: CpOrganizationCreateNestedOneWithoutFeatureFlagsInput
  }

  export type CpFeatureFlagUncheckedCreateInput = {
    orgId: string
    featureKey: string
    isEnabled?: boolean
    configuredAt?: Date | string
    configuredBy?: string | null
  }

  export type CpFeatureFlagUpdateInput = {
    featureKey?: StringFieldUpdateOperationsInput | string
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    configuredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    configuredBy?: NullableStringFieldUpdateOperationsInput | string | null
    organization?: CpOrganizationUpdateOneRequiredWithoutFeatureFlagsNestedInput
  }

  export type CpFeatureFlagUncheckedUpdateInput = {
    orgId?: StringFieldUpdateOperationsInput | string
    featureKey?: StringFieldUpdateOperationsInput | string
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    configuredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    configuredBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CpFeatureFlagCreateManyInput = {
    orgId: string
    featureKey: string
    isEnabled?: boolean
    configuredAt?: Date | string
    configuredBy?: string | null
  }

  export type CpFeatureFlagUpdateManyMutationInput = {
    featureKey?: StringFieldUpdateOperationsInput | string
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    configuredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    configuredBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CpFeatureFlagUncheckedUpdateManyInput = {
    orgId?: StringFieldUpdateOperationsInput | string
    featureKey?: StringFieldUpdateOperationsInput | string
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    configuredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    configuredBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CpUsageMetricCreateInput = {
    id?: string
    recordedAt?: Date | string
    activeStaffCount?: number
    patientRecordsCount?: number
    storageBytesUsed?: bigint | number
    smsSentThisMonth?: number
    apiRequestsCount?: number
    organization: CpOrganizationCreateNestedOneWithoutUsageMetricsInput
  }

  export type CpUsageMetricUncheckedCreateInput = {
    id?: string
    orgId: string
    recordedAt?: Date | string
    activeStaffCount?: number
    patientRecordsCount?: number
    storageBytesUsed?: bigint | number
    smsSentThisMonth?: number
    apiRequestsCount?: number
  }

  export type CpUsageMetricUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    recordedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activeStaffCount?: IntFieldUpdateOperationsInput | number
    patientRecordsCount?: IntFieldUpdateOperationsInput | number
    storageBytesUsed?: BigIntFieldUpdateOperationsInput | bigint | number
    smsSentThisMonth?: IntFieldUpdateOperationsInput | number
    apiRequestsCount?: IntFieldUpdateOperationsInput | number
    organization?: CpOrganizationUpdateOneRequiredWithoutUsageMetricsNestedInput
  }

  export type CpUsageMetricUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    recordedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activeStaffCount?: IntFieldUpdateOperationsInput | number
    patientRecordsCount?: IntFieldUpdateOperationsInput | number
    storageBytesUsed?: BigIntFieldUpdateOperationsInput | bigint | number
    smsSentThisMonth?: IntFieldUpdateOperationsInput | number
    apiRequestsCount?: IntFieldUpdateOperationsInput | number
  }

  export type CpUsageMetricCreateManyInput = {
    id?: string
    orgId: string
    recordedAt?: Date | string
    activeStaffCount?: number
    patientRecordsCount?: number
    storageBytesUsed?: bigint | number
    smsSentThisMonth?: number
    apiRequestsCount?: number
  }

  export type CpUsageMetricUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    recordedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activeStaffCount?: IntFieldUpdateOperationsInput | number
    patientRecordsCount?: IntFieldUpdateOperationsInput | number
    storageBytesUsed?: BigIntFieldUpdateOperationsInput | bigint | number
    smsSentThisMonth?: IntFieldUpdateOperationsInput | number
    apiRequestsCount?: IntFieldUpdateOperationsInput | number
  }

  export type CpUsageMetricUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    recordedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activeStaffCount?: IntFieldUpdateOperationsInput | number
    patientRecordsCount?: IntFieldUpdateOperationsInput | number
    storageBytesUsed?: BigIntFieldUpdateOperationsInput | bigint | number
    smsSentThisMonth?: IntFieldUpdateOperationsInput | number
    apiRequestsCount?: IntFieldUpdateOperationsInput | number
  }

  export type CpPluginDirectoryCreateInput = {
    id?: string
    pluginId: string
    name: string
    description?: string | null
    version: string
    isPublished?: boolean
    publishedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type CpPluginDirectoryUncheckedCreateInput = {
    id?: string
    pluginId: string
    name: string
    description?: string | null
    version: string
    isPublished?: boolean
    publishedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type CpPluginDirectoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    pluginId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    version?: StringFieldUpdateOperationsInput | string
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CpPluginDirectoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    pluginId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    version?: StringFieldUpdateOperationsInput | string
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CpPluginDirectoryCreateManyInput = {
    id?: string
    pluginId: string
    name: string
    description?: string | null
    version: string
    isPublished?: boolean
    publishedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type CpPluginDirectoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    pluginId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    version?: StringFieldUpdateOperationsInput | string
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CpPluginDirectoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    pluginId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    version?: StringFieldUpdateOperationsInput | string
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CpTempAccessGrantCreateInput = {
    id?: string
    requestedBy: string
    reason: string
    scope: string
    durationHours: number
    status?: string
    requestedAt?: Date | string
    approvedAt?: Date | string | null
    approvedBy?: string | null
    expiresAt?: Date | string | null
    revokedAt?: Date | string | null
    revokedBy?: string | null
    organization: CpOrganizationCreateNestedOneWithoutTempAccessGrantsInput
  }

  export type CpTempAccessGrantUncheckedCreateInput = {
    id?: string
    orgId: string
    requestedBy: string
    reason: string
    scope: string
    durationHours: number
    status?: string
    requestedAt?: Date | string
    approvedAt?: Date | string | null
    approvedBy?: string | null
    expiresAt?: Date | string | null
    revokedAt?: Date | string | null
    revokedBy?: string | null
  }

  export type CpTempAccessGrantUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestedBy?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    durationHours?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedBy?: NullableStringFieldUpdateOperationsInput | string | null
    organization?: CpOrganizationUpdateOneRequiredWithoutTempAccessGrantsNestedInput
  }

  export type CpTempAccessGrantUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    requestedBy?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    durationHours?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CpTempAccessGrantCreateManyInput = {
    id?: string
    orgId: string
    requestedBy: string
    reason: string
    scope: string
    durationHours: number
    status?: string
    requestedAt?: Date | string
    approvedAt?: Date | string | null
    approvedBy?: string | null
    expiresAt?: Date | string | null
    revokedAt?: Date | string | null
    revokedBy?: string | null
  }

  export type CpTempAccessGrantUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestedBy?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    durationHours?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CpTempAccessGrantUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    requestedBy?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    durationHours?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CpTenantDbUpgradeCreateInput = {
    id?: string
    schemaVersion: string
    status: string
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    errorLog?: string | null
    organization: CpOrganizationCreateNestedOneWithoutTenantDbUpgradesInput
  }

  export type CpTenantDbUpgradeUncheckedCreateInput = {
    id?: string
    orgId: string
    schemaVersion: string
    status: string
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    errorLog?: string | null
  }

  export type CpTenantDbUpgradeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    schemaVersion?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    errorLog?: NullableStringFieldUpdateOperationsInput | string | null
    organization?: CpOrganizationUpdateOneRequiredWithoutTenantDbUpgradesNestedInput
  }

  export type CpTenantDbUpgradeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    schemaVersion?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    errorLog?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CpTenantDbUpgradeCreateManyInput = {
    id?: string
    orgId: string
    schemaVersion: string
    status: string
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    errorLog?: string | null
  }

  export type CpTenantDbUpgradeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    schemaVersion?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    errorLog?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CpTenantDbUpgradeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    schemaVersion?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    errorLog?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CpIncidentCreateInput = {
    id?: string
    title: string
    description?: string | null
    severity?: string | null
    status?: string
    createdBy?: string | null
    createdAt?: Date | string
    resolvedAt?: Date | string | null
    organization?: CpOrganizationCreateNestedOneWithoutIncidentsInput
  }

  export type CpIncidentUncheckedCreateInput = {
    id?: string
    orgId?: string | null
    title: string
    description?: string | null
    severity?: string | null
    status?: string
    createdBy?: string | null
    createdAt?: Date | string
    resolvedAt?: Date | string | null
  }

  export type CpIncidentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    severity?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organization?: CpOrganizationUpdateOneWithoutIncidentsNestedInput
  }

  export type CpIncidentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    severity?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CpIncidentCreateManyInput = {
    id?: string
    orgId?: string | null
    title: string
    description?: string | null
    severity?: string | null
    status?: string
    createdBy?: string | null
    createdAt?: Date | string
    resolvedAt?: Date | string | null
  }

  export type CpIncidentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    severity?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CpIncidentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    severity?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CpMigrationCreateInput = {
    id?: string
    sourceSystem: string
    status: string
    totalRecords?: number | null
    successCount?: number | null
    failedCount?: number | null
    runBy?: string | null
    runAt?: Date | string
    notes?: string | null
    organization: CpOrganizationCreateNestedOneWithoutMigrationsInput
  }

  export type CpMigrationUncheckedCreateInput = {
    id?: string
    orgId: string
    sourceSystem: string
    status: string
    totalRecords?: number | null
    successCount?: number | null
    failedCount?: number | null
    runBy?: string | null
    runAt?: Date | string
    notes?: string | null
  }

  export type CpMigrationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceSystem?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    totalRecords?: NullableIntFieldUpdateOperationsInput | number | null
    successCount?: NullableIntFieldUpdateOperationsInput | number | null
    failedCount?: NullableIntFieldUpdateOperationsInput | number | null
    runBy?: NullableStringFieldUpdateOperationsInput | string | null
    runAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    organization?: CpOrganizationUpdateOneRequiredWithoutMigrationsNestedInput
  }

  export type CpMigrationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    sourceSystem?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    totalRecords?: NullableIntFieldUpdateOperationsInput | number | null
    successCount?: NullableIntFieldUpdateOperationsInput | number | null
    failedCount?: NullableIntFieldUpdateOperationsInput | number | null
    runBy?: NullableStringFieldUpdateOperationsInput | string | null
    runAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CpMigrationCreateManyInput = {
    id?: string
    orgId: string
    sourceSystem: string
    status: string
    totalRecords?: number | null
    successCount?: number | null
    failedCount?: number | null
    runBy?: string | null
    runAt?: Date | string
    notes?: string | null
  }

  export type CpMigrationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceSystem?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    totalRecords?: NullableIntFieldUpdateOperationsInput | number | null
    successCount?: NullableIntFieldUpdateOperationsInput | number | null
    failedCount?: NullableIntFieldUpdateOperationsInput | number | null
    runBy?: NullableStringFieldUpdateOperationsInput | string | null
    runAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CpMigrationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    sourceSystem?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    totalRecords?: NullableIntFieldUpdateOperationsInput | number | null
    successCount?: NullableIntFieldUpdateOperationsInput | number | null
    failedCount?: NullableIntFieldUpdateOperationsInput | number | null
    runBy?: NullableStringFieldUpdateOperationsInput | string | null
    runAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CpUserCreateInput = {
    id?: string
    email: string
    name?: string | null
    emailVerified?: boolean
    image?: string | null
    passwordHash?: string | null
    mfaEnabled?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: CpSessionCreateNestedManyWithoutUserInput
    accounts?: CpAccountCreateNestedManyWithoutUserInput
  }

  export type CpUserUncheckedCreateInput = {
    id?: string
    email: string
    name?: string | null
    emailVerified?: boolean
    image?: string | null
    passwordHash?: string | null
    mfaEnabled?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: CpSessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: CpAccountUncheckedCreateNestedManyWithoutUserInput
  }

  export type CpUserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    mfaEnabled?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: CpSessionUpdateManyWithoutUserNestedInput
    accounts?: CpAccountUpdateManyWithoutUserNestedInput
  }

  export type CpUserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    mfaEnabled?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: CpSessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: CpAccountUncheckedUpdateManyWithoutUserNestedInput
  }

  export type CpUserCreateManyInput = {
    id?: string
    email: string
    name?: string | null
    emailVerified?: boolean
    image?: string | null
    passwordHash?: string | null
    mfaEnabled?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CpUserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    mfaEnabled?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CpUserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    mfaEnabled?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CpSessionCreateInput = {
    id?: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    user: CpUserCreateNestedOneWithoutSessionsInput
  }

  export type CpSessionUncheckedCreateInput = {
    id?: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    userId: string
  }

  export type CpSessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    user?: CpUserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type CpSessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type CpSessionCreateManyInput = {
    id?: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    userId: string
  }

  export type CpSessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CpSessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type CpAccountCreateInput = {
    id?: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    expiresAt?: Date | string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: CpUserCreateNestedOneWithoutAccountsInput
  }

  export type CpAccountUncheckedCreateInput = {
    id?: string
    accountId: string
    providerId: string
    userId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    expiresAt?: Date | string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CpAccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: CpUserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type CpAccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CpAccountCreateManyInput = {
    id?: string
    accountId: string
    providerId: string
    userId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    expiresAt?: Date | string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CpAccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CpAccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CpVerificationCreateInput = {
    id?: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type CpVerificationUncheckedCreateInput = {
    id?: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type CpVerificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CpVerificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CpVerificationCreateManyInput = {
    id?: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type CpVerificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CpVerificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CpPatientIndexCreateInput = {
    id?: string
    patientPin: string
    firstName: string
    lastName: string
    birthDate: Date | string
    sex: string
    orgSlug: string
    createdAt?: Date | string
    organization: CpOrganizationCreateNestedOneWithoutPatientIndexesInput
  }

  export type CpPatientIndexUncheckedCreateInput = {
    id?: string
    patientPin: string
    firstName: string
    lastName: string
    birthDate: Date | string
    sex: string
    orgId: string
    orgSlug: string
    createdAt?: Date | string
  }

  export type CpPatientIndexUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientPin?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    sex?: StringFieldUpdateOperationsInput | string
    orgSlug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: CpOrganizationUpdateOneRequiredWithoutPatientIndexesNestedInput
  }

  export type CpPatientIndexUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientPin?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    sex?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    orgSlug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CpPatientIndexCreateManyInput = {
    id?: string
    patientPin: string
    firstName: string
    lastName: string
    birthDate: Date | string
    sex: string
    orgId: string
    orgSlug: string
    createdAt?: Date | string
  }

  export type CpPatientIndexUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientPin?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    sex?: StringFieldUpdateOperationsInput | string
    orgSlug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CpPatientIndexUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientPin?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    sex?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    orgSlug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
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

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type CpFeatureFlagListRelationFilter = {
    every?: CpFeatureFlagWhereInput
    some?: CpFeatureFlagWhereInput
    none?: CpFeatureFlagWhereInput
  }

  export type CpUsageMetricListRelationFilter = {
    every?: CpUsageMetricWhereInput
    some?: CpUsageMetricWhereInput
    none?: CpUsageMetricWhereInput
  }

  export type CpTempAccessGrantListRelationFilter = {
    every?: CpTempAccessGrantWhereInput
    some?: CpTempAccessGrantWhereInput
    none?: CpTempAccessGrantWhereInput
  }

  export type CpTenantDbUpgradeListRelationFilter = {
    every?: CpTenantDbUpgradeWhereInput
    some?: CpTenantDbUpgradeWhereInput
    none?: CpTenantDbUpgradeWhereInput
  }

  export type CpIncidentListRelationFilter = {
    every?: CpIncidentWhereInput
    some?: CpIncidentWhereInput
    none?: CpIncidentWhereInput
  }

  export type CpMigrationListRelationFilter = {
    every?: CpMigrationWhereInput
    some?: CpMigrationWhereInput
    none?: CpMigrationWhereInput
  }

  export type CpPatientIndexListRelationFilter = {
    every?: CpPatientIndexWhereInput
    some?: CpPatientIndexWhereInput
    none?: CpPatientIndexWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type CpFeatureFlagOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CpUsageMetricOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CpTempAccessGrantOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CpTenantDbUpgradeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CpIncidentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CpMigrationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CpPatientIndexOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CpOrganizationCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    type?: SortOrder
    status?: SortOrder
    billingEmail?: SortOrder
    billingPlan?: SortOrder
    stripeCustomerId?: SortOrder
    stripeSubscriptionId?: SortOrder
    maxStaffSeats?: SortOrder
    maxPatientRecords?: SortOrder
    maxStorageMb?: SortOrder
    customDomain?: SortOrder
    customDomainStatus?: SortOrder
    dnsVerificationToken?: SortOrder
    sslStatus?: SortOrder
    primaryColor?: SortOrder
    secondaryColor?: SortOrder
    logoUrl?: SortOrder
    deploymentUrl?: SortOrder
    dbConnectionUri?: SortOrder
    dbSchemaVersion?: SortOrder
    trialEndsAt?: SortOrder
    contractStart?: SortOrder
    contractEnd?: SortOrder
    createdAt?: SortOrder
    allowCrossOrgReferrals?: SortOrder
    referralCapacityStatus?: SortOrder
    referralGeographicScope?: SortOrder
    acceptedReferralTypes?: SortOrder
  }

  export type CpOrganizationAvgOrderByAggregateInput = {
    maxStaffSeats?: SortOrder
    maxPatientRecords?: SortOrder
    maxStorageMb?: SortOrder
  }

  export type CpOrganizationMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    type?: SortOrder
    status?: SortOrder
    billingEmail?: SortOrder
    billingPlan?: SortOrder
    stripeCustomerId?: SortOrder
    stripeSubscriptionId?: SortOrder
    maxStaffSeats?: SortOrder
    maxPatientRecords?: SortOrder
    maxStorageMb?: SortOrder
    customDomain?: SortOrder
    customDomainStatus?: SortOrder
    dnsVerificationToken?: SortOrder
    sslStatus?: SortOrder
    primaryColor?: SortOrder
    secondaryColor?: SortOrder
    logoUrl?: SortOrder
    deploymentUrl?: SortOrder
    dbConnectionUri?: SortOrder
    dbSchemaVersion?: SortOrder
    trialEndsAt?: SortOrder
    contractStart?: SortOrder
    contractEnd?: SortOrder
    createdAt?: SortOrder
    allowCrossOrgReferrals?: SortOrder
    referralCapacityStatus?: SortOrder
    referralGeographicScope?: SortOrder
    acceptedReferralTypes?: SortOrder
  }

  export type CpOrganizationMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    type?: SortOrder
    status?: SortOrder
    billingEmail?: SortOrder
    billingPlan?: SortOrder
    stripeCustomerId?: SortOrder
    stripeSubscriptionId?: SortOrder
    maxStaffSeats?: SortOrder
    maxPatientRecords?: SortOrder
    maxStorageMb?: SortOrder
    customDomain?: SortOrder
    customDomainStatus?: SortOrder
    dnsVerificationToken?: SortOrder
    sslStatus?: SortOrder
    primaryColor?: SortOrder
    secondaryColor?: SortOrder
    logoUrl?: SortOrder
    deploymentUrl?: SortOrder
    dbConnectionUri?: SortOrder
    dbSchemaVersion?: SortOrder
    trialEndsAt?: SortOrder
    contractStart?: SortOrder
    contractEnd?: SortOrder
    createdAt?: SortOrder
    allowCrossOrgReferrals?: SortOrder
    referralCapacityStatus?: SortOrder
    referralGeographicScope?: SortOrder
    acceptedReferralTypes?: SortOrder
  }

  export type CpOrganizationSumOrderByAggregateInput = {
    maxStaffSeats?: SortOrder
    maxPatientRecords?: SortOrder
    maxStorageMb?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
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

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type UuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type CpOrganizationRelationFilter = {
    is?: CpOrganizationWhereInput
    isNot?: CpOrganizationWhereInput
  }

  export type CpFeatureFlagOrgIdFeatureKeyCompoundUniqueInput = {
    orgId: string
    featureKey: string
  }

  export type CpFeatureFlagCountOrderByAggregateInput = {
    orgId?: SortOrder
    featureKey?: SortOrder
    isEnabled?: SortOrder
    configuredAt?: SortOrder
    configuredBy?: SortOrder
  }

  export type CpFeatureFlagMaxOrderByAggregateInput = {
    orgId?: SortOrder
    featureKey?: SortOrder
    isEnabled?: SortOrder
    configuredAt?: SortOrder
    configuredBy?: SortOrder
  }

  export type CpFeatureFlagMinOrderByAggregateInput = {
    orgId?: SortOrder
    featureKey?: SortOrder
    isEnabled?: SortOrder
    configuredAt?: SortOrder
    configuredBy?: SortOrder
  }

  export type UuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type CpUsageMetricCountOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    recordedAt?: SortOrder
    activeStaffCount?: SortOrder
    patientRecordsCount?: SortOrder
    storageBytesUsed?: SortOrder
    smsSentThisMonth?: SortOrder
    apiRequestsCount?: SortOrder
  }

  export type CpUsageMetricAvgOrderByAggregateInput = {
    activeStaffCount?: SortOrder
    patientRecordsCount?: SortOrder
    storageBytesUsed?: SortOrder
    smsSentThisMonth?: SortOrder
    apiRequestsCount?: SortOrder
  }

  export type CpUsageMetricMaxOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    recordedAt?: SortOrder
    activeStaffCount?: SortOrder
    patientRecordsCount?: SortOrder
    storageBytesUsed?: SortOrder
    smsSentThisMonth?: SortOrder
    apiRequestsCount?: SortOrder
  }

  export type CpUsageMetricMinOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    recordedAt?: SortOrder
    activeStaffCount?: SortOrder
    patientRecordsCount?: SortOrder
    storageBytesUsed?: SortOrder
    smsSentThisMonth?: SortOrder
    apiRequestsCount?: SortOrder
  }

  export type CpUsageMetricSumOrderByAggregateInput = {
    activeStaffCount?: SortOrder
    patientRecordsCount?: SortOrder
    storageBytesUsed?: SortOrder
    smsSentThisMonth?: SortOrder
    apiRequestsCount?: SortOrder
  }

  export type CpPluginDirectoryCountOrderByAggregateInput = {
    id?: SortOrder
    pluginId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    version?: SortOrder
    isPublished?: SortOrder
    publishedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type CpPluginDirectoryMaxOrderByAggregateInput = {
    id?: SortOrder
    pluginId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    version?: SortOrder
    isPublished?: SortOrder
    publishedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type CpPluginDirectoryMinOrderByAggregateInput = {
    id?: SortOrder
    pluginId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    version?: SortOrder
    isPublished?: SortOrder
    publishedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type CpTempAccessGrantCountOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    requestedBy?: SortOrder
    reason?: SortOrder
    scope?: SortOrder
    durationHours?: SortOrder
    status?: SortOrder
    requestedAt?: SortOrder
    approvedAt?: SortOrder
    approvedBy?: SortOrder
    expiresAt?: SortOrder
    revokedAt?: SortOrder
    revokedBy?: SortOrder
  }

  export type CpTempAccessGrantAvgOrderByAggregateInput = {
    durationHours?: SortOrder
  }

  export type CpTempAccessGrantMaxOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    requestedBy?: SortOrder
    reason?: SortOrder
    scope?: SortOrder
    durationHours?: SortOrder
    status?: SortOrder
    requestedAt?: SortOrder
    approvedAt?: SortOrder
    approvedBy?: SortOrder
    expiresAt?: SortOrder
    revokedAt?: SortOrder
    revokedBy?: SortOrder
  }

  export type CpTempAccessGrantMinOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    requestedBy?: SortOrder
    reason?: SortOrder
    scope?: SortOrder
    durationHours?: SortOrder
    status?: SortOrder
    requestedAt?: SortOrder
    approvedAt?: SortOrder
    approvedBy?: SortOrder
    expiresAt?: SortOrder
    revokedAt?: SortOrder
    revokedBy?: SortOrder
  }

  export type CpTempAccessGrantSumOrderByAggregateInput = {
    durationHours?: SortOrder
  }

  export type CpTenantDbUpgradeCountOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    schemaVersion?: SortOrder
    status?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    errorLog?: SortOrder
  }

  export type CpTenantDbUpgradeMaxOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    schemaVersion?: SortOrder
    status?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    errorLog?: SortOrder
  }

  export type CpTenantDbUpgradeMinOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    schemaVersion?: SortOrder
    status?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    errorLog?: SortOrder
  }

  export type CpOrganizationNullableRelationFilter = {
    is?: CpOrganizationWhereInput | null
    isNot?: CpOrganizationWhereInput | null
  }

  export type CpIncidentCountOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    severity?: SortOrder
    status?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    resolvedAt?: SortOrder
  }

  export type CpIncidentMaxOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    severity?: SortOrder
    status?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    resolvedAt?: SortOrder
  }

  export type CpIncidentMinOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    severity?: SortOrder
    status?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    resolvedAt?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type CpMigrationCountOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    sourceSystem?: SortOrder
    status?: SortOrder
    totalRecords?: SortOrder
    successCount?: SortOrder
    failedCount?: SortOrder
    runBy?: SortOrder
    runAt?: SortOrder
    notes?: SortOrder
  }

  export type CpMigrationAvgOrderByAggregateInput = {
    totalRecords?: SortOrder
    successCount?: SortOrder
    failedCount?: SortOrder
  }

  export type CpMigrationMaxOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    sourceSystem?: SortOrder
    status?: SortOrder
    totalRecords?: SortOrder
    successCount?: SortOrder
    failedCount?: SortOrder
    runBy?: SortOrder
    runAt?: SortOrder
    notes?: SortOrder
  }

  export type CpMigrationMinOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    sourceSystem?: SortOrder
    status?: SortOrder
    totalRecords?: SortOrder
    successCount?: SortOrder
    failedCount?: SortOrder
    runBy?: SortOrder
    runAt?: SortOrder
    notes?: SortOrder
  }

  export type CpMigrationSumOrderByAggregateInput = {
    totalRecords?: SortOrder
    successCount?: SortOrder
    failedCount?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type CpSessionListRelationFilter = {
    every?: CpSessionWhereInput
    some?: CpSessionWhereInput
    none?: CpSessionWhereInput
  }

  export type CpAccountListRelationFilter = {
    every?: CpAccountWhereInput
    some?: CpAccountWhereInput
    none?: CpAccountWhereInput
  }

  export type CpSessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CpAccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CpUserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    passwordHash?: SortOrder
    mfaEnabled?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CpUserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    passwordHash?: SortOrder
    mfaEnabled?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CpUserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    passwordHash?: SortOrder
    mfaEnabled?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CpUserRelationFilter = {
    is?: CpUserWhereInput
    isNot?: CpUserWhereInput
  }

  export type CpSessionCountOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
  }

  export type CpSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
  }

  export type CpSessionMinOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
  }

  export type CpAccountProviderIdAccountIdCompoundUniqueInput = {
    providerId: string
    accountId: string
  }

  export type CpAccountCountOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    expiresAt?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CpAccountMaxOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    expiresAt?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CpAccountMinOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    expiresAt?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CpVerificationCountOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CpVerificationMaxOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CpVerificationMinOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CpPatientIndexCountOrderByAggregateInput = {
    id?: SortOrder
    patientPin?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    birthDate?: SortOrder
    sex?: SortOrder
    orgId?: SortOrder
    orgSlug?: SortOrder
    createdAt?: SortOrder
  }

  export type CpPatientIndexMaxOrderByAggregateInput = {
    id?: SortOrder
    patientPin?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    birthDate?: SortOrder
    sex?: SortOrder
    orgId?: SortOrder
    orgSlug?: SortOrder
    createdAt?: SortOrder
  }

  export type CpPatientIndexMinOrderByAggregateInput = {
    id?: SortOrder
    patientPin?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    birthDate?: SortOrder
    sex?: SortOrder
    orgId?: SortOrder
    orgSlug?: SortOrder
    createdAt?: SortOrder
  }

  export type CpFeatureFlagCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<CpFeatureFlagCreateWithoutOrganizationInput, CpFeatureFlagUncheckedCreateWithoutOrganizationInput> | CpFeatureFlagCreateWithoutOrganizationInput[] | CpFeatureFlagUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: CpFeatureFlagCreateOrConnectWithoutOrganizationInput | CpFeatureFlagCreateOrConnectWithoutOrganizationInput[]
    createMany?: CpFeatureFlagCreateManyOrganizationInputEnvelope
    connect?: CpFeatureFlagWhereUniqueInput | CpFeatureFlagWhereUniqueInput[]
  }

  export type CpUsageMetricCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<CpUsageMetricCreateWithoutOrganizationInput, CpUsageMetricUncheckedCreateWithoutOrganizationInput> | CpUsageMetricCreateWithoutOrganizationInput[] | CpUsageMetricUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: CpUsageMetricCreateOrConnectWithoutOrganizationInput | CpUsageMetricCreateOrConnectWithoutOrganizationInput[]
    createMany?: CpUsageMetricCreateManyOrganizationInputEnvelope
    connect?: CpUsageMetricWhereUniqueInput | CpUsageMetricWhereUniqueInput[]
  }

  export type CpTempAccessGrantCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<CpTempAccessGrantCreateWithoutOrganizationInput, CpTempAccessGrantUncheckedCreateWithoutOrganizationInput> | CpTempAccessGrantCreateWithoutOrganizationInput[] | CpTempAccessGrantUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: CpTempAccessGrantCreateOrConnectWithoutOrganizationInput | CpTempAccessGrantCreateOrConnectWithoutOrganizationInput[]
    createMany?: CpTempAccessGrantCreateManyOrganizationInputEnvelope
    connect?: CpTempAccessGrantWhereUniqueInput | CpTempAccessGrantWhereUniqueInput[]
  }

  export type CpTenantDbUpgradeCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<CpTenantDbUpgradeCreateWithoutOrganizationInput, CpTenantDbUpgradeUncheckedCreateWithoutOrganizationInput> | CpTenantDbUpgradeCreateWithoutOrganizationInput[] | CpTenantDbUpgradeUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: CpTenantDbUpgradeCreateOrConnectWithoutOrganizationInput | CpTenantDbUpgradeCreateOrConnectWithoutOrganizationInput[]
    createMany?: CpTenantDbUpgradeCreateManyOrganizationInputEnvelope
    connect?: CpTenantDbUpgradeWhereUniqueInput | CpTenantDbUpgradeWhereUniqueInput[]
  }

  export type CpIncidentCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<CpIncidentCreateWithoutOrganizationInput, CpIncidentUncheckedCreateWithoutOrganizationInput> | CpIncidentCreateWithoutOrganizationInput[] | CpIncidentUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: CpIncidentCreateOrConnectWithoutOrganizationInput | CpIncidentCreateOrConnectWithoutOrganizationInput[]
    createMany?: CpIncidentCreateManyOrganizationInputEnvelope
    connect?: CpIncidentWhereUniqueInput | CpIncidentWhereUniqueInput[]
  }

  export type CpMigrationCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<CpMigrationCreateWithoutOrganizationInput, CpMigrationUncheckedCreateWithoutOrganizationInput> | CpMigrationCreateWithoutOrganizationInput[] | CpMigrationUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: CpMigrationCreateOrConnectWithoutOrganizationInput | CpMigrationCreateOrConnectWithoutOrganizationInput[]
    createMany?: CpMigrationCreateManyOrganizationInputEnvelope
    connect?: CpMigrationWhereUniqueInput | CpMigrationWhereUniqueInput[]
  }

  export type CpPatientIndexCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<CpPatientIndexCreateWithoutOrganizationInput, CpPatientIndexUncheckedCreateWithoutOrganizationInput> | CpPatientIndexCreateWithoutOrganizationInput[] | CpPatientIndexUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: CpPatientIndexCreateOrConnectWithoutOrganizationInput | CpPatientIndexCreateOrConnectWithoutOrganizationInput[]
    createMany?: CpPatientIndexCreateManyOrganizationInputEnvelope
    connect?: CpPatientIndexWhereUniqueInput | CpPatientIndexWhereUniqueInput[]
  }

  export type CpFeatureFlagUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<CpFeatureFlagCreateWithoutOrganizationInput, CpFeatureFlagUncheckedCreateWithoutOrganizationInput> | CpFeatureFlagCreateWithoutOrganizationInput[] | CpFeatureFlagUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: CpFeatureFlagCreateOrConnectWithoutOrganizationInput | CpFeatureFlagCreateOrConnectWithoutOrganizationInput[]
    createMany?: CpFeatureFlagCreateManyOrganizationInputEnvelope
    connect?: CpFeatureFlagWhereUniqueInput | CpFeatureFlagWhereUniqueInput[]
  }

  export type CpUsageMetricUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<CpUsageMetricCreateWithoutOrganizationInput, CpUsageMetricUncheckedCreateWithoutOrganizationInput> | CpUsageMetricCreateWithoutOrganizationInput[] | CpUsageMetricUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: CpUsageMetricCreateOrConnectWithoutOrganizationInput | CpUsageMetricCreateOrConnectWithoutOrganizationInput[]
    createMany?: CpUsageMetricCreateManyOrganizationInputEnvelope
    connect?: CpUsageMetricWhereUniqueInput | CpUsageMetricWhereUniqueInput[]
  }

  export type CpTempAccessGrantUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<CpTempAccessGrantCreateWithoutOrganizationInput, CpTempAccessGrantUncheckedCreateWithoutOrganizationInput> | CpTempAccessGrantCreateWithoutOrganizationInput[] | CpTempAccessGrantUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: CpTempAccessGrantCreateOrConnectWithoutOrganizationInput | CpTempAccessGrantCreateOrConnectWithoutOrganizationInput[]
    createMany?: CpTempAccessGrantCreateManyOrganizationInputEnvelope
    connect?: CpTempAccessGrantWhereUniqueInput | CpTempAccessGrantWhereUniqueInput[]
  }

  export type CpTenantDbUpgradeUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<CpTenantDbUpgradeCreateWithoutOrganizationInput, CpTenantDbUpgradeUncheckedCreateWithoutOrganizationInput> | CpTenantDbUpgradeCreateWithoutOrganizationInput[] | CpTenantDbUpgradeUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: CpTenantDbUpgradeCreateOrConnectWithoutOrganizationInput | CpTenantDbUpgradeCreateOrConnectWithoutOrganizationInput[]
    createMany?: CpTenantDbUpgradeCreateManyOrganizationInputEnvelope
    connect?: CpTenantDbUpgradeWhereUniqueInput | CpTenantDbUpgradeWhereUniqueInput[]
  }

  export type CpIncidentUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<CpIncidentCreateWithoutOrganizationInput, CpIncidentUncheckedCreateWithoutOrganizationInput> | CpIncidentCreateWithoutOrganizationInput[] | CpIncidentUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: CpIncidentCreateOrConnectWithoutOrganizationInput | CpIncidentCreateOrConnectWithoutOrganizationInput[]
    createMany?: CpIncidentCreateManyOrganizationInputEnvelope
    connect?: CpIncidentWhereUniqueInput | CpIncidentWhereUniqueInput[]
  }

  export type CpMigrationUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<CpMigrationCreateWithoutOrganizationInput, CpMigrationUncheckedCreateWithoutOrganizationInput> | CpMigrationCreateWithoutOrganizationInput[] | CpMigrationUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: CpMigrationCreateOrConnectWithoutOrganizationInput | CpMigrationCreateOrConnectWithoutOrganizationInput[]
    createMany?: CpMigrationCreateManyOrganizationInputEnvelope
    connect?: CpMigrationWhereUniqueInput | CpMigrationWhereUniqueInput[]
  }

  export type CpPatientIndexUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<CpPatientIndexCreateWithoutOrganizationInput, CpPatientIndexUncheckedCreateWithoutOrganizationInput> | CpPatientIndexCreateWithoutOrganizationInput[] | CpPatientIndexUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: CpPatientIndexCreateOrConnectWithoutOrganizationInput | CpPatientIndexCreateOrConnectWithoutOrganizationInput[]
    createMany?: CpPatientIndexCreateManyOrganizationInputEnvelope
    connect?: CpPatientIndexWhereUniqueInput | CpPatientIndexWhereUniqueInput[]
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

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type CpFeatureFlagUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<CpFeatureFlagCreateWithoutOrganizationInput, CpFeatureFlagUncheckedCreateWithoutOrganizationInput> | CpFeatureFlagCreateWithoutOrganizationInput[] | CpFeatureFlagUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: CpFeatureFlagCreateOrConnectWithoutOrganizationInput | CpFeatureFlagCreateOrConnectWithoutOrganizationInput[]
    upsert?: CpFeatureFlagUpsertWithWhereUniqueWithoutOrganizationInput | CpFeatureFlagUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: CpFeatureFlagCreateManyOrganizationInputEnvelope
    set?: CpFeatureFlagWhereUniqueInput | CpFeatureFlagWhereUniqueInput[]
    disconnect?: CpFeatureFlagWhereUniqueInput | CpFeatureFlagWhereUniqueInput[]
    delete?: CpFeatureFlagWhereUniqueInput | CpFeatureFlagWhereUniqueInput[]
    connect?: CpFeatureFlagWhereUniqueInput | CpFeatureFlagWhereUniqueInput[]
    update?: CpFeatureFlagUpdateWithWhereUniqueWithoutOrganizationInput | CpFeatureFlagUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: CpFeatureFlagUpdateManyWithWhereWithoutOrganizationInput | CpFeatureFlagUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: CpFeatureFlagScalarWhereInput | CpFeatureFlagScalarWhereInput[]
  }

  export type CpUsageMetricUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<CpUsageMetricCreateWithoutOrganizationInput, CpUsageMetricUncheckedCreateWithoutOrganizationInput> | CpUsageMetricCreateWithoutOrganizationInput[] | CpUsageMetricUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: CpUsageMetricCreateOrConnectWithoutOrganizationInput | CpUsageMetricCreateOrConnectWithoutOrganizationInput[]
    upsert?: CpUsageMetricUpsertWithWhereUniqueWithoutOrganizationInput | CpUsageMetricUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: CpUsageMetricCreateManyOrganizationInputEnvelope
    set?: CpUsageMetricWhereUniqueInput | CpUsageMetricWhereUniqueInput[]
    disconnect?: CpUsageMetricWhereUniqueInput | CpUsageMetricWhereUniqueInput[]
    delete?: CpUsageMetricWhereUniqueInput | CpUsageMetricWhereUniqueInput[]
    connect?: CpUsageMetricWhereUniqueInput | CpUsageMetricWhereUniqueInput[]
    update?: CpUsageMetricUpdateWithWhereUniqueWithoutOrganizationInput | CpUsageMetricUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: CpUsageMetricUpdateManyWithWhereWithoutOrganizationInput | CpUsageMetricUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: CpUsageMetricScalarWhereInput | CpUsageMetricScalarWhereInput[]
  }

  export type CpTempAccessGrantUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<CpTempAccessGrantCreateWithoutOrganizationInput, CpTempAccessGrantUncheckedCreateWithoutOrganizationInput> | CpTempAccessGrantCreateWithoutOrganizationInput[] | CpTempAccessGrantUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: CpTempAccessGrantCreateOrConnectWithoutOrganizationInput | CpTempAccessGrantCreateOrConnectWithoutOrganizationInput[]
    upsert?: CpTempAccessGrantUpsertWithWhereUniqueWithoutOrganizationInput | CpTempAccessGrantUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: CpTempAccessGrantCreateManyOrganizationInputEnvelope
    set?: CpTempAccessGrantWhereUniqueInput | CpTempAccessGrantWhereUniqueInput[]
    disconnect?: CpTempAccessGrantWhereUniqueInput | CpTempAccessGrantWhereUniqueInput[]
    delete?: CpTempAccessGrantWhereUniqueInput | CpTempAccessGrantWhereUniqueInput[]
    connect?: CpTempAccessGrantWhereUniqueInput | CpTempAccessGrantWhereUniqueInput[]
    update?: CpTempAccessGrantUpdateWithWhereUniqueWithoutOrganizationInput | CpTempAccessGrantUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: CpTempAccessGrantUpdateManyWithWhereWithoutOrganizationInput | CpTempAccessGrantUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: CpTempAccessGrantScalarWhereInput | CpTempAccessGrantScalarWhereInput[]
  }

  export type CpTenantDbUpgradeUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<CpTenantDbUpgradeCreateWithoutOrganizationInput, CpTenantDbUpgradeUncheckedCreateWithoutOrganizationInput> | CpTenantDbUpgradeCreateWithoutOrganizationInput[] | CpTenantDbUpgradeUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: CpTenantDbUpgradeCreateOrConnectWithoutOrganizationInput | CpTenantDbUpgradeCreateOrConnectWithoutOrganizationInput[]
    upsert?: CpTenantDbUpgradeUpsertWithWhereUniqueWithoutOrganizationInput | CpTenantDbUpgradeUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: CpTenantDbUpgradeCreateManyOrganizationInputEnvelope
    set?: CpTenantDbUpgradeWhereUniqueInput | CpTenantDbUpgradeWhereUniqueInput[]
    disconnect?: CpTenantDbUpgradeWhereUniqueInput | CpTenantDbUpgradeWhereUniqueInput[]
    delete?: CpTenantDbUpgradeWhereUniqueInput | CpTenantDbUpgradeWhereUniqueInput[]
    connect?: CpTenantDbUpgradeWhereUniqueInput | CpTenantDbUpgradeWhereUniqueInput[]
    update?: CpTenantDbUpgradeUpdateWithWhereUniqueWithoutOrganizationInput | CpTenantDbUpgradeUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: CpTenantDbUpgradeUpdateManyWithWhereWithoutOrganizationInput | CpTenantDbUpgradeUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: CpTenantDbUpgradeScalarWhereInput | CpTenantDbUpgradeScalarWhereInput[]
  }

  export type CpIncidentUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<CpIncidentCreateWithoutOrganizationInput, CpIncidentUncheckedCreateWithoutOrganizationInput> | CpIncidentCreateWithoutOrganizationInput[] | CpIncidentUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: CpIncidentCreateOrConnectWithoutOrganizationInput | CpIncidentCreateOrConnectWithoutOrganizationInput[]
    upsert?: CpIncidentUpsertWithWhereUniqueWithoutOrganizationInput | CpIncidentUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: CpIncidentCreateManyOrganizationInputEnvelope
    set?: CpIncidentWhereUniqueInput | CpIncidentWhereUniqueInput[]
    disconnect?: CpIncidentWhereUniqueInput | CpIncidentWhereUniqueInput[]
    delete?: CpIncidentWhereUniqueInput | CpIncidentWhereUniqueInput[]
    connect?: CpIncidentWhereUniqueInput | CpIncidentWhereUniqueInput[]
    update?: CpIncidentUpdateWithWhereUniqueWithoutOrganizationInput | CpIncidentUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: CpIncidentUpdateManyWithWhereWithoutOrganizationInput | CpIncidentUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: CpIncidentScalarWhereInput | CpIncidentScalarWhereInput[]
  }

  export type CpMigrationUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<CpMigrationCreateWithoutOrganizationInput, CpMigrationUncheckedCreateWithoutOrganizationInput> | CpMigrationCreateWithoutOrganizationInput[] | CpMigrationUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: CpMigrationCreateOrConnectWithoutOrganizationInput | CpMigrationCreateOrConnectWithoutOrganizationInput[]
    upsert?: CpMigrationUpsertWithWhereUniqueWithoutOrganizationInput | CpMigrationUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: CpMigrationCreateManyOrganizationInputEnvelope
    set?: CpMigrationWhereUniqueInput | CpMigrationWhereUniqueInput[]
    disconnect?: CpMigrationWhereUniqueInput | CpMigrationWhereUniqueInput[]
    delete?: CpMigrationWhereUniqueInput | CpMigrationWhereUniqueInput[]
    connect?: CpMigrationWhereUniqueInput | CpMigrationWhereUniqueInput[]
    update?: CpMigrationUpdateWithWhereUniqueWithoutOrganizationInput | CpMigrationUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: CpMigrationUpdateManyWithWhereWithoutOrganizationInput | CpMigrationUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: CpMigrationScalarWhereInput | CpMigrationScalarWhereInput[]
  }

  export type CpPatientIndexUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<CpPatientIndexCreateWithoutOrganizationInput, CpPatientIndexUncheckedCreateWithoutOrganizationInput> | CpPatientIndexCreateWithoutOrganizationInput[] | CpPatientIndexUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: CpPatientIndexCreateOrConnectWithoutOrganizationInput | CpPatientIndexCreateOrConnectWithoutOrganizationInput[]
    upsert?: CpPatientIndexUpsertWithWhereUniqueWithoutOrganizationInput | CpPatientIndexUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: CpPatientIndexCreateManyOrganizationInputEnvelope
    set?: CpPatientIndexWhereUniqueInput | CpPatientIndexWhereUniqueInput[]
    disconnect?: CpPatientIndexWhereUniqueInput | CpPatientIndexWhereUniqueInput[]
    delete?: CpPatientIndexWhereUniqueInput | CpPatientIndexWhereUniqueInput[]
    connect?: CpPatientIndexWhereUniqueInput | CpPatientIndexWhereUniqueInput[]
    update?: CpPatientIndexUpdateWithWhereUniqueWithoutOrganizationInput | CpPatientIndexUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: CpPatientIndexUpdateManyWithWhereWithoutOrganizationInput | CpPatientIndexUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: CpPatientIndexScalarWhereInput | CpPatientIndexScalarWhereInput[]
  }

  export type CpFeatureFlagUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<CpFeatureFlagCreateWithoutOrganizationInput, CpFeatureFlagUncheckedCreateWithoutOrganizationInput> | CpFeatureFlagCreateWithoutOrganizationInput[] | CpFeatureFlagUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: CpFeatureFlagCreateOrConnectWithoutOrganizationInput | CpFeatureFlagCreateOrConnectWithoutOrganizationInput[]
    upsert?: CpFeatureFlagUpsertWithWhereUniqueWithoutOrganizationInput | CpFeatureFlagUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: CpFeatureFlagCreateManyOrganizationInputEnvelope
    set?: CpFeatureFlagWhereUniqueInput | CpFeatureFlagWhereUniqueInput[]
    disconnect?: CpFeatureFlagWhereUniqueInput | CpFeatureFlagWhereUniqueInput[]
    delete?: CpFeatureFlagWhereUniqueInput | CpFeatureFlagWhereUniqueInput[]
    connect?: CpFeatureFlagWhereUniqueInput | CpFeatureFlagWhereUniqueInput[]
    update?: CpFeatureFlagUpdateWithWhereUniqueWithoutOrganizationInput | CpFeatureFlagUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: CpFeatureFlagUpdateManyWithWhereWithoutOrganizationInput | CpFeatureFlagUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: CpFeatureFlagScalarWhereInput | CpFeatureFlagScalarWhereInput[]
  }

  export type CpUsageMetricUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<CpUsageMetricCreateWithoutOrganizationInput, CpUsageMetricUncheckedCreateWithoutOrganizationInput> | CpUsageMetricCreateWithoutOrganizationInput[] | CpUsageMetricUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: CpUsageMetricCreateOrConnectWithoutOrganizationInput | CpUsageMetricCreateOrConnectWithoutOrganizationInput[]
    upsert?: CpUsageMetricUpsertWithWhereUniqueWithoutOrganizationInput | CpUsageMetricUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: CpUsageMetricCreateManyOrganizationInputEnvelope
    set?: CpUsageMetricWhereUniqueInput | CpUsageMetricWhereUniqueInput[]
    disconnect?: CpUsageMetricWhereUniqueInput | CpUsageMetricWhereUniqueInput[]
    delete?: CpUsageMetricWhereUniqueInput | CpUsageMetricWhereUniqueInput[]
    connect?: CpUsageMetricWhereUniqueInput | CpUsageMetricWhereUniqueInput[]
    update?: CpUsageMetricUpdateWithWhereUniqueWithoutOrganizationInput | CpUsageMetricUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: CpUsageMetricUpdateManyWithWhereWithoutOrganizationInput | CpUsageMetricUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: CpUsageMetricScalarWhereInput | CpUsageMetricScalarWhereInput[]
  }

  export type CpTempAccessGrantUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<CpTempAccessGrantCreateWithoutOrganizationInput, CpTempAccessGrantUncheckedCreateWithoutOrganizationInput> | CpTempAccessGrantCreateWithoutOrganizationInput[] | CpTempAccessGrantUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: CpTempAccessGrantCreateOrConnectWithoutOrganizationInput | CpTempAccessGrantCreateOrConnectWithoutOrganizationInput[]
    upsert?: CpTempAccessGrantUpsertWithWhereUniqueWithoutOrganizationInput | CpTempAccessGrantUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: CpTempAccessGrantCreateManyOrganizationInputEnvelope
    set?: CpTempAccessGrantWhereUniqueInput | CpTempAccessGrantWhereUniqueInput[]
    disconnect?: CpTempAccessGrantWhereUniqueInput | CpTempAccessGrantWhereUniqueInput[]
    delete?: CpTempAccessGrantWhereUniqueInput | CpTempAccessGrantWhereUniqueInput[]
    connect?: CpTempAccessGrantWhereUniqueInput | CpTempAccessGrantWhereUniqueInput[]
    update?: CpTempAccessGrantUpdateWithWhereUniqueWithoutOrganizationInput | CpTempAccessGrantUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: CpTempAccessGrantUpdateManyWithWhereWithoutOrganizationInput | CpTempAccessGrantUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: CpTempAccessGrantScalarWhereInput | CpTempAccessGrantScalarWhereInput[]
  }

  export type CpTenantDbUpgradeUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<CpTenantDbUpgradeCreateWithoutOrganizationInput, CpTenantDbUpgradeUncheckedCreateWithoutOrganizationInput> | CpTenantDbUpgradeCreateWithoutOrganizationInput[] | CpTenantDbUpgradeUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: CpTenantDbUpgradeCreateOrConnectWithoutOrganizationInput | CpTenantDbUpgradeCreateOrConnectWithoutOrganizationInput[]
    upsert?: CpTenantDbUpgradeUpsertWithWhereUniqueWithoutOrganizationInput | CpTenantDbUpgradeUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: CpTenantDbUpgradeCreateManyOrganizationInputEnvelope
    set?: CpTenantDbUpgradeWhereUniqueInput | CpTenantDbUpgradeWhereUniqueInput[]
    disconnect?: CpTenantDbUpgradeWhereUniqueInput | CpTenantDbUpgradeWhereUniqueInput[]
    delete?: CpTenantDbUpgradeWhereUniqueInput | CpTenantDbUpgradeWhereUniqueInput[]
    connect?: CpTenantDbUpgradeWhereUniqueInput | CpTenantDbUpgradeWhereUniqueInput[]
    update?: CpTenantDbUpgradeUpdateWithWhereUniqueWithoutOrganizationInput | CpTenantDbUpgradeUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: CpTenantDbUpgradeUpdateManyWithWhereWithoutOrganizationInput | CpTenantDbUpgradeUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: CpTenantDbUpgradeScalarWhereInput | CpTenantDbUpgradeScalarWhereInput[]
  }

  export type CpIncidentUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<CpIncidentCreateWithoutOrganizationInput, CpIncidentUncheckedCreateWithoutOrganizationInput> | CpIncidentCreateWithoutOrganizationInput[] | CpIncidentUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: CpIncidentCreateOrConnectWithoutOrganizationInput | CpIncidentCreateOrConnectWithoutOrganizationInput[]
    upsert?: CpIncidentUpsertWithWhereUniqueWithoutOrganizationInput | CpIncidentUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: CpIncidentCreateManyOrganizationInputEnvelope
    set?: CpIncidentWhereUniqueInput | CpIncidentWhereUniqueInput[]
    disconnect?: CpIncidentWhereUniqueInput | CpIncidentWhereUniqueInput[]
    delete?: CpIncidentWhereUniqueInput | CpIncidentWhereUniqueInput[]
    connect?: CpIncidentWhereUniqueInput | CpIncidentWhereUniqueInput[]
    update?: CpIncidentUpdateWithWhereUniqueWithoutOrganizationInput | CpIncidentUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: CpIncidentUpdateManyWithWhereWithoutOrganizationInput | CpIncidentUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: CpIncidentScalarWhereInput | CpIncidentScalarWhereInput[]
  }

  export type CpMigrationUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<CpMigrationCreateWithoutOrganizationInput, CpMigrationUncheckedCreateWithoutOrganizationInput> | CpMigrationCreateWithoutOrganizationInput[] | CpMigrationUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: CpMigrationCreateOrConnectWithoutOrganizationInput | CpMigrationCreateOrConnectWithoutOrganizationInput[]
    upsert?: CpMigrationUpsertWithWhereUniqueWithoutOrganizationInput | CpMigrationUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: CpMigrationCreateManyOrganizationInputEnvelope
    set?: CpMigrationWhereUniqueInput | CpMigrationWhereUniqueInput[]
    disconnect?: CpMigrationWhereUniqueInput | CpMigrationWhereUniqueInput[]
    delete?: CpMigrationWhereUniqueInput | CpMigrationWhereUniqueInput[]
    connect?: CpMigrationWhereUniqueInput | CpMigrationWhereUniqueInput[]
    update?: CpMigrationUpdateWithWhereUniqueWithoutOrganizationInput | CpMigrationUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: CpMigrationUpdateManyWithWhereWithoutOrganizationInput | CpMigrationUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: CpMigrationScalarWhereInput | CpMigrationScalarWhereInput[]
  }

  export type CpPatientIndexUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<CpPatientIndexCreateWithoutOrganizationInput, CpPatientIndexUncheckedCreateWithoutOrganizationInput> | CpPatientIndexCreateWithoutOrganizationInput[] | CpPatientIndexUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: CpPatientIndexCreateOrConnectWithoutOrganizationInput | CpPatientIndexCreateOrConnectWithoutOrganizationInput[]
    upsert?: CpPatientIndexUpsertWithWhereUniqueWithoutOrganizationInput | CpPatientIndexUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: CpPatientIndexCreateManyOrganizationInputEnvelope
    set?: CpPatientIndexWhereUniqueInput | CpPatientIndexWhereUniqueInput[]
    disconnect?: CpPatientIndexWhereUniqueInput | CpPatientIndexWhereUniqueInput[]
    delete?: CpPatientIndexWhereUniqueInput | CpPatientIndexWhereUniqueInput[]
    connect?: CpPatientIndexWhereUniqueInput | CpPatientIndexWhereUniqueInput[]
    update?: CpPatientIndexUpdateWithWhereUniqueWithoutOrganizationInput | CpPatientIndexUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: CpPatientIndexUpdateManyWithWhereWithoutOrganizationInput | CpPatientIndexUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: CpPatientIndexScalarWhereInput | CpPatientIndexScalarWhereInput[]
  }

  export type CpOrganizationCreateNestedOneWithoutFeatureFlagsInput = {
    create?: XOR<CpOrganizationCreateWithoutFeatureFlagsInput, CpOrganizationUncheckedCreateWithoutFeatureFlagsInput>
    connectOrCreate?: CpOrganizationCreateOrConnectWithoutFeatureFlagsInput
    connect?: CpOrganizationWhereUniqueInput
  }

  export type CpOrganizationUpdateOneRequiredWithoutFeatureFlagsNestedInput = {
    create?: XOR<CpOrganizationCreateWithoutFeatureFlagsInput, CpOrganizationUncheckedCreateWithoutFeatureFlagsInput>
    connectOrCreate?: CpOrganizationCreateOrConnectWithoutFeatureFlagsInput
    upsert?: CpOrganizationUpsertWithoutFeatureFlagsInput
    connect?: CpOrganizationWhereUniqueInput
    update?: XOR<XOR<CpOrganizationUpdateToOneWithWhereWithoutFeatureFlagsInput, CpOrganizationUpdateWithoutFeatureFlagsInput>, CpOrganizationUncheckedUpdateWithoutFeatureFlagsInput>
  }

  export type CpOrganizationCreateNestedOneWithoutUsageMetricsInput = {
    create?: XOR<CpOrganizationCreateWithoutUsageMetricsInput, CpOrganizationUncheckedCreateWithoutUsageMetricsInput>
    connectOrCreate?: CpOrganizationCreateOrConnectWithoutUsageMetricsInput
    connect?: CpOrganizationWhereUniqueInput
  }

  export type CpOrganizationUpdateOneRequiredWithoutUsageMetricsNestedInput = {
    create?: XOR<CpOrganizationCreateWithoutUsageMetricsInput, CpOrganizationUncheckedCreateWithoutUsageMetricsInput>
    connectOrCreate?: CpOrganizationCreateOrConnectWithoutUsageMetricsInput
    upsert?: CpOrganizationUpsertWithoutUsageMetricsInput
    connect?: CpOrganizationWhereUniqueInput
    update?: XOR<XOR<CpOrganizationUpdateToOneWithWhereWithoutUsageMetricsInput, CpOrganizationUpdateWithoutUsageMetricsInput>, CpOrganizationUncheckedUpdateWithoutUsageMetricsInput>
  }

  export type CpOrganizationCreateNestedOneWithoutTempAccessGrantsInput = {
    create?: XOR<CpOrganizationCreateWithoutTempAccessGrantsInput, CpOrganizationUncheckedCreateWithoutTempAccessGrantsInput>
    connectOrCreate?: CpOrganizationCreateOrConnectWithoutTempAccessGrantsInput
    connect?: CpOrganizationWhereUniqueInput
  }

  export type CpOrganizationUpdateOneRequiredWithoutTempAccessGrantsNestedInput = {
    create?: XOR<CpOrganizationCreateWithoutTempAccessGrantsInput, CpOrganizationUncheckedCreateWithoutTempAccessGrantsInput>
    connectOrCreate?: CpOrganizationCreateOrConnectWithoutTempAccessGrantsInput
    upsert?: CpOrganizationUpsertWithoutTempAccessGrantsInput
    connect?: CpOrganizationWhereUniqueInput
    update?: XOR<XOR<CpOrganizationUpdateToOneWithWhereWithoutTempAccessGrantsInput, CpOrganizationUpdateWithoutTempAccessGrantsInput>, CpOrganizationUncheckedUpdateWithoutTempAccessGrantsInput>
  }

  export type CpOrganizationCreateNestedOneWithoutTenantDbUpgradesInput = {
    create?: XOR<CpOrganizationCreateWithoutTenantDbUpgradesInput, CpOrganizationUncheckedCreateWithoutTenantDbUpgradesInput>
    connectOrCreate?: CpOrganizationCreateOrConnectWithoutTenantDbUpgradesInput
    connect?: CpOrganizationWhereUniqueInput
  }

  export type CpOrganizationUpdateOneRequiredWithoutTenantDbUpgradesNestedInput = {
    create?: XOR<CpOrganizationCreateWithoutTenantDbUpgradesInput, CpOrganizationUncheckedCreateWithoutTenantDbUpgradesInput>
    connectOrCreate?: CpOrganizationCreateOrConnectWithoutTenantDbUpgradesInput
    upsert?: CpOrganizationUpsertWithoutTenantDbUpgradesInput
    connect?: CpOrganizationWhereUniqueInput
    update?: XOR<XOR<CpOrganizationUpdateToOneWithWhereWithoutTenantDbUpgradesInput, CpOrganizationUpdateWithoutTenantDbUpgradesInput>, CpOrganizationUncheckedUpdateWithoutTenantDbUpgradesInput>
  }

  export type CpOrganizationCreateNestedOneWithoutIncidentsInput = {
    create?: XOR<CpOrganizationCreateWithoutIncidentsInput, CpOrganizationUncheckedCreateWithoutIncidentsInput>
    connectOrCreate?: CpOrganizationCreateOrConnectWithoutIncidentsInput
    connect?: CpOrganizationWhereUniqueInput
  }

  export type CpOrganizationUpdateOneWithoutIncidentsNestedInput = {
    create?: XOR<CpOrganizationCreateWithoutIncidentsInput, CpOrganizationUncheckedCreateWithoutIncidentsInput>
    connectOrCreate?: CpOrganizationCreateOrConnectWithoutIncidentsInput
    upsert?: CpOrganizationUpsertWithoutIncidentsInput
    disconnect?: CpOrganizationWhereInput | boolean
    delete?: CpOrganizationWhereInput | boolean
    connect?: CpOrganizationWhereUniqueInput
    update?: XOR<XOR<CpOrganizationUpdateToOneWithWhereWithoutIncidentsInput, CpOrganizationUpdateWithoutIncidentsInput>, CpOrganizationUncheckedUpdateWithoutIncidentsInput>
  }

  export type CpOrganizationCreateNestedOneWithoutMigrationsInput = {
    create?: XOR<CpOrganizationCreateWithoutMigrationsInput, CpOrganizationUncheckedCreateWithoutMigrationsInput>
    connectOrCreate?: CpOrganizationCreateOrConnectWithoutMigrationsInput
    connect?: CpOrganizationWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CpOrganizationUpdateOneRequiredWithoutMigrationsNestedInput = {
    create?: XOR<CpOrganizationCreateWithoutMigrationsInput, CpOrganizationUncheckedCreateWithoutMigrationsInput>
    connectOrCreate?: CpOrganizationCreateOrConnectWithoutMigrationsInput
    upsert?: CpOrganizationUpsertWithoutMigrationsInput
    connect?: CpOrganizationWhereUniqueInput
    update?: XOR<XOR<CpOrganizationUpdateToOneWithWhereWithoutMigrationsInput, CpOrganizationUpdateWithoutMigrationsInput>, CpOrganizationUncheckedUpdateWithoutMigrationsInput>
  }

  export type CpSessionCreateNestedManyWithoutUserInput = {
    create?: XOR<CpSessionCreateWithoutUserInput, CpSessionUncheckedCreateWithoutUserInput> | CpSessionCreateWithoutUserInput[] | CpSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CpSessionCreateOrConnectWithoutUserInput | CpSessionCreateOrConnectWithoutUserInput[]
    createMany?: CpSessionCreateManyUserInputEnvelope
    connect?: CpSessionWhereUniqueInput | CpSessionWhereUniqueInput[]
  }

  export type CpAccountCreateNestedManyWithoutUserInput = {
    create?: XOR<CpAccountCreateWithoutUserInput, CpAccountUncheckedCreateWithoutUserInput> | CpAccountCreateWithoutUserInput[] | CpAccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CpAccountCreateOrConnectWithoutUserInput | CpAccountCreateOrConnectWithoutUserInput[]
    createMany?: CpAccountCreateManyUserInputEnvelope
    connect?: CpAccountWhereUniqueInput | CpAccountWhereUniqueInput[]
  }

  export type CpSessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CpSessionCreateWithoutUserInput, CpSessionUncheckedCreateWithoutUserInput> | CpSessionCreateWithoutUserInput[] | CpSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CpSessionCreateOrConnectWithoutUserInput | CpSessionCreateOrConnectWithoutUserInput[]
    createMany?: CpSessionCreateManyUserInputEnvelope
    connect?: CpSessionWhereUniqueInput | CpSessionWhereUniqueInput[]
  }

  export type CpAccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CpAccountCreateWithoutUserInput, CpAccountUncheckedCreateWithoutUserInput> | CpAccountCreateWithoutUserInput[] | CpAccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CpAccountCreateOrConnectWithoutUserInput | CpAccountCreateOrConnectWithoutUserInput[]
    createMany?: CpAccountCreateManyUserInputEnvelope
    connect?: CpAccountWhereUniqueInput | CpAccountWhereUniqueInput[]
  }

  export type CpSessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<CpSessionCreateWithoutUserInput, CpSessionUncheckedCreateWithoutUserInput> | CpSessionCreateWithoutUserInput[] | CpSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CpSessionCreateOrConnectWithoutUserInput | CpSessionCreateOrConnectWithoutUserInput[]
    upsert?: CpSessionUpsertWithWhereUniqueWithoutUserInput | CpSessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CpSessionCreateManyUserInputEnvelope
    set?: CpSessionWhereUniqueInput | CpSessionWhereUniqueInput[]
    disconnect?: CpSessionWhereUniqueInput | CpSessionWhereUniqueInput[]
    delete?: CpSessionWhereUniqueInput | CpSessionWhereUniqueInput[]
    connect?: CpSessionWhereUniqueInput | CpSessionWhereUniqueInput[]
    update?: CpSessionUpdateWithWhereUniqueWithoutUserInput | CpSessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CpSessionUpdateManyWithWhereWithoutUserInput | CpSessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CpSessionScalarWhereInput | CpSessionScalarWhereInput[]
  }

  export type CpAccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<CpAccountCreateWithoutUserInput, CpAccountUncheckedCreateWithoutUserInput> | CpAccountCreateWithoutUserInput[] | CpAccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CpAccountCreateOrConnectWithoutUserInput | CpAccountCreateOrConnectWithoutUserInput[]
    upsert?: CpAccountUpsertWithWhereUniqueWithoutUserInput | CpAccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CpAccountCreateManyUserInputEnvelope
    set?: CpAccountWhereUniqueInput | CpAccountWhereUniqueInput[]
    disconnect?: CpAccountWhereUniqueInput | CpAccountWhereUniqueInput[]
    delete?: CpAccountWhereUniqueInput | CpAccountWhereUniqueInput[]
    connect?: CpAccountWhereUniqueInput | CpAccountWhereUniqueInput[]
    update?: CpAccountUpdateWithWhereUniqueWithoutUserInput | CpAccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CpAccountUpdateManyWithWhereWithoutUserInput | CpAccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CpAccountScalarWhereInput | CpAccountScalarWhereInput[]
  }

  export type CpSessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CpSessionCreateWithoutUserInput, CpSessionUncheckedCreateWithoutUserInput> | CpSessionCreateWithoutUserInput[] | CpSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CpSessionCreateOrConnectWithoutUserInput | CpSessionCreateOrConnectWithoutUserInput[]
    upsert?: CpSessionUpsertWithWhereUniqueWithoutUserInput | CpSessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CpSessionCreateManyUserInputEnvelope
    set?: CpSessionWhereUniqueInput | CpSessionWhereUniqueInput[]
    disconnect?: CpSessionWhereUniqueInput | CpSessionWhereUniqueInput[]
    delete?: CpSessionWhereUniqueInput | CpSessionWhereUniqueInput[]
    connect?: CpSessionWhereUniqueInput | CpSessionWhereUniqueInput[]
    update?: CpSessionUpdateWithWhereUniqueWithoutUserInput | CpSessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CpSessionUpdateManyWithWhereWithoutUserInput | CpSessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CpSessionScalarWhereInput | CpSessionScalarWhereInput[]
  }

  export type CpAccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CpAccountCreateWithoutUserInput, CpAccountUncheckedCreateWithoutUserInput> | CpAccountCreateWithoutUserInput[] | CpAccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CpAccountCreateOrConnectWithoutUserInput | CpAccountCreateOrConnectWithoutUserInput[]
    upsert?: CpAccountUpsertWithWhereUniqueWithoutUserInput | CpAccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CpAccountCreateManyUserInputEnvelope
    set?: CpAccountWhereUniqueInput | CpAccountWhereUniqueInput[]
    disconnect?: CpAccountWhereUniqueInput | CpAccountWhereUniqueInput[]
    delete?: CpAccountWhereUniqueInput | CpAccountWhereUniqueInput[]
    connect?: CpAccountWhereUniqueInput | CpAccountWhereUniqueInput[]
    update?: CpAccountUpdateWithWhereUniqueWithoutUserInput | CpAccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CpAccountUpdateManyWithWhereWithoutUserInput | CpAccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CpAccountScalarWhereInput | CpAccountScalarWhereInput[]
  }

  export type CpUserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<CpUserCreateWithoutSessionsInput, CpUserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: CpUserCreateOrConnectWithoutSessionsInput
    connect?: CpUserWhereUniqueInput
  }

  export type CpUserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<CpUserCreateWithoutSessionsInput, CpUserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: CpUserCreateOrConnectWithoutSessionsInput
    upsert?: CpUserUpsertWithoutSessionsInput
    connect?: CpUserWhereUniqueInput
    update?: XOR<XOR<CpUserUpdateToOneWithWhereWithoutSessionsInput, CpUserUpdateWithoutSessionsInput>, CpUserUncheckedUpdateWithoutSessionsInput>
  }

  export type CpUserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<CpUserCreateWithoutAccountsInput, CpUserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: CpUserCreateOrConnectWithoutAccountsInput
    connect?: CpUserWhereUniqueInput
  }

  export type CpUserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<CpUserCreateWithoutAccountsInput, CpUserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: CpUserCreateOrConnectWithoutAccountsInput
    upsert?: CpUserUpsertWithoutAccountsInput
    connect?: CpUserWhereUniqueInput
    update?: XOR<XOR<CpUserUpdateToOneWithWhereWithoutAccountsInput, CpUserUpdateWithoutAccountsInput>, CpUserUncheckedUpdateWithoutAccountsInput>
  }

  export type CpOrganizationCreateNestedOneWithoutPatientIndexesInput = {
    create?: XOR<CpOrganizationCreateWithoutPatientIndexesInput, CpOrganizationUncheckedCreateWithoutPatientIndexesInput>
    connectOrCreate?: CpOrganizationCreateOrConnectWithoutPatientIndexesInput
    connect?: CpOrganizationWhereUniqueInput
  }

  export type CpOrganizationUpdateOneRequiredWithoutPatientIndexesNestedInput = {
    create?: XOR<CpOrganizationCreateWithoutPatientIndexesInput, CpOrganizationUncheckedCreateWithoutPatientIndexesInput>
    connectOrCreate?: CpOrganizationCreateOrConnectWithoutPatientIndexesInput
    upsert?: CpOrganizationUpsertWithoutPatientIndexesInput
    connect?: CpOrganizationWhereUniqueInput
    update?: XOR<XOR<CpOrganizationUpdateToOneWithWhereWithoutPatientIndexesInput, CpOrganizationUpdateWithoutPatientIndexesInput>, CpOrganizationUncheckedUpdateWithoutPatientIndexesInput>
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
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

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
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

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedUuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type NestedUuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type CpFeatureFlagCreateWithoutOrganizationInput = {
    featureKey: string
    isEnabled?: boolean
    configuredAt?: Date | string
    configuredBy?: string | null
  }

  export type CpFeatureFlagUncheckedCreateWithoutOrganizationInput = {
    featureKey: string
    isEnabled?: boolean
    configuredAt?: Date | string
    configuredBy?: string | null
  }

  export type CpFeatureFlagCreateOrConnectWithoutOrganizationInput = {
    where: CpFeatureFlagWhereUniqueInput
    create: XOR<CpFeatureFlagCreateWithoutOrganizationInput, CpFeatureFlagUncheckedCreateWithoutOrganizationInput>
  }

  export type CpFeatureFlagCreateManyOrganizationInputEnvelope = {
    data: CpFeatureFlagCreateManyOrganizationInput | CpFeatureFlagCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type CpUsageMetricCreateWithoutOrganizationInput = {
    id?: string
    recordedAt?: Date | string
    activeStaffCount?: number
    patientRecordsCount?: number
    storageBytesUsed?: bigint | number
    smsSentThisMonth?: number
    apiRequestsCount?: number
  }

  export type CpUsageMetricUncheckedCreateWithoutOrganizationInput = {
    id?: string
    recordedAt?: Date | string
    activeStaffCount?: number
    patientRecordsCount?: number
    storageBytesUsed?: bigint | number
    smsSentThisMonth?: number
    apiRequestsCount?: number
  }

  export type CpUsageMetricCreateOrConnectWithoutOrganizationInput = {
    where: CpUsageMetricWhereUniqueInput
    create: XOR<CpUsageMetricCreateWithoutOrganizationInput, CpUsageMetricUncheckedCreateWithoutOrganizationInput>
  }

  export type CpUsageMetricCreateManyOrganizationInputEnvelope = {
    data: CpUsageMetricCreateManyOrganizationInput | CpUsageMetricCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type CpTempAccessGrantCreateWithoutOrganizationInput = {
    id?: string
    requestedBy: string
    reason: string
    scope: string
    durationHours: number
    status?: string
    requestedAt?: Date | string
    approvedAt?: Date | string | null
    approvedBy?: string | null
    expiresAt?: Date | string | null
    revokedAt?: Date | string | null
    revokedBy?: string | null
  }

  export type CpTempAccessGrantUncheckedCreateWithoutOrganizationInput = {
    id?: string
    requestedBy: string
    reason: string
    scope: string
    durationHours: number
    status?: string
    requestedAt?: Date | string
    approvedAt?: Date | string | null
    approvedBy?: string | null
    expiresAt?: Date | string | null
    revokedAt?: Date | string | null
    revokedBy?: string | null
  }

  export type CpTempAccessGrantCreateOrConnectWithoutOrganizationInput = {
    where: CpTempAccessGrantWhereUniqueInput
    create: XOR<CpTempAccessGrantCreateWithoutOrganizationInput, CpTempAccessGrantUncheckedCreateWithoutOrganizationInput>
  }

  export type CpTempAccessGrantCreateManyOrganizationInputEnvelope = {
    data: CpTempAccessGrantCreateManyOrganizationInput | CpTempAccessGrantCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type CpTenantDbUpgradeCreateWithoutOrganizationInput = {
    id?: string
    schemaVersion: string
    status: string
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    errorLog?: string | null
  }

  export type CpTenantDbUpgradeUncheckedCreateWithoutOrganizationInput = {
    id?: string
    schemaVersion: string
    status: string
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    errorLog?: string | null
  }

  export type CpTenantDbUpgradeCreateOrConnectWithoutOrganizationInput = {
    where: CpTenantDbUpgradeWhereUniqueInput
    create: XOR<CpTenantDbUpgradeCreateWithoutOrganizationInput, CpTenantDbUpgradeUncheckedCreateWithoutOrganizationInput>
  }

  export type CpTenantDbUpgradeCreateManyOrganizationInputEnvelope = {
    data: CpTenantDbUpgradeCreateManyOrganizationInput | CpTenantDbUpgradeCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type CpIncidentCreateWithoutOrganizationInput = {
    id?: string
    title: string
    description?: string | null
    severity?: string | null
    status?: string
    createdBy?: string | null
    createdAt?: Date | string
    resolvedAt?: Date | string | null
  }

  export type CpIncidentUncheckedCreateWithoutOrganizationInput = {
    id?: string
    title: string
    description?: string | null
    severity?: string | null
    status?: string
    createdBy?: string | null
    createdAt?: Date | string
    resolvedAt?: Date | string | null
  }

  export type CpIncidentCreateOrConnectWithoutOrganizationInput = {
    where: CpIncidentWhereUniqueInput
    create: XOR<CpIncidentCreateWithoutOrganizationInput, CpIncidentUncheckedCreateWithoutOrganizationInput>
  }

  export type CpIncidentCreateManyOrganizationInputEnvelope = {
    data: CpIncidentCreateManyOrganizationInput | CpIncidentCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type CpMigrationCreateWithoutOrganizationInput = {
    id?: string
    sourceSystem: string
    status: string
    totalRecords?: number | null
    successCount?: number | null
    failedCount?: number | null
    runBy?: string | null
    runAt?: Date | string
    notes?: string | null
  }

  export type CpMigrationUncheckedCreateWithoutOrganizationInput = {
    id?: string
    sourceSystem: string
    status: string
    totalRecords?: number | null
    successCount?: number | null
    failedCount?: number | null
    runBy?: string | null
    runAt?: Date | string
    notes?: string | null
  }

  export type CpMigrationCreateOrConnectWithoutOrganizationInput = {
    where: CpMigrationWhereUniqueInput
    create: XOR<CpMigrationCreateWithoutOrganizationInput, CpMigrationUncheckedCreateWithoutOrganizationInput>
  }

  export type CpMigrationCreateManyOrganizationInputEnvelope = {
    data: CpMigrationCreateManyOrganizationInput | CpMigrationCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type CpPatientIndexCreateWithoutOrganizationInput = {
    id?: string
    patientPin: string
    firstName: string
    lastName: string
    birthDate: Date | string
    sex: string
    orgSlug: string
    createdAt?: Date | string
  }

  export type CpPatientIndexUncheckedCreateWithoutOrganizationInput = {
    id?: string
    patientPin: string
    firstName: string
    lastName: string
    birthDate: Date | string
    sex: string
    orgSlug: string
    createdAt?: Date | string
  }

  export type CpPatientIndexCreateOrConnectWithoutOrganizationInput = {
    where: CpPatientIndexWhereUniqueInput
    create: XOR<CpPatientIndexCreateWithoutOrganizationInput, CpPatientIndexUncheckedCreateWithoutOrganizationInput>
  }

  export type CpPatientIndexCreateManyOrganizationInputEnvelope = {
    data: CpPatientIndexCreateManyOrganizationInput | CpPatientIndexCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type CpFeatureFlagUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: CpFeatureFlagWhereUniqueInput
    update: XOR<CpFeatureFlagUpdateWithoutOrganizationInput, CpFeatureFlagUncheckedUpdateWithoutOrganizationInput>
    create: XOR<CpFeatureFlagCreateWithoutOrganizationInput, CpFeatureFlagUncheckedCreateWithoutOrganizationInput>
  }

  export type CpFeatureFlagUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: CpFeatureFlagWhereUniqueInput
    data: XOR<CpFeatureFlagUpdateWithoutOrganizationInput, CpFeatureFlagUncheckedUpdateWithoutOrganizationInput>
  }

  export type CpFeatureFlagUpdateManyWithWhereWithoutOrganizationInput = {
    where: CpFeatureFlagScalarWhereInput
    data: XOR<CpFeatureFlagUpdateManyMutationInput, CpFeatureFlagUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type CpFeatureFlagScalarWhereInput = {
    AND?: CpFeatureFlagScalarWhereInput | CpFeatureFlagScalarWhereInput[]
    OR?: CpFeatureFlagScalarWhereInput[]
    NOT?: CpFeatureFlagScalarWhereInput | CpFeatureFlagScalarWhereInput[]
    orgId?: UuidFilter<"CpFeatureFlag"> | string
    featureKey?: StringFilter<"CpFeatureFlag"> | string
    isEnabled?: BoolFilter<"CpFeatureFlag"> | boolean
    configuredAt?: DateTimeFilter<"CpFeatureFlag"> | Date | string
    configuredBy?: UuidNullableFilter<"CpFeatureFlag"> | string | null
  }

  export type CpUsageMetricUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: CpUsageMetricWhereUniqueInput
    update: XOR<CpUsageMetricUpdateWithoutOrganizationInput, CpUsageMetricUncheckedUpdateWithoutOrganizationInput>
    create: XOR<CpUsageMetricCreateWithoutOrganizationInput, CpUsageMetricUncheckedCreateWithoutOrganizationInput>
  }

  export type CpUsageMetricUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: CpUsageMetricWhereUniqueInput
    data: XOR<CpUsageMetricUpdateWithoutOrganizationInput, CpUsageMetricUncheckedUpdateWithoutOrganizationInput>
  }

  export type CpUsageMetricUpdateManyWithWhereWithoutOrganizationInput = {
    where: CpUsageMetricScalarWhereInput
    data: XOR<CpUsageMetricUpdateManyMutationInput, CpUsageMetricUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type CpUsageMetricScalarWhereInput = {
    AND?: CpUsageMetricScalarWhereInput | CpUsageMetricScalarWhereInput[]
    OR?: CpUsageMetricScalarWhereInput[]
    NOT?: CpUsageMetricScalarWhereInput | CpUsageMetricScalarWhereInput[]
    id?: UuidFilter<"CpUsageMetric"> | string
    orgId?: UuidFilter<"CpUsageMetric"> | string
    recordedAt?: DateTimeFilter<"CpUsageMetric"> | Date | string
    activeStaffCount?: IntFilter<"CpUsageMetric"> | number
    patientRecordsCount?: IntFilter<"CpUsageMetric"> | number
    storageBytesUsed?: BigIntFilter<"CpUsageMetric"> | bigint | number
    smsSentThisMonth?: IntFilter<"CpUsageMetric"> | number
    apiRequestsCount?: IntFilter<"CpUsageMetric"> | number
  }

  export type CpTempAccessGrantUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: CpTempAccessGrantWhereUniqueInput
    update: XOR<CpTempAccessGrantUpdateWithoutOrganizationInput, CpTempAccessGrantUncheckedUpdateWithoutOrganizationInput>
    create: XOR<CpTempAccessGrantCreateWithoutOrganizationInput, CpTempAccessGrantUncheckedCreateWithoutOrganizationInput>
  }

  export type CpTempAccessGrantUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: CpTempAccessGrantWhereUniqueInput
    data: XOR<CpTempAccessGrantUpdateWithoutOrganizationInput, CpTempAccessGrantUncheckedUpdateWithoutOrganizationInput>
  }

  export type CpTempAccessGrantUpdateManyWithWhereWithoutOrganizationInput = {
    where: CpTempAccessGrantScalarWhereInput
    data: XOR<CpTempAccessGrantUpdateManyMutationInput, CpTempAccessGrantUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type CpTempAccessGrantScalarWhereInput = {
    AND?: CpTempAccessGrantScalarWhereInput | CpTempAccessGrantScalarWhereInput[]
    OR?: CpTempAccessGrantScalarWhereInput[]
    NOT?: CpTempAccessGrantScalarWhereInput | CpTempAccessGrantScalarWhereInput[]
    id?: UuidFilter<"CpTempAccessGrant"> | string
    orgId?: UuidFilter<"CpTempAccessGrant"> | string
    requestedBy?: UuidFilter<"CpTempAccessGrant"> | string
    reason?: StringFilter<"CpTempAccessGrant"> | string
    scope?: StringFilter<"CpTempAccessGrant"> | string
    durationHours?: IntFilter<"CpTempAccessGrant"> | number
    status?: StringFilter<"CpTempAccessGrant"> | string
    requestedAt?: DateTimeFilter<"CpTempAccessGrant"> | Date | string
    approvedAt?: DateTimeNullableFilter<"CpTempAccessGrant"> | Date | string | null
    approvedBy?: StringNullableFilter<"CpTempAccessGrant"> | string | null
    expiresAt?: DateTimeNullableFilter<"CpTempAccessGrant"> | Date | string | null
    revokedAt?: DateTimeNullableFilter<"CpTempAccessGrant"> | Date | string | null
    revokedBy?: StringNullableFilter<"CpTempAccessGrant"> | string | null
  }

  export type CpTenantDbUpgradeUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: CpTenantDbUpgradeWhereUniqueInput
    update: XOR<CpTenantDbUpgradeUpdateWithoutOrganizationInput, CpTenantDbUpgradeUncheckedUpdateWithoutOrganizationInput>
    create: XOR<CpTenantDbUpgradeCreateWithoutOrganizationInput, CpTenantDbUpgradeUncheckedCreateWithoutOrganizationInput>
  }

  export type CpTenantDbUpgradeUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: CpTenantDbUpgradeWhereUniqueInput
    data: XOR<CpTenantDbUpgradeUpdateWithoutOrganizationInput, CpTenantDbUpgradeUncheckedUpdateWithoutOrganizationInput>
  }

  export type CpTenantDbUpgradeUpdateManyWithWhereWithoutOrganizationInput = {
    where: CpTenantDbUpgradeScalarWhereInput
    data: XOR<CpTenantDbUpgradeUpdateManyMutationInput, CpTenantDbUpgradeUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type CpTenantDbUpgradeScalarWhereInput = {
    AND?: CpTenantDbUpgradeScalarWhereInput | CpTenantDbUpgradeScalarWhereInput[]
    OR?: CpTenantDbUpgradeScalarWhereInput[]
    NOT?: CpTenantDbUpgradeScalarWhereInput | CpTenantDbUpgradeScalarWhereInput[]
    id?: UuidFilter<"CpTenantDbUpgrade"> | string
    orgId?: UuidFilter<"CpTenantDbUpgrade"> | string
    schemaVersion?: StringFilter<"CpTenantDbUpgrade"> | string
    status?: StringFilter<"CpTenantDbUpgrade"> | string
    startedAt?: DateTimeNullableFilter<"CpTenantDbUpgrade"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"CpTenantDbUpgrade"> | Date | string | null
    errorLog?: StringNullableFilter<"CpTenantDbUpgrade"> | string | null
  }

  export type CpIncidentUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: CpIncidentWhereUniqueInput
    update: XOR<CpIncidentUpdateWithoutOrganizationInput, CpIncidentUncheckedUpdateWithoutOrganizationInput>
    create: XOR<CpIncidentCreateWithoutOrganizationInput, CpIncidentUncheckedCreateWithoutOrganizationInput>
  }

  export type CpIncidentUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: CpIncidentWhereUniqueInput
    data: XOR<CpIncidentUpdateWithoutOrganizationInput, CpIncidentUncheckedUpdateWithoutOrganizationInput>
  }

  export type CpIncidentUpdateManyWithWhereWithoutOrganizationInput = {
    where: CpIncidentScalarWhereInput
    data: XOR<CpIncidentUpdateManyMutationInput, CpIncidentUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type CpIncidentScalarWhereInput = {
    AND?: CpIncidentScalarWhereInput | CpIncidentScalarWhereInput[]
    OR?: CpIncidentScalarWhereInput[]
    NOT?: CpIncidentScalarWhereInput | CpIncidentScalarWhereInput[]
    id?: UuidFilter<"CpIncident"> | string
    orgId?: UuidNullableFilter<"CpIncident"> | string | null
    title?: StringFilter<"CpIncident"> | string
    description?: StringNullableFilter<"CpIncident"> | string | null
    severity?: StringNullableFilter<"CpIncident"> | string | null
    status?: StringFilter<"CpIncident"> | string
    createdBy?: UuidNullableFilter<"CpIncident"> | string | null
    createdAt?: DateTimeFilter<"CpIncident"> | Date | string
    resolvedAt?: DateTimeNullableFilter<"CpIncident"> | Date | string | null
  }

  export type CpMigrationUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: CpMigrationWhereUniqueInput
    update: XOR<CpMigrationUpdateWithoutOrganizationInput, CpMigrationUncheckedUpdateWithoutOrganizationInput>
    create: XOR<CpMigrationCreateWithoutOrganizationInput, CpMigrationUncheckedCreateWithoutOrganizationInput>
  }

  export type CpMigrationUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: CpMigrationWhereUniqueInput
    data: XOR<CpMigrationUpdateWithoutOrganizationInput, CpMigrationUncheckedUpdateWithoutOrganizationInput>
  }

  export type CpMigrationUpdateManyWithWhereWithoutOrganizationInput = {
    where: CpMigrationScalarWhereInput
    data: XOR<CpMigrationUpdateManyMutationInput, CpMigrationUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type CpMigrationScalarWhereInput = {
    AND?: CpMigrationScalarWhereInput | CpMigrationScalarWhereInput[]
    OR?: CpMigrationScalarWhereInput[]
    NOT?: CpMigrationScalarWhereInput | CpMigrationScalarWhereInput[]
    id?: UuidFilter<"CpMigration"> | string
    orgId?: UuidFilter<"CpMigration"> | string
    sourceSystem?: StringFilter<"CpMigration"> | string
    status?: StringFilter<"CpMigration"> | string
    totalRecords?: IntNullableFilter<"CpMigration"> | number | null
    successCount?: IntNullableFilter<"CpMigration"> | number | null
    failedCount?: IntNullableFilter<"CpMigration"> | number | null
    runBy?: StringNullableFilter<"CpMigration"> | string | null
    runAt?: DateTimeFilter<"CpMigration"> | Date | string
    notes?: StringNullableFilter<"CpMigration"> | string | null
  }

  export type CpPatientIndexUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: CpPatientIndexWhereUniqueInput
    update: XOR<CpPatientIndexUpdateWithoutOrganizationInput, CpPatientIndexUncheckedUpdateWithoutOrganizationInput>
    create: XOR<CpPatientIndexCreateWithoutOrganizationInput, CpPatientIndexUncheckedCreateWithoutOrganizationInput>
  }

  export type CpPatientIndexUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: CpPatientIndexWhereUniqueInput
    data: XOR<CpPatientIndexUpdateWithoutOrganizationInput, CpPatientIndexUncheckedUpdateWithoutOrganizationInput>
  }

  export type CpPatientIndexUpdateManyWithWhereWithoutOrganizationInput = {
    where: CpPatientIndexScalarWhereInput
    data: XOR<CpPatientIndexUpdateManyMutationInput, CpPatientIndexUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type CpPatientIndexScalarWhereInput = {
    AND?: CpPatientIndexScalarWhereInput | CpPatientIndexScalarWhereInput[]
    OR?: CpPatientIndexScalarWhereInput[]
    NOT?: CpPatientIndexScalarWhereInput | CpPatientIndexScalarWhereInput[]
    id?: UuidFilter<"CpPatientIndex"> | string
    patientPin?: StringFilter<"CpPatientIndex"> | string
    firstName?: StringFilter<"CpPatientIndex"> | string
    lastName?: StringFilter<"CpPatientIndex"> | string
    birthDate?: DateTimeFilter<"CpPatientIndex"> | Date | string
    sex?: StringFilter<"CpPatientIndex"> | string
    orgId?: UuidFilter<"CpPatientIndex"> | string
    orgSlug?: StringFilter<"CpPatientIndex"> | string
    createdAt?: DateTimeFilter<"CpPatientIndex"> | Date | string
  }

  export type CpOrganizationCreateWithoutFeatureFlagsInput = {
    id?: string
    name: string
    slug: string
    type: string
    status?: string
    billingEmail?: string | null
    billingPlan?: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    maxStaffSeats?: number
    maxPatientRecords?: number
    maxStorageMb?: bigint | number
    customDomain?: string | null
    customDomainStatus?: string
    dnsVerificationToken?: string | null
    sslStatus?: string
    primaryColor?: string
    secondaryColor?: string
    logoUrl?: string | null
    deploymentUrl?: string | null
    dbConnectionUri?: string | null
    dbSchemaVersion?: string | null
    trialEndsAt?: Date | string | null
    contractStart?: Date | string | null
    contractEnd?: Date | string | null
    createdAt?: Date | string
    allowCrossOrgReferrals?: boolean
    referralCapacityStatus?: string
    referralGeographicScope?: string
    acceptedReferralTypes?: string
    usageMetrics?: CpUsageMetricCreateNestedManyWithoutOrganizationInput
    tempAccessGrants?: CpTempAccessGrantCreateNestedManyWithoutOrganizationInput
    tenantDbUpgrades?: CpTenantDbUpgradeCreateNestedManyWithoutOrganizationInput
    incidents?: CpIncidentCreateNestedManyWithoutOrganizationInput
    migrations?: CpMigrationCreateNestedManyWithoutOrganizationInput
    patientIndexes?: CpPatientIndexCreateNestedManyWithoutOrganizationInput
  }

  export type CpOrganizationUncheckedCreateWithoutFeatureFlagsInput = {
    id?: string
    name: string
    slug: string
    type: string
    status?: string
    billingEmail?: string | null
    billingPlan?: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    maxStaffSeats?: number
    maxPatientRecords?: number
    maxStorageMb?: bigint | number
    customDomain?: string | null
    customDomainStatus?: string
    dnsVerificationToken?: string | null
    sslStatus?: string
    primaryColor?: string
    secondaryColor?: string
    logoUrl?: string | null
    deploymentUrl?: string | null
    dbConnectionUri?: string | null
    dbSchemaVersion?: string | null
    trialEndsAt?: Date | string | null
    contractStart?: Date | string | null
    contractEnd?: Date | string | null
    createdAt?: Date | string
    allowCrossOrgReferrals?: boolean
    referralCapacityStatus?: string
    referralGeographicScope?: string
    acceptedReferralTypes?: string
    usageMetrics?: CpUsageMetricUncheckedCreateNestedManyWithoutOrganizationInput
    tempAccessGrants?: CpTempAccessGrantUncheckedCreateNestedManyWithoutOrganizationInput
    tenantDbUpgrades?: CpTenantDbUpgradeUncheckedCreateNestedManyWithoutOrganizationInput
    incidents?: CpIncidentUncheckedCreateNestedManyWithoutOrganizationInput
    migrations?: CpMigrationUncheckedCreateNestedManyWithoutOrganizationInput
    patientIndexes?: CpPatientIndexUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type CpOrganizationCreateOrConnectWithoutFeatureFlagsInput = {
    where: CpOrganizationWhereUniqueInput
    create: XOR<CpOrganizationCreateWithoutFeatureFlagsInput, CpOrganizationUncheckedCreateWithoutFeatureFlagsInput>
  }

  export type CpOrganizationUpsertWithoutFeatureFlagsInput = {
    update: XOR<CpOrganizationUpdateWithoutFeatureFlagsInput, CpOrganizationUncheckedUpdateWithoutFeatureFlagsInput>
    create: XOR<CpOrganizationCreateWithoutFeatureFlagsInput, CpOrganizationUncheckedCreateWithoutFeatureFlagsInput>
    where?: CpOrganizationWhereInput
  }

  export type CpOrganizationUpdateToOneWithWhereWithoutFeatureFlagsInput = {
    where?: CpOrganizationWhereInput
    data: XOR<CpOrganizationUpdateWithoutFeatureFlagsInput, CpOrganizationUncheckedUpdateWithoutFeatureFlagsInput>
  }

  export type CpOrganizationUpdateWithoutFeatureFlagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    billingEmail?: NullableStringFieldUpdateOperationsInput | string | null
    billingPlan?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    maxStaffSeats?: IntFieldUpdateOperationsInput | number
    maxPatientRecords?: IntFieldUpdateOperationsInput | number
    maxStorageMb?: BigIntFieldUpdateOperationsInput | bigint | number
    customDomain?: NullableStringFieldUpdateOperationsInput | string | null
    customDomainStatus?: StringFieldUpdateOperationsInput | string
    dnsVerificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    sslStatus?: StringFieldUpdateOperationsInput | string
    primaryColor?: StringFieldUpdateOperationsInput | string
    secondaryColor?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    deploymentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    dbConnectionUri?: NullableStringFieldUpdateOperationsInput | string | null
    dbSchemaVersion?: NullableStringFieldUpdateOperationsInput | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    contractStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    contractEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    allowCrossOrgReferrals?: BoolFieldUpdateOperationsInput | boolean
    referralCapacityStatus?: StringFieldUpdateOperationsInput | string
    referralGeographicScope?: StringFieldUpdateOperationsInput | string
    acceptedReferralTypes?: StringFieldUpdateOperationsInput | string
    usageMetrics?: CpUsageMetricUpdateManyWithoutOrganizationNestedInput
    tempAccessGrants?: CpTempAccessGrantUpdateManyWithoutOrganizationNestedInput
    tenantDbUpgrades?: CpTenantDbUpgradeUpdateManyWithoutOrganizationNestedInput
    incidents?: CpIncidentUpdateManyWithoutOrganizationNestedInput
    migrations?: CpMigrationUpdateManyWithoutOrganizationNestedInput
    patientIndexes?: CpPatientIndexUpdateManyWithoutOrganizationNestedInput
  }

  export type CpOrganizationUncheckedUpdateWithoutFeatureFlagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    billingEmail?: NullableStringFieldUpdateOperationsInput | string | null
    billingPlan?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    maxStaffSeats?: IntFieldUpdateOperationsInput | number
    maxPatientRecords?: IntFieldUpdateOperationsInput | number
    maxStorageMb?: BigIntFieldUpdateOperationsInput | bigint | number
    customDomain?: NullableStringFieldUpdateOperationsInput | string | null
    customDomainStatus?: StringFieldUpdateOperationsInput | string
    dnsVerificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    sslStatus?: StringFieldUpdateOperationsInput | string
    primaryColor?: StringFieldUpdateOperationsInput | string
    secondaryColor?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    deploymentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    dbConnectionUri?: NullableStringFieldUpdateOperationsInput | string | null
    dbSchemaVersion?: NullableStringFieldUpdateOperationsInput | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    contractStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    contractEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    allowCrossOrgReferrals?: BoolFieldUpdateOperationsInput | boolean
    referralCapacityStatus?: StringFieldUpdateOperationsInput | string
    referralGeographicScope?: StringFieldUpdateOperationsInput | string
    acceptedReferralTypes?: StringFieldUpdateOperationsInput | string
    usageMetrics?: CpUsageMetricUncheckedUpdateManyWithoutOrganizationNestedInput
    tempAccessGrants?: CpTempAccessGrantUncheckedUpdateManyWithoutOrganizationNestedInput
    tenantDbUpgrades?: CpTenantDbUpgradeUncheckedUpdateManyWithoutOrganizationNestedInput
    incidents?: CpIncidentUncheckedUpdateManyWithoutOrganizationNestedInput
    migrations?: CpMigrationUncheckedUpdateManyWithoutOrganizationNestedInput
    patientIndexes?: CpPatientIndexUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type CpOrganizationCreateWithoutUsageMetricsInput = {
    id?: string
    name: string
    slug: string
    type: string
    status?: string
    billingEmail?: string | null
    billingPlan?: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    maxStaffSeats?: number
    maxPatientRecords?: number
    maxStorageMb?: bigint | number
    customDomain?: string | null
    customDomainStatus?: string
    dnsVerificationToken?: string | null
    sslStatus?: string
    primaryColor?: string
    secondaryColor?: string
    logoUrl?: string | null
    deploymentUrl?: string | null
    dbConnectionUri?: string | null
    dbSchemaVersion?: string | null
    trialEndsAt?: Date | string | null
    contractStart?: Date | string | null
    contractEnd?: Date | string | null
    createdAt?: Date | string
    allowCrossOrgReferrals?: boolean
    referralCapacityStatus?: string
    referralGeographicScope?: string
    acceptedReferralTypes?: string
    featureFlags?: CpFeatureFlagCreateNestedManyWithoutOrganizationInput
    tempAccessGrants?: CpTempAccessGrantCreateNestedManyWithoutOrganizationInput
    tenantDbUpgrades?: CpTenantDbUpgradeCreateNestedManyWithoutOrganizationInput
    incidents?: CpIncidentCreateNestedManyWithoutOrganizationInput
    migrations?: CpMigrationCreateNestedManyWithoutOrganizationInput
    patientIndexes?: CpPatientIndexCreateNestedManyWithoutOrganizationInput
  }

  export type CpOrganizationUncheckedCreateWithoutUsageMetricsInput = {
    id?: string
    name: string
    slug: string
    type: string
    status?: string
    billingEmail?: string | null
    billingPlan?: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    maxStaffSeats?: number
    maxPatientRecords?: number
    maxStorageMb?: bigint | number
    customDomain?: string | null
    customDomainStatus?: string
    dnsVerificationToken?: string | null
    sslStatus?: string
    primaryColor?: string
    secondaryColor?: string
    logoUrl?: string | null
    deploymentUrl?: string | null
    dbConnectionUri?: string | null
    dbSchemaVersion?: string | null
    trialEndsAt?: Date | string | null
    contractStart?: Date | string | null
    contractEnd?: Date | string | null
    createdAt?: Date | string
    allowCrossOrgReferrals?: boolean
    referralCapacityStatus?: string
    referralGeographicScope?: string
    acceptedReferralTypes?: string
    featureFlags?: CpFeatureFlagUncheckedCreateNestedManyWithoutOrganizationInput
    tempAccessGrants?: CpTempAccessGrantUncheckedCreateNestedManyWithoutOrganizationInput
    tenantDbUpgrades?: CpTenantDbUpgradeUncheckedCreateNestedManyWithoutOrganizationInput
    incidents?: CpIncidentUncheckedCreateNestedManyWithoutOrganizationInput
    migrations?: CpMigrationUncheckedCreateNestedManyWithoutOrganizationInput
    patientIndexes?: CpPatientIndexUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type CpOrganizationCreateOrConnectWithoutUsageMetricsInput = {
    where: CpOrganizationWhereUniqueInput
    create: XOR<CpOrganizationCreateWithoutUsageMetricsInput, CpOrganizationUncheckedCreateWithoutUsageMetricsInput>
  }

  export type CpOrganizationUpsertWithoutUsageMetricsInput = {
    update: XOR<CpOrganizationUpdateWithoutUsageMetricsInput, CpOrganizationUncheckedUpdateWithoutUsageMetricsInput>
    create: XOR<CpOrganizationCreateWithoutUsageMetricsInput, CpOrganizationUncheckedCreateWithoutUsageMetricsInput>
    where?: CpOrganizationWhereInput
  }

  export type CpOrganizationUpdateToOneWithWhereWithoutUsageMetricsInput = {
    where?: CpOrganizationWhereInput
    data: XOR<CpOrganizationUpdateWithoutUsageMetricsInput, CpOrganizationUncheckedUpdateWithoutUsageMetricsInput>
  }

  export type CpOrganizationUpdateWithoutUsageMetricsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    billingEmail?: NullableStringFieldUpdateOperationsInput | string | null
    billingPlan?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    maxStaffSeats?: IntFieldUpdateOperationsInput | number
    maxPatientRecords?: IntFieldUpdateOperationsInput | number
    maxStorageMb?: BigIntFieldUpdateOperationsInput | bigint | number
    customDomain?: NullableStringFieldUpdateOperationsInput | string | null
    customDomainStatus?: StringFieldUpdateOperationsInput | string
    dnsVerificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    sslStatus?: StringFieldUpdateOperationsInput | string
    primaryColor?: StringFieldUpdateOperationsInput | string
    secondaryColor?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    deploymentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    dbConnectionUri?: NullableStringFieldUpdateOperationsInput | string | null
    dbSchemaVersion?: NullableStringFieldUpdateOperationsInput | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    contractStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    contractEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    allowCrossOrgReferrals?: BoolFieldUpdateOperationsInput | boolean
    referralCapacityStatus?: StringFieldUpdateOperationsInput | string
    referralGeographicScope?: StringFieldUpdateOperationsInput | string
    acceptedReferralTypes?: StringFieldUpdateOperationsInput | string
    featureFlags?: CpFeatureFlagUpdateManyWithoutOrganizationNestedInput
    tempAccessGrants?: CpTempAccessGrantUpdateManyWithoutOrganizationNestedInput
    tenantDbUpgrades?: CpTenantDbUpgradeUpdateManyWithoutOrganizationNestedInput
    incidents?: CpIncidentUpdateManyWithoutOrganizationNestedInput
    migrations?: CpMigrationUpdateManyWithoutOrganizationNestedInput
    patientIndexes?: CpPatientIndexUpdateManyWithoutOrganizationNestedInput
  }

  export type CpOrganizationUncheckedUpdateWithoutUsageMetricsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    billingEmail?: NullableStringFieldUpdateOperationsInput | string | null
    billingPlan?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    maxStaffSeats?: IntFieldUpdateOperationsInput | number
    maxPatientRecords?: IntFieldUpdateOperationsInput | number
    maxStorageMb?: BigIntFieldUpdateOperationsInput | bigint | number
    customDomain?: NullableStringFieldUpdateOperationsInput | string | null
    customDomainStatus?: StringFieldUpdateOperationsInput | string
    dnsVerificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    sslStatus?: StringFieldUpdateOperationsInput | string
    primaryColor?: StringFieldUpdateOperationsInput | string
    secondaryColor?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    deploymentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    dbConnectionUri?: NullableStringFieldUpdateOperationsInput | string | null
    dbSchemaVersion?: NullableStringFieldUpdateOperationsInput | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    contractStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    contractEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    allowCrossOrgReferrals?: BoolFieldUpdateOperationsInput | boolean
    referralCapacityStatus?: StringFieldUpdateOperationsInput | string
    referralGeographicScope?: StringFieldUpdateOperationsInput | string
    acceptedReferralTypes?: StringFieldUpdateOperationsInput | string
    featureFlags?: CpFeatureFlagUncheckedUpdateManyWithoutOrganizationNestedInput
    tempAccessGrants?: CpTempAccessGrantUncheckedUpdateManyWithoutOrganizationNestedInput
    tenantDbUpgrades?: CpTenantDbUpgradeUncheckedUpdateManyWithoutOrganizationNestedInput
    incidents?: CpIncidentUncheckedUpdateManyWithoutOrganizationNestedInput
    migrations?: CpMigrationUncheckedUpdateManyWithoutOrganizationNestedInput
    patientIndexes?: CpPatientIndexUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type CpOrganizationCreateWithoutTempAccessGrantsInput = {
    id?: string
    name: string
    slug: string
    type: string
    status?: string
    billingEmail?: string | null
    billingPlan?: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    maxStaffSeats?: number
    maxPatientRecords?: number
    maxStorageMb?: bigint | number
    customDomain?: string | null
    customDomainStatus?: string
    dnsVerificationToken?: string | null
    sslStatus?: string
    primaryColor?: string
    secondaryColor?: string
    logoUrl?: string | null
    deploymentUrl?: string | null
    dbConnectionUri?: string | null
    dbSchemaVersion?: string | null
    trialEndsAt?: Date | string | null
    contractStart?: Date | string | null
    contractEnd?: Date | string | null
    createdAt?: Date | string
    allowCrossOrgReferrals?: boolean
    referralCapacityStatus?: string
    referralGeographicScope?: string
    acceptedReferralTypes?: string
    featureFlags?: CpFeatureFlagCreateNestedManyWithoutOrganizationInput
    usageMetrics?: CpUsageMetricCreateNestedManyWithoutOrganizationInput
    tenantDbUpgrades?: CpTenantDbUpgradeCreateNestedManyWithoutOrganizationInput
    incidents?: CpIncidentCreateNestedManyWithoutOrganizationInput
    migrations?: CpMigrationCreateNestedManyWithoutOrganizationInput
    patientIndexes?: CpPatientIndexCreateNestedManyWithoutOrganizationInput
  }

  export type CpOrganizationUncheckedCreateWithoutTempAccessGrantsInput = {
    id?: string
    name: string
    slug: string
    type: string
    status?: string
    billingEmail?: string | null
    billingPlan?: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    maxStaffSeats?: number
    maxPatientRecords?: number
    maxStorageMb?: bigint | number
    customDomain?: string | null
    customDomainStatus?: string
    dnsVerificationToken?: string | null
    sslStatus?: string
    primaryColor?: string
    secondaryColor?: string
    logoUrl?: string | null
    deploymentUrl?: string | null
    dbConnectionUri?: string | null
    dbSchemaVersion?: string | null
    trialEndsAt?: Date | string | null
    contractStart?: Date | string | null
    contractEnd?: Date | string | null
    createdAt?: Date | string
    allowCrossOrgReferrals?: boolean
    referralCapacityStatus?: string
    referralGeographicScope?: string
    acceptedReferralTypes?: string
    featureFlags?: CpFeatureFlagUncheckedCreateNestedManyWithoutOrganizationInput
    usageMetrics?: CpUsageMetricUncheckedCreateNestedManyWithoutOrganizationInput
    tenantDbUpgrades?: CpTenantDbUpgradeUncheckedCreateNestedManyWithoutOrganizationInput
    incidents?: CpIncidentUncheckedCreateNestedManyWithoutOrganizationInput
    migrations?: CpMigrationUncheckedCreateNestedManyWithoutOrganizationInput
    patientIndexes?: CpPatientIndexUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type CpOrganizationCreateOrConnectWithoutTempAccessGrantsInput = {
    where: CpOrganizationWhereUniqueInput
    create: XOR<CpOrganizationCreateWithoutTempAccessGrantsInput, CpOrganizationUncheckedCreateWithoutTempAccessGrantsInput>
  }

  export type CpOrganizationUpsertWithoutTempAccessGrantsInput = {
    update: XOR<CpOrganizationUpdateWithoutTempAccessGrantsInput, CpOrganizationUncheckedUpdateWithoutTempAccessGrantsInput>
    create: XOR<CpOrganizationCreateWithoutTempAccessGrantsInput, CpOrganizationUncheckedCreateWithoutTempAccessGrantsInput>
    where?: CpOrganizationWhereInput
  }

  export type CpOrganizationUpdateToOneWithWhereWithoutTempAccessGrantsInput = {
    where?: CpOrganizationWhereInput
    data: XOR<CpOrganizationUpdateWithoutTempAccessGrantsInput, CpOrganizationUncheckedUpdateWithoutTempAccessGrantsInput>
  }

  export type CpOrganizationUpdateWithoutTempAccessGrantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    billingEmail?: NullableStringFieldUpdateOperationsInput | string | null
    billingPlan?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    maxStaffSeats?: IntFieldUpdateOperationsInput | number
    maxPatientRecords?: IntFieldUpdateOperationsInput | number
    maxStorageMb?: BigIntFieldUpdateOperationsInput | bigint | number
    customDomain?: NullableStringFieldUpdateOperationsInput | string | null
    customDomainStatus?: StringFieldUpdateOperationsInput | string
    dnsVerificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    sslStatus?: StringFieldUpdateOperationsInput | string
    primaryColor?: StringFieldUpdateOperationsInput | string
    secondaryColor?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    deploymentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    dbConnectionUri?: NullableStringFieldUpdateOperationsInput | string | null
    dbSchemaVersion?: NullableStringFieldUpdateOperationsInput | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    contractStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    contractEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    allowCrossOrgReferrals?: BoolFieldUpdateOperationsInput | boolean
    referralCapacityStatus?: StringFieldUpdateOperationsInput | string
    referralGeographicScope?: StringFieldUpdateOperationsInput | string
    acceptedReferralTypes?: StringFieldUpdateOperationsInput | string
    featureFlags?: CpFeatureFlagUpdateManyWithoutOrganizationNestedInput
    usageMetrics?: CpUsageMetricUpdateManyWithoutOrganizationNestedInput
    tenantDbUpgrades?: CpTenantDbUpgradeUpdateManyWithoutOrganizationNestedInput
    incidents?: CpIncidentUpdateManyWithoutOrganizationNestedInput
    migrations?: CpMigrationUpdateManyWithoutOrganizationNestedInput
    patientIndexes?: CpPatientIndexUpdateManyWithoutOrganizationNestedInput
  }

  export type CpOrganizationUncheckedUpdateWithoutTempAccessGrantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    billingEmail?: NullableStringFieldUpdateOperationsInput | string | null
    billingPlan?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    maxStaffSeats?: IntFieldUpdateOperationsInput | number
    maxPatientRecords?: IntFieldUpdateOperationsInput | number
    maxStorageMb?: BigIntFieldUpdateOperationsInput | bigint | number
    customDomain?: NullableStringFieldUpdateOperationsInput | string | null
    customDomainStatus?: StringFieldUpdateOperationsInput | string
    dnsVerificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    sslStatus?: StringFieldUpdateOperationsInput | string
    primaryColor?: StringFieldUpdateOperationsInput | string
    secondaryColor?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    deploymentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    dbConnectionUri?: NullableStringFieldUpdateOperationsInput | string | null
    dbSchemaVersion?: NullableStringFieldUpdateOperationsInput | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    contractStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    contractEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    allowCrossOrgReferrals?: BoolFieldUpdateOperationsInput | boolean
    referralCapacityStatus?: StringFieldUpdateOperationsInput | string
    referralGeographicScope?: StringFieldUpdateOperationsInput | string
    acceptedReferralTypes?: StringFieldUpdateOperationsInput | string
    featureFlags?: CpFeatureFlagUncheckedUpdateManyWithoutOrganizationNestedInput
    usageMetrics?: CpUsageMetricUncheckedUpdateManyWithoutOrganizationNestedInput
    tenantDbUpgrades?: CpTenantDbUpgradeUncheckedUpdateManyWithoutOrganizationNestedInput
    incidents?: CpIncidentUncheckedUpdateManyWithoutOrganizationNestedInput
    migrations?: CpMigrationUncheckedUpdateManyWithoutOrganizationNestedInput
    patientIndexes?: CpPatientIndexUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type CpOrganizationCreateWithoutTenantDbUpgradesInput = {
    id?: string
    name: string
    slug: string
    type: string
    status?: string
    billingEmail?: string | null
    billingPlan?: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    maxStaffSeats?: number
    maxPatientRecords?: number
    maxStorageMb?: bigint | number
    customDomain?: string | null
    customDomainStatus?: string
    dnsVerificationToken?: string | null
    sslStatus?: string
    primaryColor?: string
    secondaryColor?: string
    logoUrl?: string | null
    deploymentUrl?: string | null
    dbConnectionUri?: string | null
    dbSchemaVersion?: string | null
    trialEndsAt?: Date | string | null
    contractStart?: Date | string | null
    contractEnd?: Date | string | null
    createdAt?: Date | string
    allowCrossOrgReferrals?: boolean
    referralCapacityStatus?: string
    referralGeographicScope?: string
    acceptedReferralTypes?: string
    featureFlags?: CpFeatureFlagCreateNestedManyWithoutOrganizationInput
    usageMetrics?: CpUsageMetricCreateNestedManyWithoutOrganizationInput
    tempAccessGrants?: CpTempAccessGrantCreateNestedManyWithoutOrganizationInput
    incidents?: CpIncidentCreateNestedManyWithoutOrganizationInput
    migrations?: CpMigrationCreateNestedManyWithoutOrganizationInput
    patientIndexes?: CpPatientIndexCreateNestedManyWithoutOrganizationInput
  }

  export type CpOrganizationUncheckedCreateWithoutTenantDbUpgradesInput = {
    id?: string
    name: string
    slug: string
    type: string
    status?: string
    billingEmail?: string | null
    billingPlan?: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    maxStaffSeats?: number
    maxPatientRecords?: number
    maxStorageMb?: bigint | number
    customDomain?: string | null
    customDomainStatus?: string
    dnsVerificationToken?: string | null
    sslStatus?: string
    primaryColor?: string
    secondaryColor?: string
    logoUrl?: string | null
    deploymentUrl?: string | null
    dbConnectionUri?: string | null
    dbSchemaVersion?: string | null
    trialEndsAt?: Date | string | null
    contractStart?: Date | string | null
    contractEnd?: Date | string | null
    createdAt?: Date | string
    allowCrossOrgReferrals?: boolean
    referralCapacityStatus?: string
    referralGeographicScope?: string
    acceptedReferralTypes?: string
    featureFlags?: CpFeatureFlagUncheckedCreateNestedManyWithoutOrganizationInput
    usageMetrics?: CpUsageMetricUncheckedCreateNestedManyWithoutOrganizationInput
    tempAccessGrants?: CpTempAccessGrantUncheckedCreateNestedManyWithoutOrganizationInput
    incidents?: CpIncidentUncheckedCreateNestedManyWithoutOrganizationInput
    migrations?: CpMigrationUncheckedCreateNestedManyWithoutOrganizationInput
    patientIndexes?: CpPatientIndexUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type CpOrganizationCreateOrConnectWithoutTenantDbUpgradesInput = {
    where: CpOrganizationWhereUniqueInput
    create: XOR<CpOrganizationCreateWithoutTenantDbUpgradesInput, CpOrganizationUncheckedCreateWithoutTenantDbUpgradesInput>
  }

  export type CpOrganizationUpsertWithoutTenantDbUpgradesInput = {
    update: XOR<CpOrganizationUpdateWithoutTenantDbUpgradesInput, CpOrganizationUncheckedUpdateWithoutTenantDbUpgradesInput>
    create: XOR<CpOrganizationCreateWithoutTenantDbUpgradesInput, CpOrganizationUncheckedCreateWithoutTenantDbUpgradesInput>
    where?: CpOrganizationWhereInput
  }

  export type CpOrganizationUpdateToOneWithWhereWithoutTenantDbUpgradesInput = {
    where?: CpOrganizationWhereInput
    data: XOR<CpOrganizationUpdateWithoutTenantDbUpgradesInput, CpOrganizationUncheckedUpdateWithoutTenantDbUpgradesInput>
  }

  export type CpOrganizationUpdateWithoutTenantDbUpgradesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    billingEmail?: NullableStringFieldUpdateOperationsInput | string | null
    billingPlan?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    maxStaffSeats?: IntFieldUpdateOperationsInput | number
    maxPatientRecords?: IntFieldUpdateOperationsInput | number
    maxStorageMb?: BigIntFieldUpdateOperationsInput | bigint | number
    customDomain?: NullableStringFieldUpdateOperationsInput | string | null
    customDomainStatus?: StringFieldUpdateOperationsInput | string
    dnsVerificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    sslStatus?: StringFieldUpdateOperationsInput | string
    primaryColor?: StringFieldUpdateOperationsInput | string
    secondaryColor?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    deploymentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    dbConnectionUri?: NullableStringFieldUpdateOperationsInput | string | null
    dbSchemaVersion?: NullableStringFieldUpdateOperationsInput | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    contractStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    contractEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    allowCrossOrgReferrals?: BoolFieldUpdateOperationsInput | boolean
    referralCapacityStatus?: StringFieldUpdateOperationsInput | string
    referralGeographicScope?: StringFieldUpdateOperationsInput | string
    acceptedReferralTypes?: StringFieldUpdateOperationsInput | string
    featureFlags?: CpFeatureFlagUpdateManyWithoutOrganizationNestedInput
    usageMetrics?: CpUsageMetricUpdateManyWithoutOrganizationNestedInput
    tempAccessGrants?: CpTempAccessGrantUpdateManyWithoutOrganizationNestedInput
    incidents?: CpIncidentUpdateManyWithoutOrganizationNestedInput
    migrations?: CpMigrationUpdateManyWithoutOrganizationNestedInput
    patientIndexes?: CpPatientIndexUpdateManyWithoutOrganizationNestedInput
  }

  export type CpOrganizationUncheckedUpdateWithoutTenantDbUpgradesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    billingEmail?: NullableStringFieldUpdateOperationsInput | string | null
    billingPlan?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    maxStaffSeats?: IntFieldUpdateOperationsInput | number
    maxPatientRecords?: IntFieldUpdateOperationsInput | number
    maxStorageMb?: BigIntFieldUpdateOperationsInput | bigint | number
    customDomain?: NullableStringFieldUpdateOperationsInput | string | null
    customDomainStatus?: StringFieldUpdateOperationsInput | string
    dnsVerificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    sslStatus?: StringFieldUpdateOperationsInput | string
    primaryColor?: StringFieldUpdateOperationsInput | string
    secondaryColor?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    deploymentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    dbConnectionUri?: NullableStringFieldUpdateOperationsInput | string | null
    dbSchemaVersion?: NullableStringFieldUpdateOperationsInput | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    contractStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    contractEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    allowCrossOrgReferrals?: BoolFieldUpdateOperationsInput | boolean
    referralCapacityStatus?: StringFieldUpdateOperationsInput | string
    referralGeographicScope?: StringFieldUpdateOperationsInput | string
    acceptedReferralTypes?: StringFieldUpdateOperationsInput | string
    featureFlags?: CpFeatureFlagUncheckedUpdateManyWithoutOrganizationNestedInput
    usageMetrics?: CpUsageMetricUncheckedUpdateManyWithoutOrganizationNestedInput
    tempAccessGrants?: CpTempAccessGrantUncheckedUpdateManyWithoutOrganizationNestedInput
    incidents?: CpIncidentUncheckedUpdateManyWithoutOrganizationNestedInput
    migrations?: CpMigrationUncheckedUpdateManyWithoutOrganizationNestedInput
    patientIndexes?: CpPatientIndexUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type CpOrganizationCreateWithoutIncidentsInput = {
    id?: string
    name: string
    slug: string
    type: string
    status?: string
    billingEmail?: string | null
    billingPlan?: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    maxStaffSeats?: number
    maxPatientRecords?: number
    maxStorageMb?: bigint | number
    customDomain?: string | null
    customDomainStatus?: string
    dnsVerificationToken?: string | null
    sslStatus?: string
    primaryColor?: string
    secondaryColor?: string
    logoUrl?: string | null
    deploymentUrl?: string | null
    dbConnectionUri?: string | null
    dbSchemaVersion?: string | null
    trialEndsAt?: Date | string | null
    contractStart?: Date | string | null
    contractEnd?: Date | string | null
    createdAt?: Date | string
    allowCrossOrgReferrals?: boolean
    referralCapacityStatus?: string
    referralGeographicScope?: string
    acceptedReferralTypes?: string
    featureFlags?: CpFeatureFlagCreateNestedManyWithoutOrganizationInput
    usageMetrics?: CpUsageMetricCreateNestedManyWithoutOrganizationInput
    tempAccessGrants?: CpTempAccessGrantCreateNestedManyWithoutOrganizationInput
    tenantDbUpgrades?: CpTenantDbUpgradeCreateNestedManyWithoutOrganizationInput
    migrations?: CpMigrationCreateNestedManyWithoutOrganizationInput
    patientIndexes?: CpPatientIndexCreateNestedManyWithoutOrganizationInput
  }

  export type CpOrganizationUncheckedCreateWithoutIncidentsInput = {
    id?: string
    name: string
    slug: string
    type: string
    status?: string
    billingEmail?: string | null
    billingPlan?: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    maxStaffSeats?: number
    maxPatientRecords?: number
    maxStorageMb?: bigint | number
    customDomain?: string | null
    customDomainStatus?: string
    dnsVerificationToken?: string | null
    sslStatus?: string
    primaryColor?: string
    secondaryColor?: string
    logoUrl?: string | null
    deploymentUrl?: string | null
    dbConnectionUri?: string | null
    dbSchemaVersion?: string | null
    trialEndsAt?: Date | string | null
    contractStart?: Date | string | null
    contractEnd?: Date | string | null
    createdAt?: Date | string
    allowCrossOrgReferrals?: boolean
    referralCapacityStatus?: string
    referralGeographicScope?: string
    acceptedReferralTypes?: string
    featureFlags?: CpFeatureFlagUncheckedCreateNestedManyWithoutOrganizationInput
    usageMetrics?: CpUsageMetricUncheckedCreateNestedManyWithoutOrganizationInput
    tempAccessGrants?: CpTempAccessGrantUncheckedCreateNestedManyWithoutOrganizationInput
    tenantDbUpgrades?: CpTenantDbUpgradeUncheckedCreateNestedManyWithoutOrganizationInput
    migrations?: CpMigrationUncheckedCreateNestedManyWithoutOrganizationInput
    patientIndexes?: CpPatientIndexUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type CpOrganizationCreateOrConnectWithoutIncidentsInput = {
    where: CpOrganizationWhereUniqueInput
    create: XOR<CpOrganizationCreateWithoutIncidentsInput, CpOrganizationUncheckedCreateWithoutIncidentsInput>
  }

  export type CpOrganizationUpsertWithoutIncidentsInput = {
    update: XOR<CpOrganizationUpdateWithoutIncidentsInput, CpOrganizationUncheckedUpdateWithoutIncidentsInput>
    create: XOR<CpOrganizationCreateWithoutIncidentsInput, CpOrganizationUncheckedCreateWithoutIncidentsInput>
    where?: CpOrganizationWhereInput
  }

  export type CpOrganizationUpdateToOneWithWhereWithoutIncidentsInput = {
    where?: CpOrganizationWhereInput
    data: XOR<CpOrganizationUpdateWithoutIncidentsInput, CpOrganizationUncheckedUpdateWithoutIncidentsInput>
  }

  export type CpOrganizationUpdateWithoutIncidentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    billingEmail?: NullableStringFieldUpdateOperationsInput | string | null
    billingPlan?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    maxStaffSeats?: IntFieldUpdateOperationsInput | number
    maxPatientRecords?: IntFieldUpdateOperationsInput | number
    maxStorageMb?: BigIntFieldUpdateOperationsInput | bigint | number
    customDomain?: NullableStringFieldUpdateOperationsInput | string | null
    customDomainStatus?: StringFieldUpdateOperationsInput | string
    dnsVerificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    sslStatus?: StringFieldUpdateOperationsInput | string
    primaryColor?: StringFieldUpdateOperationsInput | string
    secondaryColor?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    deploymentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    dbConnectionUri?: NullableStringFieldUpdateOperationsInput | string | null
    dbSchemaVersion?: NullableStringFieldUpdateOperationsInput | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    contractStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    contractEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    allowCrossOrgReferrals?: BoolFieldUpdateOperationsInput | boolean
    referralCapacityStatus?: StringFieldUpdateOperationsInput | string
    referralGeographicScope?: StringFieldUpdateOperationsInput | string
    acceptedReferralTypes?: StringFieldUpdateOperationsInput | string
    featureFlags?: CpFeatureFlagUpdateManyWithoutOrganizationNestedInput
    usageMetrics?: CpUsageMetricUpdateManyWithoutOrganizationNestedInput
    tempAccessGrants?: CpTempAccessGrantUpdateManyWithoutOrganizationNestedInput
    tenantDbUpgrades?: CpTenantDbUpgradeUpdateManyWithoutOrganizationNestedInput
    migrations?: CpMigrationUpdateManyWithoutOrganizationNestedInput
    patientIndexes?: CpPatientIndexUpdateManyWithoutOrganizationNestedInput
  }

  export type CpOrganizationUncheckedUpdateWithoutIncidentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    billingEmail?: NullableStringFieldUpdateOperationsInput | string | null
    billingPlan?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    maxStaffSeats?: IntFieldUpdateOperationsInput | number
    maxPatientRecords?: IntFieldUpdateOperationsInput | number
    maxStorageMb?: BigIntFieldUpdateOperationsInput | bigint | number
    customDomain?: NullableStringFieldUpdateOperationsInput | string | null
    customDomainStatus?: StringFieldUpdateOperationsInput | string
    dnsVerificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    sslStatus?: StringFieldUpdateOperationsInput | string
    primaryColor?: StringFieldUpdateOperationsInput | string
    secondaryColor?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    deploymentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    dbConnectionUri?: NullableStringFieldUpdateOperationsInput | string | null
    dbSchemaVersion?: NullableStringFieldUpdateOperationsInput | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    contractStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    contractEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    allowCrossOrgReferrals?: BoolFieldUpdateOperationsInput | boolean
    referralCapacityStatus?: StringFieldUpdateOperationsInput | string
    referralGeographicScope?: StringFieldUpdateOperationsInput | string
    acceptedReferralTypes?: StringFieldUpdateOperationsInput | string
    featureFlags?: CpFeatureFlagUncheckedUpdateManyWithoutOrganizationNestedInput
    usageMetrics?: CpUsageMetricUncheckedUpdateManyWithoutOrganizationNestedInput
    tempAccessGrants?: CpTempAccessGrantUncheckedUpdateManyWithoutOrganizationNestedInput
    tenantDbUpgrades?: CpTenantDbUpgradeUncheckedUpdateManyWithoutOrganizationNestedInput
    migrations?: CpMigrationUncheckedUpdateManyWithoutOrganizationNestedInput
    patientIndexes?: CpPatientIndexUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type CpOrganizationCreateWithoutMigrationsInput = {
    id?: string
    name: string
    slug: string
    type: string
    status?: string
    billingEmail?: string | null
    billingPlan?: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    maxStaffSeats?: number
    maxPatientRecords?: number
    maxStorageMb?: bigint | number
    customDomain?: string | null
    customDomainStatus?: string
    dnsVerificationToken?: string | null
    sslStatus?: string
    primaryColor?: string
    secondaryColor?: string
    logoUrl?: string | null
    deploymentUrl?: string | null
    dbConnectionUri?: string | null
    dbSchemaVersion?: string | null
    trialEndsAt?: Date | string | null
    contractStart?: Date | string | null
    contractEnd?: Date | string | null
    createdAt?: Date | string
    allowCrossOrgReferrals?: boolean
    referralCapacityStatus?: string
    referralGeographicScope?: string
    acceptedReferralTypes?: string
    featureFlags?: CpFeatureFlagCreateNestedManyWithoutOrganizationInput
    usageMetrics?: CpUsageMetricCreateNestedManyWithoutOrganizationInput
    tempAccessGrants?: CpTempAccessGrantCreateNestedManyWithoutOrganizationInput
    tenantDbUpgrades?: CpTenantDbUpgradeCreateNestedManyWithoutOrganizationInput
    incidents?: CpIncidentCreateNestedManyWithoutOrganizationInput
    patientIndexes?: CpPatientIndexCreateNestedManyWithoutOrganizationInput
  }

  export type CpOrganizationUncheckedCreateWithoutMigrationsInput = {
    id?: string
    name: string
    slug: string
    type: string
    status?: string
    billingEmail?: string | null
    billingPlan?: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    maxStaffSeats?: number
    maxPatientRecords?: number
    maxStorageMb?: bigint | number
    customDomain?: string | null
    customDomainStatus?: string
    dnsVerificationToken?: string | null
    sslStatus?: string
    primaryColor?: string
    secondaryColor?: string
    logoUrl?: string | null
    deploymentUrl?: string | null
    dbConnectionUri?: string | null
    dbSchemaVersion?: string | null
    trialEndsAt?: Date | string | null
    contractStart?: Date | string | null
    contractEnd?: Date | string | null
    createdAt?: Date | string
    allowCrossOrgReferrals?: boolean
    referralCapacityStatus?: string
    referralGeographicScope?: string
    acceptedReferralTypes?: string
    featureFlags?: CpFeatureFlagUncheckedCreateNestedManyWithoutOrganizationInput
    usageMetrics?: CpUsageMetricUncheckedCreateNestedManyWithoutOrganizationInput
    tempAccessGrants?: CpTempAccessGrantUncheckedCreateNestedManyWithoutOrganizationInput
    tenantDbUpgrades?: CpTenantDbUpgradeUncheckedCreateNestedManyWithoutOrganizationInput
    incidents?: CpIncidentUncheckedCreateNestedManyWithoutOrganizationInput
    patientIndexes?: CpPatientIndexUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type CpOrganizationCreateOrConnectWithoutMigrationsInput = {
    where: CpOrganizationWhereUniqueInput
    create: XOR<CpOrganizationCreateWithoutMigrationsInput, CpOrganizationUncheckedCreateWithoutMigrationsInput>
  }

  export type CpOrganizationUpsertWithoutMigrationsInput = {
    update: XOR<CpOrganizationUpdateWithoutMigrationsInput, CpOrganizationUncheckedUpdateWithoutMigrationsInput>
    create: XOR<CpOrganizationCreateWithoutMigrationsInput, CpOrganizationUncheckedCreateWithoutMigrationsInput>
    where?: CpOrganizationWhereInput
  }

  export type CpOrganizationUpdateToOneWithWhereWithoutMigrationsInput = {
    where?: CpOrganizationWhereInput
    data: XOR<CpOrganizationUpdateWithoutMigrationsInput, CpOrganizationUncheckedUpdateWithoutMigrationsInput>
  }

  export type CpOrganizationUpdateWithoutMigrationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    billingEmail?: NullableStringFieldUpdateOperationsInput | string | null
    billingPlan?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    maxStaffSeats?: IntFieldUpdateOperationsInput | number
    maxPatientRecords?: IntFieldUpdateOperationsInput | number
    maxStorageMb?: BigIntFieldUpdateOperationsInput | bigint | number
    customDomain?: NullableStringFieldUpdateOperationsInput | string | null
    customDomainStatus?: StringFieldUpdateOperationsInput | string
    dnsVerificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    sslStatus?: StringFieldUpdateOperationsInput | string
    primaryColor?: StringFieldUpdateOperationsInput | string
    secondaryColor?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    deploymentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    dbConnectionUri?: NullableStringFieldUpdateOperationsInput | string | null
    dbSchemaVersion?: NullableStringFieldUpdateOperationsInput | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    contractStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    contractEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    allowCrossOrgReferrals?: BoolFieldUpdateOperationsInput | boolean
    referralCapacityStatus?: StringFieldUpdateOperationsInput | string
    referralGeographicScope?: StringFieldUpdateOperationsInput | string
    acceptedReferralTypes?: StringFieldUpdateOperationsInput | string
    featureFlags?: CpFeatureFlagUpdateManyWithoutOrganizationNestedInput
    usageMetrics?: CpUsageMetricUpdateManyWithoutOrganizationNestedInput
    tempAccessGrants?: CpTempAccessGrantUpdateManyWithoutOrganizationNestedInput
    tenantDbUpgrades?: CpTenantDbUpgradeUpdateManyWithoutOrganizationNestedInput
    incidents?: CpIncidentUpdateManyWithoutOrganizationNestedInput
    patientIndexes?: CpPatientIndexUpdateManyWithoutOrganizationNestedInput
  }

  export type CpOrganizationUncheckedUpdateWithoutMigrationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    billingEmail?: NullableStringFieldUpdateOperationsInput | string | null
    billingPlan?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    maxStaffSeats?: IntFieldUpdateOperationsInput | number
    maxPatientRecords?: IntFieldUpdateOperationsInput | number
    maxStorageMb?: BigIntFieldUpdateOperationsInput | bigint | number
    customDomain?: NullableStringFieldUpdateOperationsInput | string | null
    customDomainStatus?: StringFieldUpdateOperationsInput | string
    dnsVerificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    sslStatus?: StringFieldUpdateOperationsInput | string
    primaryColor?: StringFieldUpdateOperationsInput | string
    secondaryColor?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    deploymentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    dbConnectionUri?: NullableStringFieldUpdateOperationsInput | string | null
    dbSchemaVersion?: NullableStringFieldUpdateOperationsInput | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    contractStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    contractEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    allowCrossOrgReferrals?: BoolFieldUpdateOperationsInput | boolean
    referralCapacityStatus?: StringFieldUpdateOperationsInput | string
    referralGeographicScope?: StringFieldUpdateOperationsInput | string
    acceptedReferralTypes?: StringFieldUpdateOperationsInput | string
    featureFlags?: CpFeatureFlagUncheckedUpdateManyWithoutOrganizationNestedInput
    usageMetrics?: CpUsageMetricUncheckedUpdateManyWithoutOrganizationNestedInput
    tempAccessGrants?: CpTempAccessGrantUncheckedUpdateManyWithoutOrganizationNestedInput
    tenantDbUpgrades?: CpTenantDbUpgradeUncheckedUpdateManyWithoutOrganizationNestedInput
    incidents?: CpIncidentUncheckedUpdateManyWithoutOrganizationNestedInput
    patientIndexes?: CpPatientIndexUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type CpSessionCreateWithoutUserInput = {
    id?: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
  }

  export type CpSessionUncheckedCreateWithoutUserInput = {
    id?: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
  }

  export type CpSessionCreateOrConnectWithoutUserInput = {
    where: CpSessionWhereUniqueInput
    create: XOR<CpSessionCreateWithoutUserInput, CpSessionUncheckedCreateWithoutUserInput>
  }

  export type CpSessionCreateManyUserInputEnvelope = {
    data: CpSessionCreateManyUserInput | CpSessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CpAccountCreateWithoutUserInput = {
    id?: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    expiresAt?: Date | string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CpAccountUncheckedCreateWithoutUserInput = {
    id?: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    expiresAt?: Date | string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CpAccountCreateOrConnectWithoutUserInput = {
    where: CpAccountWhereUniqueInput
    create: XOR<CpAccountCreateWithoutUserInput, CpAccountUncheckedCreateWithoutUserInput>
  }

  export type CpAccountCreateManyUserInputEnvelope = {
    data: CpAccountCreateManyUserInput | CpAccountCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CpSessionUpsertWithWhereUniqueWithoutUserInput = {
    where: CpSessionWhereUniqueInput
    update: XOR<CpSessionUpdateWithoutUserInput, CpSessionUncheckedUpdateWithoutUserInput>
    create: XOR<CpSessionCreateWithoutUserInput, CpSessionUncheckedCreateWithoutUserInput>
  }

  export type CpSessionUpdateWithWhereUniqueWithoutUserInput = {
    where: CpSessionWhereUniqueInput
    data: XOR<CpSessionUpdateWithoutUserInput, CpSessionUncheckedUpdateWithoutUserInput>
  }

  export type CpSessionUpdateManyWithWhereWithoutUserInput = {
    where: CpSessionScalarWhereInput
    data: XOR<CpSessionUpdateManyMutationInput, CpSessionUncheckedUpdateManyWithoutUserInput>
  }

  export type CpSessionScalarWhereInput = {
    AND?: CpSessionScalarWhereInput | CpSessionScalarWhereInput[]
    OR?: CpSessionScalarWhereInput[]
    NOT?: CpSessionScalarWhereInput | CpSessionScalarWhereInput[]
    id?: UuidFilter<"CpSession"> | string
    expiresAt?: DateTimeFilter<"CpSession"> | Date | string
    token?: StringFilter<"CpSession"> | string
    createdAt?: DateTimeFilter<"CpSession"> | Date | string
    updatedAt?: DateTimeFilter<"CpSession"> | Date | string
    ipAddress?: StringNullableFilter<"CpSession"> | string | null
    userAgent?: StringNullableFilter<"CpSession"> | string | null
    userId?: UuidFilter<"CpSession"> | string
  }

  export type CpAccountUpsertWithWhereUniqueWithoutUserInput = {
    where: CpAccountWhereUniqueInput
    update: XOR<CpAccountUpdateWithoutUserInput, CpAccountUncheckedUpdateWithoutUserInput>
    create: XOR<CpAccountCreateWithoutUserInput, CpAccountUncheckedCreateWithoutUserInput>
  }

  export type CpAccountUpdateWithWhereUniqueWithoutUserInput = {
    where: CpAccountWhereUniqueInput
    data: XOR<CpAccountUpdateWithoutUserInput, CpAccountUncheckedUpdateWithoutUserInput>
  }

  export type CpAccountUpdateManyWithWhereWithoutUserInput = {
    where: CpAccountScalarWhereInput
    data: XOR<CpAccountUpdateManyMutationInput, CpAccountUncheckedUpdateManyWithoutUserInput>
  }

  export type CpAccountScalarWhereInput = {
    AND?: CpAccountScalarWhereInput | CpAccountScalarWhereInput[]
    OR?: CpAccountScalarWhereInput[]
    NOT?: CpAccountScalarWhereInput | CpAccountScalarWhereInput[]
    id?: UuidFilter<"CpAccount"> | string
    accountId?: StringFilter<"CpAccount"> | string
    providerId?: StringFilter<"CpAccount"> | string
    userId?: UuidFilter<"CpAccount"> | string
    accessToken?: StringNullableFilter<"CpAccount"> | string | null
    refreshToken?: StringNullableFilter<"CpAccount"> | string | null
    idToken?: StringNullableFilter<"CpAccount"> | string | null
    expiresAt?: DateTimeNullableFilter<"CpAccount"> | Date | string | null
    password?: StringNullableFilter<"CpAccount"> | string | null
    createdAt?: DateTimeFilter<"CpAccount"> | Date | string
    updatedAt?: DateTimeFilter<"CpAccount"> | Date | string
  }

  export type CpUserCreateWithoutSessionsInput = {
    id?: string
    email: string
    name?: string | null
    emailVerified?: boolean
    image?: string | null
    passwordHash?: string | null
    mfaEnabled?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: CpAccountCreateNestedManyWithoutUserInput
  }

  export type CpUserUncheckedCreateWithoutSessionsInput = {
    id?: string
    email: string
    name?: string | null
    emailVerified?: boolean
    image?: string | null
    passwordHash?: string | null
    mfaEnabled?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: CpAccountUncheckedCreateNestedManyWithoutUserInput
  }

  export type CpUserCreateOrConnectWithoutSessionsInput = {
    where: CpUserWhereUniqueInput
    create: XOR<CpUserCreateWithoutSessionsInput, CpUserUncheckedCreateWithoutSessionsInput>
  }

  export type CpUserUpsertWithoutSessionsInput = {
    update: XOR<CpUserUpdateWithoutSessionsInput, CpUserUncheckedUpdateWithoutSessionsInput>
    create: XOR<CpUserCreateWithoutSessionsInput, CpUserUncheckedCreateWithoutSessionsInput>
    where?: CpUserWhereInput
  }

  export type CpUserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: CpUserWhereInput
    data: XOR<CpUserUpdateWithoutSessionsInput, CpUserUncheckedUpdateWithoutSessionsInput>
  }

  export type CpUserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    mfaEnabled?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: CpAccountUpdateManyWithoutUserNestedInput
  }

  export type CpUserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    mfaEnabled?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: CpAccountUncheckedUpdateManyWithoutUserNestedInput
  }

  export type CpUserCreateWithoutAccountsInput = {
    id?: string
    email: string
    name?: string | null
    emailVerified?: boolean
    image?: string | null
    passwordHash?: string | null
    mfaEnabled?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: CpSessionCreateNestedManyWithoutUserInput
  }

  export type CpUserUncheckedCreateWithoutAccountsInput = {
    id?: string
    email: string
    name?: string | null
    emailVerified?: boolean
    image?: string | null
    passwordHash?: string | null
    mfaEnabled?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: CpSessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type CpUserCreateOrConnectWithoutAccountsInput = {
    where: CpUserWhereUniqueInput
    create: XOR<CpUserCreateWithoutAccountsInput, CpUserUncheckedCreateWithoutAccountsInput>
  }

  export type CpUserUpsertWithoutAccountsInput = {
    update: XOR<CpUserUpdateWithoutAccountsInput, CpUserUncheckedUpdateWithoutAccountsInput>
    create: XOR<CpUserCreateWithoutAccountsInput, CpUserUncheckedCreateWithoutAccountsInput>
    where?: CpUserWhereInput
  }

  export type CpUserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: CpUserWhereInput
    data: XOR<CpUserUpdateWithoutAccountsInput, CpUserUncheckedUpdateWithoutAccountsInput>
  }

  export type CpUserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    mfaEnabled?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: CpSessionUpdateManyWithoutUserNestedInput
  }

  export type CpUserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    mfaEnabled?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: CpSessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type CpOrganizationCreateWithoutPatientIndexesInput = {
    id?: string
    name: string
    slug: string
    type: string
    status?: string
    billingEmail?: string | null
    billingPlan?: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    maxStaffSeats?: number
    maxPatientRecords?: number
    maxStorageMb?: bigint | number
    customDomain?: string | null
    customDomainStatus?: string
    dnsVerificationToken?: string | null
    sslStatus?: string
    primaryColor?: string
    secondaryColor?: string
    logoUrl?: string | null
    deploymentUrl?: string | null
    dbConnectionUri?: string | null
    dbSchemaVersion?: string | null
    trialEndsAt?: Date | string | null
    contractStart?: Date | string | null
    contractEnd?: Date | string | null
    createdAt?: Date | string
    allowCrossOrgReferrals?: boolean
    referralCapacityStatus?: string
    referralGeographicScope?: string
    acceptedReferralTypes?: string
    featureFlags?: CpFeatureFlagCreateNestedManyWithoutOrganizationInput
    usageMetrics?: CpUsageMetricCreateNestedManyWithoutOrganizationInput
    tempAccessGrants?: CpTempAccessGrantCreateNestedManyWithoutOrganizationInput
    tenantDbUpgrades?: CpTenantDbUpgradeCreateNestedManyWithoutOrganizationInput
    incidents?: CpIncidentCreateNestedManyWithoutOrganizationInput
    migrations?: CpMigrationCreateNestedManyWithoutOrganizationInput
  }

  export type CpOrganizationUncheckedCreateWithoutPatientIndexesInput = {
    id?: string
    name: string
    slug: string
    type: string
    status?: string
    billingEmail?: string | null
    billingPlan?: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    maxStaffSeats?: number
    maxPatientRecords?: number
    maxStorageMb?: bigint | number
    customDomain?: string | null
    customDomainStatus?: string
    dnsVerificationToken?: string | null
    sslStatus?: string
    primaryColor?: string
    secondaryColor?: string
    logoUrl?: string | null
    deploymentUrl?: string | null
    dbConnectionUri?: string | null
    dbSchemaVersion?: string | null
    trialEndsAt?: Date | string | null
    contractStart?: Date | string | null
    contractEnd?: Date | string | null
    createdAt?: Date | string
    allowCrossOrgReferrals?: boolean
    referralCapacityStatus?: string
    referralGeographicScope?: string
    acceptedReferralTypes?: string
    featureFlags?: CpFeatureFlagUncheckedCreateNestedManyWithoutOrganizationInput
    usageMetrics?: CpUsageMetricUncheckedCreateNestedManyWithoutOrganizationInput
    tempAccessGrants?: CpTempAccessGrantUncheckedCreateNestedManyWithoutOrganizationInput
    tenantDbUpgrades?: CpTenantDbUpgradeUncheckedCreateNestedManyWithoutOrganizationInput
    incidents?: CpIncidentUncheckedCreateNestedManyWithoutOrganizationInput
    migrations?: CpMigrationUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type CpOrganizationCreateOrConnectWithoutPatientIndexesInput = {
    where: CpOrganizationWhereUniqueInput
    create: XOR<CpOrganizationCreateWithoutPatientIndexesInput, CpOrganizationUncheckedCreateWithoutPatientIndexesInput>
  }

  export type CpOrganizationUpsertWithoutPatientIndexesInput = {
    update: XOR<CpOrganizationUpdateWithoutPatientIndexesInput, CpOrganizationUncheckedUpdateWithoutPatientIndexesInput>
    create: XOR<CpOrganizationCreateWithoutPatientIndexesInput, CpOrganizationUncheckedCreateWithoutPatientIndexesInput>
    where?: CpOrganizationWhereInput
  }

  export type CpOrganizationUpdateToOneWithWhereWithoutPatientIndexesInput = {
    where?: CpOrganizationWhereInput
    data: XOR<CpOrganizationUpdateWithoutPatientIndexesInput, CpOrganizationUncheckedUpdateWithoutPatientIndexesInput>
  }

  export type CpOrganizationUpdateWithoutPatientIndexesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    billingEmail?: NullableStringFieldUpdateOperationsInput | string | null
    billingPlan?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    maxStaffSeats?: IntFieldUpdateOperationsInput | number
    maxPatientRecords?: IntFieldUpdateOperationsInput | number
    maxStorageMb?: BigIntFieldUpdateOperationsInput | bigint | number
    customDomain?: NullableStringFieldUpdateOperationsInput | string | null
    customDomainStatus?: StringFieldUpdateOperationsInput | string
    dnsVerificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    sslStatus?: StringFieldUpdateOperationsInput | string
    primaryColor?: StringFieldUpdateOperationsInput | string
    secondaryColor?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    deploymentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    dbConnectionUri?: NullableStringFieldUpdateOperationsInput | string | null
    dbSchemaVersion?: NullableStringFieldUpdateOperationsInput | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    contractStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    contractEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    allowCrossOrgReferrals?: BoolFieldUpdateOperationsInput | boolean
    referralCapacityStatus?: StringFieldUpdateOperationsInput | string
    referralGeographicScope?: StringFieldUpdateOperationsInput | string
    acceptedReferralTypes?: StringFieldUpdateOperationsInput | string
    featureFlags?: CpFeatureFlagUpdateManyWithoutOrganizationNestedInput
    usageMetrics?: CpUsageMetricUpdateManyWithoutOrganizationNestedInput
    tempAccessGrants?: CpTempAccessGrantUpdateManyWithoutOrganizationNestedInput
    tenantDbUpgrades?: CpTenantDbUpgradeUpdateManyWithoutOrganizationNestedInput
    incidents?: CpIncidentUpdateManyWithoutOrganizationNestedInput
    migrations?: CpMigrationUpdateManyWithoutOrganizationNestedInput
  }

  export type CpOrganizationUncheckedUpdateWithoutPatientIndexesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    billingEmail?: NullableStringFieldUpdateOperationsInput | string | null
    billingPlan?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    maxStaffSeats?: IntFieldUpdateOperationsInput | number
    maxPatientRecords?: IntFieldUpdateOperationsInput | number
    maxStorageMb?: BigIntFieldUpdateOperationsInput | bigint | number
    customDomain?: NullableStringFieldUpdateOperationsInput | string | null
    customDomainStatus?: StringFieldUpdateOperationsInput | string
    dnsVerificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    sslStatus?: StringFieldUpdateOperationsInput | string
    primaryColor?: StringFieldUpdateOperationsInput | string
    secondaryColor?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    deploymentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    dbConnectionUri?: NullableStringFieldUpdateOperationsInput | string | null
    dbSchemaVersion?: NullableStringFieldUpdateOperationsInput | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    contractStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    contractEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    allowCrossOrgReferrals?: BoolFieldUpdateOperationsInput | boolean
    referralCapacityStatus?: StringFieldUpdateOperationsInput | string
    referralGeographicScope?: StringFieldUpdateOperationsInput | string
    acceptedReferralTypes?: StringFieldUpdateOperationsInput | string
    featureFlags?: CpFeatureFlagUncheckedUpdateManyWithoutOrganizationNestedInput
    usageMetrics?: CpUsageMetricUncheckedUpdateManyWithoutOrganizationNestedInput
    tempAccessGrants?: CpTempAccessGrantUncheckedUpdateManyWithoutOrganizationNestedInput
    tenantDbUpgrades?: CpTenantDbUpgradeUncheckedUpdateManyWithoutOrganizationNestedInput
    incidents?: CpIncidentUncheckedUpdateManyWithoutOrganizationNestedInput
    migrations?: CpMigrationUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type CpFeatureFlagCreateManyOrganizationInput = {
    featureKey: string
    isEnabled?: boolean
    configuredAt?: Date | string
    configuredBy?: string | null
  }

  export type CpUsageMetricCreateManyOrganizationInput = {
    id?: string
    recordedAt?: Date | string
    activeStaffCount?: number
    patientRecordsCount?: number
    storageBytesUsed?: bigint | number
    smsSentThisMonth?: number
    apiRequestsCount?: number
  }

  export type CpTempAccessGrantCreateManyOrganizationInput = {
    id?: string
    requestedBy: string
    reason: string
    scope: string
    durationHours: number
    status?: string
    requestedAt?: Date | string
    approvedAt?: Date | string | null
    approvedBy?: string | null
    expiresAt?: Date | string | null
    revokedAt?: Date | string | null
    revokedBy?: string | null
  }

  export type CpTenantDbUpgradeCreateManyOrganizationInput = {
    id?: string
    schemaVersion: string
    status: string
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    errorLog?: string | null
  }

  export type CpIncidentCreateManyOrganizationInput = {
    id?: string
    title: string
    description?: string | null
    severity?: string | null
    status?: string
    createdBy?: string | null
    createdAt?: Date | string
    resolvedAt?: Date | string | null
  }

  export type CpMigrationCreateManyOrganizationInput = {
    id?: string
    sourceSystem: string
    status: string
    totalRecords?: number | null
    successCount?: number | null
    failedCount?: number | null
    runBy?: string | null
    runAt?: Date | string
    notes?: string | null
  }

  export type CpPatientIndexCreateManyOrganizationInput = {
    id?: string
    patientPin: string
    firstName: string
    lastName: string
    birthDate: Date | string
    sex: string
    orgSlug: string
    createdAt?: Date | string
  }

  export type CpFeatureFlagUpdateWithoutOrganizationInput = {
    featureKey?: StringFieldUpdateOperationsInput | string
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    configuredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    configuredBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CpFeatureFlagUncheckedUpdateWithoutOrganizationInput = {
    featureKey?: StringFieldUpdateOperationsInput | string
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    configuredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    configuredBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CpFeatureFlagUncheckedUpdateManyWithoutOrganizationInput = {
    featureKey?: StringFieldUpdateOperationsInput | string
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    configuredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    configuredBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CpUsageMetricUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    recordedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activeStaffCount?: IntFieldUpdateOperationsInput | number
    patientRecordsCount?: IntFieldUpdateOperationsInput | number
    storageBytesUsed?: BigIntFieldUpdateOperationsInput | bigint | number
    smsSentThisMonth?: IntFieldUpdateOperationsInput | number
    apiRequestsCount?: IntFieldUpdateOperationsInput | number
  }

  export type CpUsageMetricUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    recordedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activeStaffCount?: IntFieldUpdateOperationsInput | number
    patientRecordsCount?: IntFieldUpdateOperationsInput | number
    storageBytesUsed?: BigIntFieldUpdateOperationsInput | bigint | number
    smsSentThisMonth?: IntFieldUpdateOperationsInput | number
    apiRequestsCount?: IntFieldUpdateOperationsInput | number
  }

  export type CpUsageMetricUncheckedUpdateManyWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    recordedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activeStaffCount?: IntFieldUpdateOperationsInput | number
    patientRecordsCount?: IntFieldUpdateOperationsInput | number
    storageBytesUsed?: BigIntFieldUpdateOperationsInput | bigint | number
    smsSentThisMonth?: IntFieldUpdateOperationsInput | number
    apiRequestsCount?: IntFieldUpdateOperationsInput | number
  }

  export type CpTempAccessGrantUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestedBy?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    durationHours?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CpTempAccessGrantUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestedBy?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    durationHours?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CpTempAccessGrantUncheckedUpdateManyWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestedBy?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    durationHours?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CpTenantDbUpgradeUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    schemaVersion?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    errorLog?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CpTenantDbUpgradeUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    schemaVersion?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    errorLog?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CpTenantDbUpgradeUncheckedUpdateManyWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    schemaVersion?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    errorLog?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CpIncidentUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    severity?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CpIncidentUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    severity?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CpIncidentUncheckedUpdateManyWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    severity?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CpMigrationUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceSystem?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    totalRecords?: NullableIntFieldUpdateOperationsInput | number | null
    successCount?: NullableIntFieldUpdateOperationsInput | number | null
    failedCount?: NullableIntFieldUpdateOperationsInput | number | null
    runBy?: NullableStringFieldUpdateOperationsInput | string | null
    runAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CpMigrationUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceSystem?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    totalRecords?: NullableIntFieldUpdateOperationsInput | number | null
    successCount?: NullableIntFieldUpdateOperationsInput | number | null
    failedCount?: NullableIntFieldUpdateOperationsInput | number | null
    runBy?: NullableStringFieldUpdateOperationsInput | string | null
    runAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CpMigrationUncheckedUpdateManyWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceSystem?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    totalRecords?: NullableIntFieldUpdateOperationsInput | number | null
    successCount?: NullableIntFieldUpdateOperationsInput | number | null
    failedCount?: NullableIntFieldUpdateOperationsInput | number | null
    runBy?: NullableStringFieldUpdateOperationsInput | string | null
    runAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CpPatientIndexUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientPin?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    sex?: StringFieldUpdateOperationsInput | string
    orgSlug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CpPatientIndexUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientPin?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    sex?: StringFieldUpdateOperationsInput | string
    orgSlug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CpPatientIndexUncheckedUpdateManyWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientPin?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    sex?: StringFieldUpdateOperationsInput | string
    orgSlug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CpSessionCreateManyUserInput = {
    id?: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
  }

  export type CpAccountCreateManyUserInput = {
    id?: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    expiresAt?: Date | string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CpSessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CpSessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CpSessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CpAccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CpAccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CpAccountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use CpOrganizationCountOutputTypeDefaultArgs instead
     */
    export type CpOrganizationCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CpOrganizationCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CpUserCountOutputTypeDefaultArgs instead
     */
    export type CpUserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CpUserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CpOrganizationDefaultArgs instead
     */
    export type CpOrganizationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CpOrganizationDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CpFeatureFlagDefaultArgs instead
     */
    export type CpFeatureFlagArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CpFeatureFlagDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CpUsageMetricDefaultArgs instead
     */
    export type CpUsageMetricArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CpUsageMetricDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CpPluginDirectoryDefaultArgs instead
     */
    export type CpPluginDirectoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CpPluginDirectoryDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CpTempAccessGrantDefaultArgs instead
     */
    export type CpTempAccessGrantArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CpTempAccessGrantDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CpTenantDbUpgradeDefaultArgs instead
     */
    export type CpTenantDbUpgradeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CpTenantDbUpgradeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CpIncidentDefaultArgs instead
     */
    export type CpIncidentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CpIncidentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CpMigrationDefaultArgs instead
     */
    export type CpMigrationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CpMigrationDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CpUserDefaultArgs instead
     */
    export type CpUserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CpUserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CpSessionDefaultArgs instead
     */
    export type CpSessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CpSessionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CpAccountDefaultArgs instead
     */
    export type CpAccountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CpAccountDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CpVerificationDefaultArgs instead
     */
    export type CpVerificationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CpVerificationDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CpPatientIndexDefaultArgs instead
     */
    export type CpPatientIndexArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CpPatientIndexDefaultArgs<ExtArgs>

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