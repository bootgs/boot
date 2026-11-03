# Decorators

[← Back to README](../../README.md) · [Documentation index](README.md)

## Class decorators

<details open><summary>Class decorators</summary>

<table width="100%">
  <thead>
    <tr>
      <th align="left">Decorator</th>
      <th align="left">Returns</th>
      <th align="left">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>@Controller(type?: string, options?: object)</code></td>
      <td><code>ClassDecorator</code></td>
      <td>Marks a class as a general-purpose controller.</td>
    </tr>
    <tr>
      <td><code>@RequestMapping(path?: string, method?: RequestMethod | RequestMethod[])</code></td>
      <td><code>ClassDecorator & MethodDecorator</code></td>
      <td>Maps a specific request path onto a controller or a handler method.</td>
    </tr>
    <tr>
      <td><code>@HttpController(basePath?: string)</code></td>
      <td><code>ClassDecorator</code></td>
      <td>Marks a class as an HTTP request controller. Default base path is <code>/</code>.</td>
    </tr>
    <tr>
      <td><code>@RestController(basePath?: string)</code></td>
      <td><code>ClassDecorator</code></td>
      <td>Marks a class as a REST controller. Automatically applies <code>@ResponseBody</code> to all handler methods.</td>
    </tr>
    <tr>
      <td><code>@ResponseBody()</code></td>
      <td><code>ClassDecorator & MethodDecorator</code></td>
      <td>Indicates that the return value should be bound to the response body.</td>
    </tr>
    <tr>
      <td><code>@ControllerAdvice()</code></td>
      <td><code>ClassDecorator</code></td>
      <td>Marks a class as a global exception handler and data binder.</td>
    </tr>
    <tr>
      <td><code>@SheetController(sheetName?: string | string[] | RegExp)</code></td>
      <td><code>ClassDecorator</code></td>
      <td>Marks a class as a Google Sheets event controller. Can be filtered by sheet name (string, array, or RegExp).</td>
    </tr>
    <tr>
      <td><code>@DocController()</code></td>
      <td><code>ClassDecorator</code></td>
      <td>Marks a class as a Google Docs event controller.</td>
    </tr>
    <tr>
      <td><code>@SlideController()</code></td>
      <td><code>ClassDecorator</code></td>
      <td>Marks a class as a Google Slides event controller.</td>
    </tr>
    <tr>
      <td><code>@FormController()</code></td>
      <td><code>ClassDecorator</code></td>
      <td>Marks a class as a Google Forms event controller.</td>
    </tr>
    <tr>
      <td><code>@Service()</code></td>
      <td><code>ClassDecorator</code></td>
      <td>Marks a class as a service, typically holding business logic.</td>
    </tr>
    <tr>
      <td><code>@Repository()</code></td>
      <td><code>ClassDecorator</code></td>
      <td>Marks a class as a repository, abstracting data access logic.</td>
    </tr>
    <tr>
      <td><code>@Injectable()</code></td>
      <td><code>ClassDecorator</code></td>
      <td>Marks a class as available for dependency injection.</td>
    </tr>
    <tr>
      <td colspan="3" align="center"><b>Aliases</b></td>
    </tr>
    <tr>
      <td><code>@DocsController()</code></td>
      <td><code>ClassDecorator</code></td>
      <td>Alias for <code>@DocController()</code>.</td>
    </tr>
    <tr>
      <td><code>@SlidesController()</code></td>
      <td><code>ClassDecorator</code></td>
      <td>Alias for <code>@SlideController()</code>.</td>
    </tr>
    <tr>
      <td><code>@FormsController()</code></td>
      <td><code>ClassDecorator</code></td>
      <td>Alias for <code>@FormController()</code>.</td>
    </tr>
  </tbody>
</table>

</details>

## Method decorators

<details open><summary>Method decorators</summary>

