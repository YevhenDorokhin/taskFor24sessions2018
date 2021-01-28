import { TestBed } from '@angular/core/testing';

import { MediaDevicesService } from './media-devices.service';

describe('MediaDevicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MediaDevicesService = TestBed.get(MediaDevicesService);
    expect(service).toBeTruthy();
  });
});
