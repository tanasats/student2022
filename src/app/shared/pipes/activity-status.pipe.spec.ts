import { ActivityStatusPipe } from './activity-status.pipe';

describe('ActivityStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new ActivityStatusPipe();
    expect(pipe).toBeTruthy();
  });
});
