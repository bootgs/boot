---
title: "Boot.gs vs Spring Boot vs NestJS: Enterprise Architecture Comparison for Google Apps Script"
description: "A comprehensive technical comparison between Boot.gs (bootgs), Spring Boot, and NestJS. Explore IoC/DI, routing, decorators, validation, and enterprise patterns in Google Apps Script."
keywords:
  - "Google Apps Script framework"
  - "Boot.gs"
  - "bootgs"
  - "NestJS Google Apps Script"
  - "Spring Boot Apps Script"
  - "TypeScript Google Apps Script"
  - "Google Workspace enterprise architecture"
  - "Dependency Injection Google Apps Script"
  - "Google Sheets REST API"
  - "IoC container Apps Script"
author: "Boot.gs Team & Junie AI (JetBrains)"
date: "2026-08-20"
category: "Architecture & Framework Comparison"
tags:
  - "Google Apps Script"
  - "TypeScript"
  - "NestJS"
  - "Spring Boot"
  - "Backend Architecture"
  - "Web Development"
---

# Boot.gs vs Spring Boot vs NestJS: Technical Architecture Comparison

> **Executive Summary (TL;DR):**  
> **Boot.gs (`bootgs`)** is a modern, lightweight TypeScript framework engineered specifically for the serverless **Google Apps Script (GAS)** runtime. It brings the familiar decorator-driven architecture, Inversion of Control / Dependency Injection (IoC/DI), HTTP/RPC routing, parameter validation, and global exception handling of **Spring Boot** (Java) and **NestJS** (Node.js) directly into Google Workspace (Sheets, Docs, Forms, Slides, and Web Apps). While Spring Boot and NestJS power standalone enterprise servers and microservices, Boot.gs enables structured, maintainable, enterprise-grade application design inside Google Cloud's serverless environment with zero server hosting costs.

---

## 1. Quick Overview & At-a-Glance Comparison

| Criterion                    | Boot.gs (`bootgs`)                                        | Spring Boot                                         | NestJS                                               |
| :--------------------------- | :-------------------------------------------------------- | :-------------------------------------------------- | :--------------------------------------------------- |
| **Primary Ecosystem**        | Google Workspace (Sheets, Docs, Forms, Web Apps)          | JVM Enterprise Backends & Cloud Microservices       | Node.js / Deno Server-Side & Microservices           |
| **Language**                 | TypeScript / JavaScript                                   | Java / Kotlin / Groovy                              | TypeScript / JavaScript                              |
| **Runtime Engine**           | Google Apps Script (V8 Serverless)                        | JVM (HotSpot, OpenJDK, GraalVM)                     | Node.js / V8 Event Loop                              |
| **Execution Model**          | Serverless / Event-driven / On-demand                     | Long-running process (HTTP daemon) / Serverless     | Long-running process (Event Loop) / Serverless       |
| **Architecture**             | Decorator-driven MVC, IoC/DI, Pipes, Advisers             | MVC, AOP, IoC/DI, Auto-Configuration, Starters      | Modular architecture, Controllers, Providers, IoC/DI |
| **Hosting & Infrastructure** | **$0 / Included** in Google Workspace (No servers)        | Cloud VMs, Docker, Kubernetes, Managed DBs          | Cloud VMs, Docker, Serverless Lambdas                |
| **Best Used For**            | Enterprise Google Workspace automation, internal Web Apps | High-throughput distributed systems, heavy backends | Scalable web APIs, WebSockets, microservices         |

---

## 2. Code Comparison: Parity Across Frameworks

Boot.gs adopts a syntax familiar to both **Spring Boot** and **NestJS** developers, making transition seamless.

### 2.1. Defining a REST Controller & Dependency Injection

#### Boot.gs (TypeScript for Google Apps Script)

```typescript
import {
  RestController,
  GetMapping,
  PostMapping,
  PathVariable,
  RequestBody,
  Autowired,
  Service,
  Min,
  NotBlank,
  ResponseEntity,
  HttpStatus
} from "boot.gs";

@Service()
export class UserService {
  getUser(id: number) {
    return { id, name: "Alice", role: "ADMIN" };
  }
}

@RestController("/api/v1/users")
export class UserController {
  @Autowired()
  private userService!: UserService;

  @GetMapping("/:id")
  public getUserById(@PathVariable("id") @Min(1) id: number): ResponseEntity {
    const user = this.userService.getUser(id);
    return ResponseEntity.ok().body(user);
  }

  @PostMapping("/")
  public createUser(@RequestBody() @NotBlank() body: { name: string }): ResponseEntity {
    return ResponseEntity.status(HttpStatus.CREATED).body(body);
  }
}
```

