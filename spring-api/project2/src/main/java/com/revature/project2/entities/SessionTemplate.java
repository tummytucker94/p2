package com.revature.project2.entities;

import com.revature.project2.entities.User;
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
@Table(name = "session_template")
public class SessionTemplate {
    @Id
    @SequenceGenerator(
            name = "session_template_sequence",
            sequenceName = "session_template_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "session_template_sequence"
    )
    @Column(
            name = "session_template_id",
            nullable = false
    )
    private Long sessionId;

    @Column(name = "name")
    private String sessionName;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User creator;

    @Column(name = "frequency")
    private int numTimesUsed;
}
