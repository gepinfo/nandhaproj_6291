import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CustomersService } from './customers.service';


describe('customersService', () => {
  let service: CustomersService;
  let httpMock: HttpTestingController;
  let sharedServiceMock = jasmine.createSpyObj('sharedServiceMock', ['methodName1', 'methodName2']);


  beforeEach(() => {
    TestBed.configureTestingModule({});
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [],
      providers: [ CustomersService, { provide: sharedServiceMock, useValue: sharedServiceMock } ]
    });
    sharedServiceMock = TestBed.inject(SharedService);
    httpMock = TestBed.inject(HttpTestingController);


  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpMock.verify();
  });


  
  // get all Values
  it('should retrieve all values getallCustomers from the server', () => {
    const mockResponse = { data: [{
      _id:'id2', 
    }]};
    const jwtToken = '123Hsdf_23234fdsjk';
    const expectedUrl = `${service.BaseURL}/Customers`;

    sessionStorage.setItem('JwtToken', jwtToken);

    service.GetAllCustomersValues().subscribe(response => {
      expect(response).toEqual(mockResponse);
    });
    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
  
  // test case gp create
  it('should send a POST request to the server', () => {
    const Customers = { 
    };

    
    // Make the API call
    service.PostAllCustomersValues(Customers).subscribe(response => {
      expect(response).toEqual(Customers)
    });

    // Expect a POST request to the specified endpoint with the provided data
    const req = httpMock.expectOne(`${service.BaseURL}/Customers`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(Customers);

    // Flush the mocked response
    req.flush(Customers);
  });
   
  // gp update the test case
  it('should send a PUT request to the server', () => {
    const Customers = { 
      id: '12dsadsa',
    };
    
    // Make the API call
    service.UpdateCustomers(Customers).subscribe(response => {
      expect(response).toEqual(Customers);
    });

    // Expect a PUT request to the specified endpoint with the provided data
    const req = httpMock.expectOne(`${service.BaseURL}/Customers`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(Customers);

    // Flush the mocked response
    req.flush(Customers);
  });
   
  // delete the Customers 
  it('should send a DELETE request to the correct URL with the specified data ID', () => {
    const dataId = 123;

    // Make the request
    service.DeleteCustomersValues(dataId).subscribe();

    // Verify that the DELETE request was made with the correct URL and headers
    const req = httpMock.expectOne(`${service.BaseURL}/Customers/${dataId}`);
    expect(req.request.method).toBe('DELETE');


    // Flush the mocked response
    req.flush(null);
  });
   






  it('should send a GET request to the correct URL with the specified Customers ID', () => {
    const CustomersId = 123;
    const mockResponse = { 
      id: CustomersId, 
    };

    // Make the request
    service.GetEntityById(CustomersId).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    // Verify that the GET request was made with the correct URL and headers
    const req = httpMock.expectOne(`${service.BaseURL}/Customersid/`+CustomersId);
    expect(req.request.method).toBe('GET');


    // Flush the mocked response
    req.flush(mockResponse);
  });


  // get specificationCustomers
  it('should send a GET request to the correct URL with the specified ID', () => {
    const id = 123;

    // Make the request
    service.getSpecificCustomers(id).subscribe();

    // Verify that the GET request was made with the correct URL and headers
    const req = httpMock.expectOne(`${service.BaseURL}/Customers/${id}`);
    expect(req.request.method).toBe('GET');


    // Flush the mocked response
    req.flush(null);
  });

  // get getSpecificCustomersHistory
  it('should send a GET request to the correct URL getSpecificCustomersHistory with the specified ID', () => {
    const dataId = 123;

    // Make the request
    service.getSpecificCustomersHistory(dataId).subscribe();

    // Verify that the GET request was made with the correct URL and headers
    const req = httpMock.expectOne(`${service.BaseURL}/Customers/${dataId}/history?days=30`);
    expect(req.request.method).toBe('GET');


    // Flush the mocked response
    req.flush(null);
  });

  //search application
  it('should send a GET request to the correct URL with the specified data', () => {
    const data = { key1: 'value1', key2: 'value2' };
    const jwtToken = '123Hsdf_23234fdsjk';
    const mockResponse = { Customers: [] };

    // Set the mocked jwt token
    sessionStorage.setItem('JwtToken', jwtToken);

    // Make the request
    service.SearchCustomers(data).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    // Verify that the GET request was made with the correct URL and headers
    const req = httpMock.expectOne(`${service.BaseURL}/Customers/get/search?jwt_token=${jwtToken}&key1=value1&key2=value2`);
    expect(req.request.method).toBe('GET');


    // Flush the mocked response
    req.flush(mockResponse);
  });

  
});