#### NestJS (TypeScript for Node.js)

```typescript
import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  ParseIntPipe,
  HttpStatus,
  HttpCode
} from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("api/v1/users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(":id")
  getUserById(@Param("id", ParseIntPipe) id: number) {
    return this.userService.getUser(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() body: { name: string }) {
    return body;
  }
}
```

#### Spring Boot (Java)

```java
@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") @Min(1) Long id) {
        User user = userService.getUser(id);
        return ResponseEntity.ok(user);
    }

    @PostMapping
    public ResponseEntity<User> createUser(@Valid @RequestBody UserDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.save(dto));
    }
}
```

---

## 3. Comprehensive Feature Comparison Matrix

The table below contrasts **Boot.gs (`bootgs`)**, **Spring Boot**, and **NestJS** across key architectural and operational dimensions.

| Feature                                          | bootgs                                                                                                                                                                                                          | spring boot                                                                                                                                    | nestjs                                                                                                                  |
| :----------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------- |
| **Runtime Environment (Runtime)**                | Google Apps Script (V8 Engine)                                                                                                                                                                                  | JVM (HotSpot, GraalVM, OpenJDK)                                                                                                                | Node.js, Deno, Bun (V8)                                                                                                 |
| **Primary Language**                             | TypeScript, JavaScript                                                                                                                                                                                          | Java, Kotlin, Groovy                                                                                                                           | TypeScript, JavaScript                                                                                                  |
| **Primary Use Case**                             | Google Workspace automation, add-ons, internal Web Apps, Sheet/Doc/Form scripts                                                                                                                                 | Enterprise backends, high-throughput microservices, distributed systems                                                                        | Scalable web servers, REST APIs, GraphQL, microservices                                                                 |
| **Process Lifecycle Model**                      | Serverless / On-demand (event-driven execution, 6–30 min execution quota per invocation)                                                                                                                        | Long-running process (persistent HTTP daemon) or Serverless                                                                                    | Long-running process (Node.js Event Loop) or Serverless                                                                 |
| **Transport Layer**                              | **Virtual Transport Layer** (emulates REST/HTTP on top of GAS `doGet`/`doPost` and `google.script.run`)                                                                                                         | Native HTTP server (Tomcat, Jetty, Undertow, Netty)                                                                                            | Native HTTP server (Express or Fastify)                                                                                 |
| **Architectural Pattern**                        | MVC / Controller-Service-Repository, decorators, IoC/DI                                                                                                                                                         | MVC / Controller-Service-Repository, AOP, IoC/DI, Auto-configuration                                                                           | Modular architecture (Modules), Controller-Provider, IoC/DI                                                             |
| **Application Modularity**                       | Registration via `App.create({ controllers, providers })`                                                                                                                                                       | `@Configuration`, `@ComponentScan`, Spring Starters, auto-configuration                                                                        | Modular system via `@Module({ imports, controllers, providers, exports })` decorator                                    |
| **Controller Decorators**                        | `@RestController`, `@Controller`, `@HttpController`, `@SheetController`, `@DocController`, `@FormController`, `@SlideController`                                                                                | `@RestController`, `@Controller`                                                                                                               | `@Controller()`                                                                                                         |
| **HTTP Routing (Method Decorators)**             | `@GetMapping` / `@Get`, `@PostMapping` / `@Post`, `@PutMapping` / `@Put`, `@DeleteMapping` / `@Delete`, `@PatchMapping` / `@Patch`, `@RequestMapping`, `@HeadMapping` / `@Head`, `@OptionsMapping` / `@Options` | `@GetMapping`, `@PostMapping`, `@PutMapping`, `@DeleteMapping`, `@PatchMapping`, `@RequestMapping`                                             | `@Get()`, `@Post()`, `@Put()`, `@Delete()`, `@Patch()`, `@Options()`, `@Head()`, `@All()`                               |
| **Path Matching**                                | `PathMatcher` with named parameter support (`/users/:id`, `/users/{id}`) and query strings                                                                                                                      | `PathPatternParser` / `AntPathMatcher` (`/users/{id}`, regex expressions)                                                                      | `path-to-regexp` (`/users/:id`, wildcards, regex)                                                                       |
| **Path Variables**                               | `@PathVariable` (Spring style) / `@Param` (NestJS style)                                                                                                                                                        | `@PathVariable`                                                                                                                                | `@Param()`                                                                                                              |
| **Query Parameters**                             | `@RequestParam` (Spring style) / `@Query` (NestJS style)                                                                                                                                                        | `@RequestParam`                                                                                                                                | `@Query()`                                                                                                              |
| **Request Body**                                 | `@RequestBody` (Spring style) / `@Body` (NestJS style)                                                                                                                                                          | `@RequestBody`                                                                                                                                 | `@Body()`                                                                                                               |
| **Request Headers**                              | `@Headers` (extracted from virtual request headers)                                                                                                                                                             | `@RequestHeader`                                                                                                                               | `@Headers()`                                                                                                            |
| **Low-level Request/Response Objects**           | `@Request`, `@Response`, `@Event` (Apps Script event object)                                                                                                                                                    | `HttpServletRequest`, `HttpServletResponse`, `ServerWebExchange`                                                                               | `@Req()`, `@Res()`, `@Next()`                                                                                           |
| **Response Entity Builder**                      | `ResponseEntity` (fluent builder: `ResponseEntity.ok().status(...).header(...).body(...)`)                                                                                                                      | `ResponseEntity` (fluent builder: `ResponseEntity.ok().headers(...).body(...)`)                                                                | Direct return value or via platform adapter (`res.status().json()`)                                                     |
| **Response Body Handling**                       | `@ResponseBody` (raw data return) / Default wrapper (`{ status, ok, headers, body }`)                                                                                                                           | `@ResponseBody` (enabled automatically with `@RestController`)                                                                                 | Direct body return by default (automatic JSON serialization)                                                            |
| **Supported Output Formats (MIME)**              | `JSON`, `TEXT`, `HTML`, `XML`, `RSS`, `ATOM`, `CSV`, `ICAL`, `VCARD`, `JAVASCRIPT` (via `ContentService`/`HtmlService`)                                                                                         | Any MIME type via `HttpMessageConverter` (JSON, XML, Protobuf, Binary, etc.)                                                                   | Any MIME type via Express/Fastify (JSON, XML, HTML, Streams, Buffer)                                                    |
| **Dependency Injection (IoC/DI)**                | Built-in lightweight DI container based on `reflect-metadata`                                                                                                                                                   | Spring IoC Container / `ApplicationContext` (industry benchmark)                                                                               | Built-in modular IoC container with hierarchical injectors                                                              |
| **DI Decorators**                                | `@Injectable`, `@Service`, `@Repository`, `@Entity`, `@Autowired`, `@Inject`, `@Value`                                                                                                                          | `@Component`, `@Service`, `@Repository`, `@Autowired`, `@Inject`, `@Value`                                                                     | `@Injectable()`, `@Inject()`                                                                                            |
| **Custom Providers**                             | `ClassProvider`, `ValueProvider`, `FactoryProvider`, `ExistingProvider`                                                                                                                                         | `@Bean` methods in `@Configuration`, `FactoryBean`, `ObjectProvider`                                                                           | `useClass`, `useValue`, `useFactory`, `useExisting`                                                                     |
| **Bean / Provider Scopes**                       | Request / Execution Scope (lifetime of single GAS invocation)                                                                                                                                                   | Singleton, Prototype, Request, Session, Application, Custom Scopes                                                                             | DEFAULT (Singleton), REQUEST, TRANSIENT                                                                                 |
| **Configuration Injection**                      | `@Value` (from supplied `ApplicationConfig`)                                                                                                                                                                    | `@Value("${prop}")`, `@ConfigurationProperties`                                                                                                | `@nestjs/config`, `ConfigService`                                                                                       |
| **Parameter Validation (Decorators)**            | `@Min`, `@Max`, `@Email`, `@NotBlank`, `@NotEmpty`, `@Size`, `@Pattern`, `@Positive`, `@PositiveOrZero`, `@Negative`, `@NegativeOrZero`, `@AssertTrue`, `@AssertFalse`                                          | Jakarta Bean Validation (Hibernate Validator): `@Min`, `@Max`, `@Email`, `@NotBlank`, `@NotEmpty`, `@Size`, `@Pattern`, `@Valid`, `@Validated` | Validation via `class-validator` and DTOs (`@IsString`, `@IsInt`, `@Min`, `@Max`, `@IsEmail`, etc.)                     |
| **Transformation and Pipes**                     | `@UsePipes`, `ParseNumberPipe`, `ParseBooleanPipe`, `ParseFloatPipe`, `ParseIntPipe`, `ParseStringPipe`, `ParseBigIntPipe`, `PipeTransform`                                                                     | `Converter<S,T>`, `Formatter<T>`, `HandlerMethodArgumentResolver`                                                                              | `@UsePipes()`, `ValidationPipe`, `ParseIntPipe`, `ParseBoolPipe`, `ParseArrayPipe`, `ParseUUIDPipe`, `DefaultValuePipe` |
| **Global Exception Handling**                    | `@ControllerAdvice`, `@ExceptionHandler(ExceptionClass)`                                                                                                                                                        | `@ControllerAdvice` / `@RestControllerAdvice`, `@ExceptionHandler`                                                                             | Exception Filters (`@UseFilters()`, `@Catch()`, `ExceptionFilter`)                                                      |
| **Built-in Exception Hierarchy**                 | `AppException`, `HttpException`                                                                                                                                                                                 | `ResponseStatusException`, Spring MVC Exception hierarchy                                                                                      | `HttpException`, `BadRequestException`, `NotFoundException`, `UnauthorizedException`, etc.                              |
| **Custom HTTP Status for Exceptions**            | `@ResponseStatus(HttpStatus.NOT_FOUND)`                                                                                                                                                                         | `@ResponseStatus(HttpStatus.NOT_FOUND)`                                                                                                        | `@HttpCode()`, status in `HttpException` constructor                                                                    |
| **Platform-Specific Events**                     | `@OnOpen`, `@OnEdit`, `@OnChange`, `@OnFormSubmit`, `@OnInstall` (native Google Apps Script triggers)                                                                                                           | Spring `ApplicationEvent`, `@EventListener`                                                                                                    | `@OnEvent()` (`@nestjs/event-emitter`), Node.js EventEmitter events                                                     |
| **Document UI Integration (Sidebar/Modal/Menu)** | Native menu support (`app.onMenu.<action>`) and fast client-server bridge via `google.script.run`                                                                                                               | Not applicable (requires separate frontend / template engine)                                                                                  | Not applicable (requires separate frontend / template engine)                                                           |
| **Google Workspace Services Integration**        | Direct, credential-free access to `SpreadsheetApp`, `DriveApp`, `GmailApp`, `PropertiesService`                                                                                                                 | Via Google Cloud Client Library for Java (requires Service Account / OAuth2)                                                                   | Via `googleapis` npm package (requires Service Account / OAuth2)                                                        |
| **Middleware**                                   | Planned in Roadmap (v1.11 — HTTP request and system event interception)                                                                                                                                         | `Filter` (Servlet), `HandlerInterceptor` (Spring MVC), Spring AOP (`@Aspect`)                                                                  | `NestMiddleware` (`configure(consumer)`), `NestInterceptor`                                                             |
| **Route Guards & Security**                      | Delegated to Google Workspace permissions; custom logic in services/pipes                                                                                                                                       | Spring Security: `SecurityFilterChain`, `@PreAuthorize`, `@Secured`, RBAC/ABAC                                                                 | `CanActivate` Guards (`@UseGuards(AuthGuard)`), RBAC, CASL                                                              |
| **Authentication & Security**                    | Built-in Google identity & security model (OAuth2, Workspace Scopes, `Session.getActiveUser()`)                                                                                                                 | Spring Security: JWT, OAuth2/OIDC, SAML, LDAP, Form Login, mTLS, CSRF/CORS                                                                     | `@nestjs/passport`, Passport.js (JWT, OAuth2, Local), Fastify Auth                                                      |
| **Data Access Layer (ORM / Data Access)**        | Google Sheets (as tabular database), `PropertiesService` (Key-Value), `Jdbc`, custom `@Repository`                                                                                                              | Spring Data JPA (Hibernate), Spring Data JDBC, Spring Data R2DBC, Spring Data MongoDB, Redis, Cassandra                                        | TypeORM, Prisma, Mongoose, Sequelize, MikroORM, Drizzle, Kysely                                                         |
| **Transaction Management**                       | `LockService` (Apps Script pessimistic distributed locks)                                                                                                                                                       | Declarative `@Transactional` (ACID, isolation levels, JTA)                                                                                     | Transactions via ORM integration (Prisma `$transaction`, TypeORM `QueryRunner`)                                         |
| **Asynchrony & Concurrency**                     | `App` (synchronous) and `AsyncApp` (asynchronous based on `Promise`/`async-await` for `UrlFetchApp`)                                                                                                            | Java Multithreading, `@Async`, Reactive Streams (Spring WebFlux, Reactor `Mono`/`Flux`)                                                        | Single-threaded Node.js Event Loop, `async`/`await`, Worker Threads, RxJS (`Observable`)                                |
| **Background Tasks & Scheduling**                | Google Apps Script Triggers (`ScriptApp.newTrigger()`, time-driven triggers)                                                                                                                                    | `@Scheduled`, Spring Batch, Quartz Scheduler                                                                                                   | `@nestjs/schedule` (Cron, Interval, Timeout), Bull / BullMQ queues (Redis)                                              |
| **Microservices & Distributed Protocols**        | Not supported (Google Apps Script serverless environment constraints)                                                                                                                                           | Spring Cloud (Eureka, Gateway, Config, OpenFeign), Spring AMQP (RabbitMQ), Kafka, gRPC, RSocket                                                | `@nestjs/microservices` (TCP, Redis, MQTT, NATS, RabbitMQ, Kafka, gRPC)                                                 |
| **WebSockets / Real-time**                       | Not supported (no persistent socket connections in GAS)                                                                                                                                                         | Spring WebSocket (STOMP), Spring WebFlux WebSockets                                                                                            | `@nestjs/websockets` (Socket.io, ws)                                                                                    |
| **Testing Tools**                                | Vitest, Jest, business logic and DI unit testing isolated from global GAS runtime                                                                                                                               | `spring-boot-starter-test`, JUnit 5, Mockito, `@SpringBootTest`, `@WebMvcTest`, Testcontainers                                                 | `@nestjs/testing`, `Test.createTestingModule()`, Jest, Vitest, Supertest (e2e)                                          |
| **OpenAPI / Swagger Generation**                 | JSDoc / TypeDoc (automated REST documentation planned)                                                                                                                                                          | Springdoc OpenAPI, Swagger UI (automatic generation from controllers and models)                                                               | `@nestjs/swagger` (`@ApiProperty()`, `@ApiOperation()` decorators, Swagger UI)                                          |
| **Logging & Monitoring**                         | `console.log`, `Logger.log`, Google Cloud Logging (Stackdriver)                                                                                                                                                 | Spring Boot Actuator, Micrometer, Prometheus, Grafana, OpenTelemetry, Logback/SLF4J                                                            | `@nestjs/terminus` (Healthchecks), OpenTelemetry, Prometheus, Winston, Pino                                             |
| **Build, Deploy & DevOps**                       | `@google/clasp`, `tsc`, instant deployment to Google Cloud/GAS project                                                                                                                                          | Maven / Gradle, JAR/WAR packaging, Docker, Kubernetes, GraalVM Native Image                                                                    | Nest CLI, Webpack, `tsc`, Docker, Kubernetes, PM2, Serverless                                                           |
| **Infrastructure Costs**                         | Zero infrastructure overhead (included in free/enterprise Google Workspace account)                                                                                                                             | Costs for virtual servers, containers, JVM memory allocation, managed databases                                                                | Costs for Node.js hosting, containers, or serverless infrastructure                                                     |