<table width="100%">
  <thead>
    <tr>
      <th align="left">Decorator</th>
      <th align="left">Returns</th>
      <th align="left">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>@OnInstall(options?: object)</code></td>
      <td><code>MethodDecorator</code></td>
      <td>Handles the <a href="https://developers.google.com/apps-script/guides/triggers#oninstalle"><code>onInstall</code></a> event.</td>
    </tr>
    <tr>
      <td><code>@OnOpen(options?: object)</code></td>
      <td><code>MethodDecorator</code></td>
      <td>Handles the <a href="https://developers.google.com/apps-script/guides/triggers#onopene"><code>onOpen</code></a> event.</td>
    </tr>
    <tr>
      <td><code>@OnEdit(options?: { range?: string | RegExp | (string | RegExp)[] })</code></td>
      <td><code>MethodDecorator</code></td>
      <td>Handles the <a href="https://developers.google.com/apps-script/guides/triggers#onedite"><code>onEdit</code></a> event. When <code>range</code> is set, the handler runs only if the edited range's A1 notation equals the given string or matches the <code>RegExp</code>.</td>
    </tr>
    <tr>
      <td><code>@OnChange(options?: { changeType?: string | string[] })</code></td>
      <td><code>MethodDecorator</code></td>
      <td>Handles the <code>onChange</code> event. When <code>changeType</code> is set, the handler runs only for the listed change types (e.g. <code>"INSERT_ROW"</code>, <code>"EDIT"</code>).</td>
    </tr>
    <tr>
      <td><code>@OnFormSubmit(options?: { formId?: string | string[] })</code></td>
      <td><code>MethodDecorator</code></td>
      <td>Handles the <code>onFormSubmit</code> event. When <code>formId</code> is set, the handler runs only for submissions from the listed form IDs.</td>
    </tr>
    <tr>
      <td colspan="3" align="center"><b>HTTP Methods</b></td>
    </tr>
    <tr>
      <td><code>@RequestMapping(path?: string, method?: RequestMethod | RequestMethod[])</code></td>
      <td><code>ClassDecorator & MethodDecorator</code></td>
      <td>Maps a specific request path onto a controller or a handler method.</td>
    </tr>
    <tr>
      <td><code>@Get(options?: string | HttpDecoratorOptions)</code></td>
      <td><code>MethodDecorator</code></td>
      <td>Maps a method to handle HTTP GET requests. Default path is <code>/</code>.</td>
    </tr>
    <tr>
      <td><code>@Post(options?: string | HttpDecoratorOptions)</code></td>
      <td><code>MethodDecorator</code></td>
      <td>Maps a method to handle HTTP POST requests.</td>
    </tr>
    <tr>
      <td><code>@Put(options?: string | HttpDecoratorOptions)</code></td>
      <td><code>MethodDecorator</code></td>
      <td>Maps a method to handle HTTP PUT requests.</td>
    </tr>
    <tr>
      <td><code>@Patch(options?: string | HttpDecoratorOptions)</code></td>
      <td><code>MethodDecorator</code></td>
      <td>Maps a method to handle HTTP PATCH requests.</td>
    </tr>
    <tr>
      <td><code>@Delete(options?: string | HttpDecoratorOptions)</code></td>
      <td><code>MethodDecorator</code></td>
      <td>Maps a method to handle HTTP DELETE requests.</td>
    </tr>
    <tr>
      <td><code>@Head(options?: string | HttpDecoratorOptions)</code></td>
      <td><code>MethodDecorator</code></td>
      <td>Maps a method to handle HTTP HEAD requests.</td>
    </tr>
    <tr>
      <td><code>@Options(options?: string | HttpDecoratorOptions)</code></td>
      <td><code>MethodDecorator</code></td>
      <td>Maps a method to handle HTTP OPTIONS requests.</td>
    </tr>
    <tr>
      <td colspan="3" align="center"><b>Error Handling & Security</b></td>
    </tr>
    <tr>
      <td><code>@ExceptionHandler(value?: Newable | Newable[])</code></td>
      <td><code>MethodDecorator</code></td>
      <td>Annotation for handling exceptions in specific handler classes and/or handler methods.</td>
    </tr>
    <tr>
      <td><code>@ResponseStatus(value: number)</code></td>
      <td><code>MethodDecorator & ClassDecorator</code></td>
      <td>Marks a method or exception class with the status code that should be returned.</td>
    </tr>
    <tr>
      <td><code>@UsePipes(...pipes: any[])</code></td>
      <td><code>MethodDecorator & ClassDecorator</code></td>
      <td>Specifies the pipes to be used for a controller or method.</td>
    </tr>
    <tr>
      <td colspan="3" align="center"><b>Aliases</b></td>
    </tr>
    <tr>
      <td><code>@GetMapping(options?: string | HttpDecoratorOptions)</code></td>
      <td><code>MethodDecorator</code></td>
      <td>Alias for <code>@Get()</code>.</td>
    </tr>
    <tr>
      <td><code>@PostMapping(options?: string | HttpDecoratorOptions)</code></td>
      <td><code>MethodDecorator</code></td>
      <td>Alias for <code>@Post()</code>.</td>
    </tr>
    <tr>
      <td><code>@PutMapping(options?: string | HttpDecoratorOptions)</code></td>
      <td><code>MethodDecorator</code></td>
      <td>Alias for <code>@Put()</code>.</td>
    </tr>
    <tr>
      <td><code>@PatchMapping(options?: string | HttpDecoratorOptions)</code></td>
      <td><code>MethodDecorator</code></td>
      <td>Alias for <code>@Patch()</code>.</td>
    </tr>
    <tr>
      <td><code>@DeleteMapping(options?: string | HttpDecoratorOptions)</code></td>
      <td><code>MethodDecorator</code></td>
      <td>Alias for <code>@Delete()</code>.</td>
    </tr>
    <tr>
      <td><code>@HeadMapping(options?: string | HttpDecoratorOptions)</code></td>
      <td><code>MethodDecorator</code></td>
      <td>Alias for <code>@Head()</code>.</td>
    </tr>
    <tr>
      <td><code>@OptionsMapping(options?: string | HttpDecoratorOptions)</code></td>
      <td><code>MethodDecorator</code></td>
      <td>Alias for <code>@Options()</code>.</td>
    </tr>
  </tbody>
