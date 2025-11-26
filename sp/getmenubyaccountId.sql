DELIMITER //

CREATE PROCEDURE sp_get_menu_by_accountId(In p_account_id VARCHAR(450))
BEGIN
    SELECT 
        JSON_OBJECT(
            'success', TRUE,
            'account_info', (
                SELECT JSON_OBJECT(
                    'Id', a.Id,
                    'UserId', a.UserId,
                    'RoleId', a.RoleId,
                    'UserName', a.UserName,
                    'State', a.State,
                    'Role',COALESCE(
                    (
						SELECT JSON_OBJECT(
							'Id', r.Id,
							'Name', r.Name,
							'Description', r.Description,
							'State', r.State
						)
						FROM tpdsw.roles r
                        where a.RoleId = r.Id
						)
                    )
                )
                FROM tpdsw.accounts a                
                WHERE a.Id = p_account_id
            ),
            'Menu', (
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'Id', m.Id,
                        'Name', m.Name,
                        'Position', m.Position,
                        'Url', m.Url,
                        'HasSubMenu', m.HasSubMenu,
                        'Description', m.Description,
                        'SubMenu', COALESCE(
                            (
                                SELECT JSON_ARRAYAGG(
                                    JSON_OBJECT(
                                        'Id', sm.Id,
                                        'MenuId', sm.MenuId,
                                        'Name', sm.Name,
                                        'Url', sm.Url,
                                        'Description', sm.Description
                                    )
                                )
                                FROM tpdsw.submenues sm
                                WHERE sm.MenuId = m.Id
                                AND sm.State = 1
                                ORDER BY sm.Name
                            ),
                            JSON_ARRAY()
                        )
                    )
                )
                FROM tpdsw.menues m
                WHERE m.State = 1
                ORDER BY m.Position
            )
        ) as complete_menu_json;
END //

DELIMITER ;