---

## 4. Deep Dive: Architectural Innovations in Boot.gs

### 4.1. Dual Decorator Dialects: Spring Boot & NestJS

Developers coming from either Java or Node.js enterprise backgrounds can use their native idioms:

- **Spring Style**: `@GetMapping`, `@PostMapping`, `@PathVariable`, `@RequestParam`, `@RequestBody`, `@Autowired`, `@Service`, `@Repository`, `@ControllerAdvice`, `@ExceptionHandler`, `ResponseEntity`.
- **NestJS Style**: `@Get`, `@Post`, `@Param`, `@Query`, `@Body`, `@Headers`, `@UsePipes`, `ParseIntPipe`, `ParseBooleanPipe`, `ClassProvider`, `FactoryProvider`.

### 4.2. Virtual Transport Layer for Google Apps Script

Google Apps Script traditionally limits HTTP Web Apps to two methods: `doGet(e)` and `doPost(e)`.
Boot.gs overcomes this limitation through its **Virtual Transport Layer**:

1. It intercepts requests arriving through `doGet` or `doPost`.
2. It parses virtual routing paths (e.g., `/api/v1/orders/123`), HTTP method overrides (`X-HTTP-Method-Override: PUT` or `_method=PUT`), request headers, and query strings.
3. It seamlessly dispatches the execution to matching controller action methods with full parameter injection and validation.

