USE `delivery_db`;

SELECT 
u.id,
u.email,
u.name,
u.lastname,
u.image,
u.phone,
password,
session_token,
json_agg(
    json_build_object(
        'id', R.id,
        'name', R.name,
        'image', R.image,
        'route', R.route
    )
) AS roles
FROM
    users As u
INNER JOIN user_has_role As UHR
    ON UHR.user_id = u.id
INNER JOIN roles As R
    ON R.id = UHR.role_id
WHERE
    u.email = 'yego0210@gmail.com'
GROUP BY
    u.id
    -- u.email,
    -- u.name,
    -- u.lastname,
    -- u.image,
    -- u.phone,
    -- password,
    -- session_token