DELIMITER //

CREATE PROCEDURE sp_get_menu_without_account()
BEGIN
    SELECT 
        JSON_OBJECT(
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
                AND m.Name !='ABM' 
                AND m.Name != 'Asignar menu'
                ORDER BY m.Position
            )
        ) as complete_menu_json;
END //

DELIMITER ;