### 4.3. Native Google Workspace Integration

Unlike external backends that require OAuth2 tokens and service accounts to manipulate Google Docs or Sheets, Boot.gs runs inside the security context of the Google Workspace document:

- Direct access to `SpreadsheetApp`, `DriveApp`, `GmailApp`, and `PropertiesService` without network roundtrips.
- Document-specific controller decorators: `@SheetController`, `@DocController`, `@FormController`, `@SlideController`.
- Trigger decorators: `@OnOpen`, `@OnEdit`, `@OnChange`, `@OnFormSubmit`, `@OnInstall`.
- Menu bindings via `app.onMenu.<actionName>(event)` for custom document UI bars and modals.

---

## 5. Decision Framework: When to Choose Which Tool

```
                                  Is your logic bound to
                                  Google Workspace data?
                                        /        \
                                     YES          NO
                                     /              \
                          Need $0 hosting &        Need high concurrency,
                          Apps Script triggers?     WebSockets or DBs?
                                /        \                 /       \
                             YES          NO           JAVA/JVM   NODE/TS
                             /              \            /           \
                         Boot.gs         External     Spring Boot    NestJS
                         (bootgs)        API Backend
```

### Choose Boot.gs if:

- You are developing Google Workspace add-ons, Google Sheets automation, or document workflow engines.
- You want enterprise TypeScript architecture (IoC, validation, routing) without the hassle of managing servers or paying hosting bills.
- You need structured client-server communication via `google.script.run` or Apps Script Web Apps.

