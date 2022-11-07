create table if not exists log (
                                   id int unsigned NOT NULL AUTO_INCREMENT,
                                   headers text,
                                   param text,
                                   query text,
                                   method varchar(50),
                                   body text,
                                   request_at timestamp,
                                   time_execute double default 0,
                                   path varchar(255),
                                   message text,
                                   status_code text,
                                   primary key (id)
);