</table>

</details>

## Parameter decorators

<details open><summary>Parameter decorators</summary>

<table width="100%">
  <thead>
    <tr>
      <th align="left">Decorator</th>
      <th align="left">Returns</th>
      <th align="left">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>@Event()</code></td>
      <td><code>ParameterDecorator</code></td>
      <td>Injects the full Google Apps Script event object.</td>
    </tr>
    <tr>
      <td><code>@Request(key?: string)</code></td>
      <td><code>ParameterDecorator</code></td>
      <td>Injects the full request object or a specific property.</td>
    </tr>
    <tr>
      <td><code>@Headers(key?: string)</code></td>
      <td><code>ParameterDecorator</code></td>
      <td>Injects request headers or a specific header value.</td>
    </tr>
    <tr>
      <td><code>@Body(key?: string, ...pipes: any[])</code></td>
      <td><code>ParameterDecorator</code></td>
      <td>Injects the full request body or a specific key. Supports transformation pipes.</td>
    </tr>
    <tr>
      <td><code>@Param(key?: string, ...pipes: any[])</code></td>
      <td><code>ParameterDecorator</code></td>
      <td>Injects values from URL path parameters. Supports transformation pipes.</td>
    </tr>
    <tr>
      <td><code>@Query(key?: string, ...pipes: any[])</code></td>
      <td><code>ParameterDecorator</code></td>
      <td>Injects values from URL query parameters. Supports transformation pipes.</td>
    </tr>
    <tr>
      <td><code>@Inject(token: any)</code></td>
      <td><code>ParameterDecorator</code></td>
      <td>Explicitly specifies an injection token for a dependency.</td>
    </tr>
    <tr>
      <td><code>@Value(key: string)</code></td>
      <td><code>ParameterDecorator & PropertyDecorator</code></td>
      <td>Injects a value from the application configuration.</td>
    </tr>
    <tr>
      <td colspan="3" align="center"><b>Aliases</b></td>
    </tr>
    <tr>
      <td><code>@Autowired(token?: any)</code></td>
      <td><code>ParameterDecorator & PropertyDecorator</code></td>
      <td>Alias for <code>@Inject()</code>.</td>
    </tr>
    <tr>
      <td><code>@RequestBody(key?: string, ...pipes: any[])</code></td>
      <td><code>ParameterDecorator</code></td>
      <td>Alias for <code>@Body()</code>.</td>
    </tr>
    <tr>
      <td><code>@PathVariable(key?: string, ...pipes: any[])</code></td>
      <td><code>ParameterDecorator</code></td>
      <td>Alias for <code>@Param()</code>.</td>
    </tr>
    <tr>
      <td><code>@RequestParam(key?: string, ...pipes: any[])</code></td>
      <td><code>ParameterDecorator</code></td>
      <td>Alias for <code>@Query()</code>.</td>
    </tr>
    <tr>
      <td colspan="3" align="center"><b>Validation Decorators (Spring Boot style)</b></td>
    </tr>
    <tr>
      <td><code>@AssertFalse()</code></td>
      <td><code>ParameterDecorator</code></td>
      <td>Validates that the value is <code>false</code>.</td>
    </tr>
    <tr>
      <td><code>@AssertTrue()</code></td>
      <td><code>ParameterDecorator</code></td>
      <td>Validates that the value is <code>true</code>.</td>
    </tr>
    <tr>
      <td><code>@Email()</code></td>
      <td><code>ParameterDecorator</code></td>
      <td>Validates that the value is a valid email address.</td>
    </tr>
    <tr>
      <td><code>@Max(value: number)</code></td>
      <td><code>ParameterDecorator</code></td>
      <td>Validates that the value is less than or equal to the specified maximum.</td>
    </tr>
    <tr>
      <td><code>@Min(value: number)</code></td>
      <td><code>ParameterDecorator</code></td>
      <td>Validates that the value is greater than or equal to the specified minimum.</td>
    </tr>
    <tr>
      <td><code>@Negative()</code></td>
      <td><code>ParameterDecorator</code></td>
      <td>Validates that the value is strictly negative.</td>
    </tr>
    <tr>
      <td><code>@NegativeOrZero()</code></td>
      <td><code>ParameterDecorator</code></td>
      <td>Validates that the value is negative or zero.</td>
    </tr>
    <tr>
      <td><code>@NotBlank()</code></td>
      <td><code>ParameterDecorator</code></td>
      <td>Validates that the value is not null and contains at least one non-whitespace character.</td>
    </tr>
    <tr>
      <td><code>@NotEmpty()</code></td>
      <td><code>ParameterDecorator</code></td>
      <td>Validates that the value is not null and not empty (works for strings, arrays, and objects).</td>
    </tr>
    <tr>
      <td><code>@Pattern(regexp: string | RegExp)</code></td>
      <td><code>ParameterDecorator</code></td>
      <td>Validates that the value matches the specified regular expression.</td>
    </tr>
    <tr>
      <td><code>@Positive()</code></td>
      <td><code>ParameterDecorator</code></td>
      <td>Validates that the value is strictly positive.</td>
    </tr>
    <tr>
      <td><code>@PositiveOrZero()</code></td>
      <td><code>ParameterDecorator</code></td>
      <td>Validates that the value is positive or zero.</td>
    </tr>
    <tr>
      <td><code>@Size(options: { min?: number, max?: number })</code></td>
      <td><code>ParameterDecorator</code></td>
      <td>Validates that the size of the value is between the specified minimum and maximum.</td>
    </tr>
  </tbody>