### Choose Spring Boot if:

- You are building high-throughput, mission-critical distributed systems and enterprise financial backends.
- You require deep integration with Java/JVM libraries, Spring Data JPA, Kafka, and Spring Cloud microservices.

### Choose NestJS if:

- You are building scalable standalone Node.js REST / GraphQL APIs, WebSockets, or microservices outside Google Workspace.
- You need rich ecosystem support for Prisma, TypeORM, Redis queues (BullMQ), and Fastify.

---

## 6. Frequently Asked Questions (FAQ)

### Can I run Spring Boot or NestJS directly in Google Apps Script?

No. Google Apps Script runs on a sandboxed, serverless Google Cloud V8 engine without access to Node.js native bindings (libuv, `fs`, `http`) or the Java Virtual Machine (JVM). **Boot.gs** was created specifically to bring the exact architectural ergonomics of Spring Boot and NestJS into the Apps Script V8 runtime.

### Why use Boot.gs instead of plain Google Apps Script?

Standard Apps Script projects often suffer from global variable pollution, lack of dependency management, repetitive parameter parsing, and unmaintainable monolithic files. Boot.gs introduces structured controller-service architecture, Dependency Injection, automatic type conversion, parameter validation, and centralized exception handling.

### How does Boot.gs handle REST methods like PUT, DELETE, and PATCH?

Google Apps Script native Web Apps only trigger `doGet` and `doPost`. Boot.gs utilizes an emulated Virtual Transport Layer that inspects custom headers (such as `X-HTTP-Method-Override`) or query parameters (such as `_method=DELETE`), routing the request to the appropriate `@PutMapping` or `@DeleteMapping` handler automatically.

### How does Dependency Injection (DI) work in Boot.gs?

Boot.gs includes a lightweight, reflection-based IoC container using `reflect-metadata`. It manages the lifecycle of classes decorated with `@Service`, `@Repository`, or `@Injectable` during the execution of a Google Apps Script invocation, supporting custom class, factory, and value providers.

---

## 7. Conclusion

**Boot.gs (`bootgs`)** bridges the gap between Google Workspace scripting and modern enterprise software engineering. By offering syntactic and architectural alignment with **Spring Boot** and **NestJS**, it allows teams to build maintainable, type-safe, and robust serverless applications inside Google Workspace with zero infrastructure overhead.

---

> 🤖 _Note: This technical comparison article was generated by **Junie** (an autonomous AI coding agent developed by **JetBrains**), powered by Google's **`gemini-3.7-flash`** LLM model._
