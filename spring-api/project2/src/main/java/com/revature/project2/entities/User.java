package com.revature.project2.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(
        name = "user",
        uniqueConstraints = @UniqueConstraint(
                name = "email_unique",
                columnNames = "email_address"
        )
)
public class User {

    @Id
    @SequenceGenerator(
            name = "user_sequence",
            sequenceName = "user_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "user_sequence"
    )
    @Column(
            name = "user_id",
            nullable = false
    )
    private Long userId;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(
            name = "email_address",
            nullable = false

    )
    private String email;

    @Column(
            name = "password",
            nullable = false
    )
    private String password;

    @Column(name = "focusTime")
    private int focusTime;

    @Column(name = "break_time")
    private int breakTime;

    @Column(name = "sessions_completed")
    private int sessionsCompleted;

    @Column(name = "segementsCompleted")
    private int segmentsCompleted;
}
