
POST /api/auth/register

{ username, password }

POST /api/auth/login

{username, password}

GET /api/problems/all

{lowerBound?, upperBound?, sortedBy?, pageSize?, page?}

POST /api/problems/vote

{username, site: ['AC', 'CC', 'CF'], siteId, score}

GET /api/problems/voted

{username}

POST /api/users/updateProfile

{username, site, target}

POST /api/users/updateRating

{username}