</table>

</details>

## Built-in Pipes

Pipes can be used to transform data before it reaches your handler:

<table width="100%">
  <thead>
    <tr>
      <th align="left">Pipe</th>
      <th align="left">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>ParseNumberPipe</code></td>
      <td>Transforms a string to a number.</td>
    </tr>
    <tr>
      <td><code>ParseFloatPipe</code></td>
      <td>Transforms a string to a float.</td>
    </tr>
    <tr>
      <td><code>ParseBooleanPipe</code></td>
      <td>Transforms a string to a boolean.</td>
    </tr>
    <tr>
      <td><code>AssertFalsePipe</code></td>
      <td>Validates that the value is <code>false</code>.</td>
    </tr>
    <tr>
      <td><code>AssertTruePipe</code></td>
      <td>Validates that the value is <code>true</code>.</td>
    </tr>
    <tr>
      <td><code>EmailPipe</code></td>
      <td>Validates that the value is a valid email address.</td>
    </tr>
    <tr>
      <td><code>MaxPipe</code></td>
      <td>Validates that the value is less than or equal to the specified maximum.</td>
    </tr>
    <tr>
      <td><code>MinPipe</code></td>
      <td>Validates that the value is greater than or equal to the specified minimum.</td>
    </tr>
    <tr>
      <td><code>NegativePipe</code></td>
      <td>Validates that the value is strictly negative.</td>
    </tr>
    <tr>
      <td><code>NegativeOrZeroPipe</code></td>
      <td>Validates that the value is negative or zero.</td>
    </tr>
    <tr>
      <td><code>NotBlankPipe</code></td>
      <td>Validates that the value is not blank.</td>
    </tr>
    <tr>
      <td><code>NotEmptyPipe</code></td>
      <td>Validates that the value is not empty.</td>
    </tr>
    <tr>
      <td><code>PatternPipe</code></td>
      <td>Validates that the value matches the specified regular expression.</td>
    </tr>
    <tr>
      <td><code>PositivePipe</code></td>
      <td>Validates that the value is strictly positive.</td>
    </tr>
    <tr>
      <td><code>PositiveOrZeroPipe</code></td>
      <td>Validates that the value is positive or zero.</td>
    </tr>
    <tr>
      <td><code>SizePipe</code></td>
      <td>Validates that the size of the value is within range.</td>
    </tr>
  </tbody>
</table>
