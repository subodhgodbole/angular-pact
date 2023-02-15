import { MatchersV3, PactV3 } from '@pact-foundation/pact';
import { AnyTemplate } from '@pact-foundation/pact/src/dsl/matchers';
import { PATH } from './user.service';
import { mockUser1, mockUser2 } from './user.service.mock.spec';

export const addInteractionGetUser = function(provider: PactV3) {
  const path = `${PATH}/${mockUser1.id}`;
  const extectedBody = MatchersV3.like(mockUser1 as unknown as AnyTemplate);

  provider.given('Fetch user')
    .uponReceiving('A request to GET a User')
    .withRequest({
      method: 'GET',
      path: path,
      headers: { Accept: "application/json" }
    })
    .willRespondWith({
      status: 200,
      body: extectedBody,
      headers: { "Content-Type": "application/json" }
    });
}

export const addInteractionGetAllUsers = function(provider: PactV3) {
  const path = `${PATH}`;
  const allUsers = [mockUser1, mockUser2];
  const extectedBody = MatchersV3.like(allUsers as unknown as AnyTemplate);

  provider.given('Fetch all user')
    .uponReceiving('A request to GET all User')
    .withRequest({
      method: 'GET',
      path: path,
      headers: { Accept: "application/json" }
    })
    .willRespondWith({
      status: 200,
      body: extectedBody,
      headers: { "Content-Type": "application/json" }
    });
}
